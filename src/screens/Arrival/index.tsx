import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import Toast from 'react-native-toast-message'

import { AsyncMessage, Container, Content, Description, Footer, Label, LicensePlate } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'

import { BSON } from 'realm'
import { useObject, useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { getLastAsyncTimestamp } from '../../libs/asyncStorage/syncStorage'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)

  const route = useRoute()
  const { id } = route.params as RouteParamsProps

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

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Toast.show({
          type: 'info',
          text1: 'INFO',
          text2: 'Não foi possível obter os dados para registrar a chegada do veículo.'
        })
      }

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
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
        text2: 'Não foi possível registrar a saída do veículo.'
      })
    }
  }

  useEffect(() => {
    getLastAsyncTimestamp()
      .then(lastSync => setDataNotSynced(historic!.updated_at.getTime() > lastSync))
  }, [])

  return (
    <Container>
      <Header title={title} />
      <Content>
        <Label>Placa do veículo</Label>
        <LicensePlate>{historic?.license_plate}</LicensePlate>
        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>
      </Content>
      {historic?.status === 'departure' &&
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
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