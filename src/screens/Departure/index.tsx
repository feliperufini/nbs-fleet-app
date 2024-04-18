import { useRef, useState } from 'react'
import { TextInput, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'

import { Container, Content } from './styles'
import { validateLicensePlate } from '../../utils/helper'
import { useNavigation } from '@react-navigation/native'

import { useUser } from '@realm/react'
import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

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

  return (
    <Container>
      <Header title="Saída" />
      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
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
