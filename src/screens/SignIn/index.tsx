import { Container, Title, Slogan } from './styles'

import backgoundImg from '../../assets/background.png'
import { Button } from '../../components/Button'

export function SignIn() {
	return (
		<Container source={backgoundImg}>
			<Title>NBS Fleet</Title>
			<Slogan>Gestão de uso do veículos</Slogan>
			<Button title="Entrar com o Google" />
		</Container>
	)
}
