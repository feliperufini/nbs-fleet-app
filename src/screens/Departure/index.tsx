import { useEffect, useRef, useState } from 'react'
import { TextInput, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  LocationAccuracy,
  LocationObjectCoords,
  LocationSubscription,
  useForegroundPermissions,
  watchPositionAsync
} from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { Car } from 'phosphor-react-native'
import Toast from 'react-native-toast-message'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'
import { Loading } from '../../components/Loading'

import { Container, Content, Message } from './styles'
import { getAddressLocation, validateLicensePlate } from '../../utils/helper'

import { useUser } from '@realm/react'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { LocationInfo } from '../../components/LocationInfo'
import { Map } from '../../components/Map'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions()

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    try {
      if (!validateLicensePlate(licensePlate)) {
        return Toast.show({
          type: 'error',
          text1: 'Placa do veículo',
          text2: 'A placa é inválida, por favor, informe uma placa correta.'
        })
      }

      if (description.trim().length === 0) {
        return Toast.show({
          type: 'error',
          text1: 'Finalidade',
          text2: 'Por favor, informe a finalidade da utilização do veículo.'
        })
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate,
          description: description,
        }))
      })

      Toast.show({
        type: 'success',
        text1: 'Saída',
        text2: 'Saída do veículo registrada com sucesso.'
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
    setIsRegistering(false)
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      setCurrentCoords(location.coords)

      getAddressLocation(location.coords)
        .then((address) => {
          if (address) {
            setCurrentAddress(address)
          }
        })
        .finally(() =>
          setIsLoadingLocation(false)
        )
    })
      .then((response) =>
        subscription = response
      )

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [locationForegroundPermission])

  if (!locationForegroundPermission?.granted) {
    return (
      <Container>
        <Header title="Saída" />
        <Message>
          Você precisa fornecer as permissões de localização para acessar essa funcionalidade. Acesse as configuraçõse do seu dispositivo para habilitar essa permissão.
        </Message>
      </Container>
    )
  }

  if (isLoadingLocation) {
    return <Loading />
  }

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {
            currentCoords && (
              <Map coordinates={[
                currentCoords,
                { latitude: -10.8842, longitude: -61.9491 }
              ]} />
            )
          }
          <Content>
            {
              currentAddress && (
                <LocationInfo
                  label="Localização atual"
                  description={currentAddress}
                  icon={Car}
                />
              )
            }
            <LicensePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              onChangeText={(value) => setLicensePlate(value.toUpperCase())}
              value={licensePlate}
              returnKeyType="next"
            />
            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              onChangeText={setDescription}
              returnKeyType="send"
              blurOnSubmit
            />
            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
