import { TouchableOpacity } from 'react-native'
import { useApp, useUser } from '@realm/react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SignOut } from 'phosphor-react-native'
import { Container, Greeting, Message, Name, Picture } from './styles'
import theme from '../../theme'

export function HomeHeader() {
	const user = useUser()
	const app = useApp()
	const insets = useSafeAreaInsets()

	const paddingTop = insets.top + 32

	function handleLogout() {
		app.currentUser?.logOut()
	}

	return (
		<Container style={{ paddingTop }}>
			<Picture
				source={{ uri: user?.profile.pictureUrl }}
				placeholder="U1Bg3u00~qxu00~q_3M{M{00?bxu9F9FD%-;"
			/>
			<Greeting>
				<Message>
					Olá
				</Message>
				<Name>
					{user?.profile.name}
				</Name>
			</Greeting>
			<TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
				<SignOut size={32} color={theme.colors.gray[400]} />
			</TouchableOpacity>
		</Container>
	)
}