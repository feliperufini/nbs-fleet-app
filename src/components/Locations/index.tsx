import { Car, Flag } from 'phosphor-react-native'
import { LocationInfo, LocationInfoProps } from '../LocationInfo'
import { Container, Line } from './styles'

type Props = {
  departure: LocationInfoProps
  arrival?: LocationInfoProps | null
}

export function Locations({ departure, arrival = null }: Props) {
  return (
    <Container>
      <LocationInfo icon={Car} label={departure.label} description={departure.description} />
      {
        arrival && (
          <>
            <Line />
            <LocationInfo icon={Flag} label={arrival.label} description={arrival.description} />
          </>
        )
      }
    </Container>
  )
}