import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'
import { Container, Content } from './styles'

import { useQuery } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const { navigate } = useNavigation()

  const historic = useQuery(Historic)

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigate('arrival', { id: vehicleInUse?._id.toString() })
    } else {
      return navigate('departure')
    }
  }

  function fetchVehicle() {
    try {
      const vehicle = historic.filtered(`status = "departure"`)[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.')
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

  return (
    <Container>
      <HomeHeader />
      <Content>
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </Content>
    </Container>
  )
}