import { TouchableOpacityProps } from 'react-native'
import { Car, Flag } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { Container, IconBox, Message, TextHighlight } from './styles'

type Props = TouchableOpacityProps & {
	licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
	const theme = useTheme()

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
				<Icon size={32} color={theme.colors.brandLight} />
			</IconBox>
			<Message>
				{message}
				<TextHighlight>Clique para registrar {status}</TextHighlight>
			</Message>
		</Container >
	)
}