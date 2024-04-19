import { TouchableOpacityProps } from 'react-native'
import { Car, Flag } from 'phosphor-react-native'
import { useTheme } from 'styled-components/native'
import { Container, IconBox, Message, TextHighlight } from './styles'

type Props = TouchableOpacityProps & {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
  const { colors } = useTheme()

  const Icon = licensePlate ? Flag : Car
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso.\n`
    : 'Nenhum veículo em uso no momento por você.\n'
  const status = licensePlate
    ? 'sua chegada'
    : 'a saída'

  return (
    <Container {...rest}>
      <IconBox>
        <Icon size={52} color={colors.brandMid} />
      </IconBox>
      <Message>
        {message}
        <TextHighlight>Clique para registrar {status}</TextHighlight>
      </Message>
    </Container >
  )
}