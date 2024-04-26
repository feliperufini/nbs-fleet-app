import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { LatLng } from 'react-native-maps'
import { BSON } from 'realm'
import Toast from 'react-native-toast-message'
import dayjs from 'dayjs'

import { AsyncMessage, Container, Content, Description, Footer, Label, LicensePlate } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Locations } from '../../components/Locations'
import { Map } from '../../components/Map'

import { getAddressLocation } from '../../utils/helper'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/syncStorage'
import { getStorageLocations } from '../../libs/asyncStorage/locationStorage'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'
import { LocationInfoProps } from '../../components/LocationInfo'
import { Loading } from '../../components/Loading'

type RouteParamProps = {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationInfoProps>({} as LocationInfoProps)
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const route = useRoute()
  const { id } = route.params as RouteParamProps

  const { goBack } = useNavigation()
  const realm = useRealm()
  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Deseja realmente cancelar a utilização do veículo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeVehicleUsage() },
      ]
    )
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    await stopLocationTask()
    goBack()
  }

  function handleConfirmArrivalRegister() {
    Alert.alert('Registrar Chegada', 'Deseja realmente registrar a chegada do veículo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => arrivalRegister() },
      ]
    )
  }

  async function arrivalRegister() {
    try {
      if (!historic) {
        return Toast.show({
          type: 'info',
          text1: 'INFO',
          text2: 'Não foi possível obter os dados para registrar a chegada do veículo.'
        })
      }

      const locations = await getStorageLocations()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coordinates.push(...locations)
      })

      await stopLocationTask()

      Toast.show({
        type: 'success',
        text1: 'Chegada',
        text2: 'Chegada do veículo registrada com sucesso.'
      })
      goBack()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível registrar a chegada do veículo.'
      })
    }
  }

  async function getLocationsInfo() {
    if (!historic) {
      return
    }

    const lastSync = await getLastAsyncTimestamp()
    const updatedAt = historic!.updated_at.getTime()
    setDataNotSynced(updatedAt > lastSync)

    if (historic?.status === 'departure') {
      const locationsStorage = await getStorageLocations()
      setCoordinates(locationsStorage)
    } else {
      const newCoordinates = historic?.coordinates.map(coordinate => ({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      }))

      setCoordinates(newCoordinates ?? [])
    }

    if (historic?.coordinates[0]) {
      const departureStreetName = await getAddressLocation(historic?.coordinates[0])
      setDeparture({
        label: `Saindo de ${departureStreetName ?? ''}`,
        description:
          dayjs(new Date(historic?.coordinates[0].timestamp))
            .format('DD/MM/YYYY [às] HH:mm[hrs]'),
      })
    }

    if (historic?.status === 'arrival') {
      const lastLocation = historic?.coordinates[historic?.coordinates.length - 1]
      const arrivalStreetName = await getAddressLocation(lastLocation)
      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ''}`,
        description:
          dayjs(new Date(lastLocation.timestamp))
            .format('DD/MM/YYYY [às] HH:mm[hrs]'),
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getLocationsInfo()
  }, [historic])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <Container>
      <Header title={title} />
      {
        coordinates.length > 0 &&
        < Map coordinates={coordinates} />
      }
      <Content>
        <Locations
          departure={departure}
          arrival={arrival}
        />
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>
      {historic?.status === 'departure' &&
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" onPress={handleConfirmArrivalRegister} />
        </Footer>
      }
      {
        dataNotSynced &&
        <AsyncMessage>
          Sincronização da {historic?.status === 'departure' ? 'partida' : 'chegada'} pendente.
        </AsyncMessage>
      }
    </Container>
  )
}