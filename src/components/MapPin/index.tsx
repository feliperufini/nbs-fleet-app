import { Container, StyledImage } from './styles'
import MapPinImg from '../../assets/map-pin.png'

export function MapPin() {
  return (
    <Container>
      <StyledImage source={MapPinImg} />
    </Container>
  )
}