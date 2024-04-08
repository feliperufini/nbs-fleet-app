import { useState } from 'react'
import { Alert } from 'react-native'
import { Realm, useApp } from '@realm/react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { Container, Title, Slogan } from './styles'
import backgoundImg from '../../assets/background.png'
import { Button } from '../../components/Button'

import { WEB_CLIENT_ID, IOS_CLIENT_ID } from '@env'

GoogleSignin.configure({
	scopes: ['email', 'profile'],
	webClientId: WEB_CLIENT_ID,
	iosClientId: IOS_CLIENT_ID,
})

export function SignIn() {
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const app = useApp()

	async function handleGoogleSignIn() {
		try {
			setIsAuthenticating(true)

			const { idToken } = await GoogleSignin.signIn()
			if (idToken) {
				const credentials = Realm.Credentials.jwt(idToken)

				await app.logIn(credentials)
			} else {
				Alert.alert('Conta Google', 'Não foi possível conectar-se a sua conta!')
				setIsAuthenticating(false)
			}
		} catch (error) {
			console.log(error)
			setIsAuthenticating(false)
			Alert.alert('Conta Google', 'Não foi possível conectar-se a sua conta!')
		}
	}

	return (
		<Container source={backgoundImg}>
			<Title>NBS Fleet</Title>
			<Slogan>Gestão de uso do veículos</Slogan>
			<Button
				title="Entrar com Google"
				isLoading={isAuthenticating}
				onPress={handleGoogleSignIn}
			/>
		</Container>
	)
}
