import { ThemeProvider } from 'styled-components'
import { AppProvider, UserProvider } from '@realm/react'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'

import theme from './src/theme'

import { REALM_APP_ID } from '@env'

import { RealmProvider } from './src/libs/realm'
import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'
import { SignIn } from './src/screens/SignIn'

export default function App() {
	const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

	if (!fontsLoaded) {
		return <Loading />
	}

	return (
		<AppProvider id={REALM_APP_ID}>
			<ThemeProvider theme={theme}>
				<SafeAreaProvider style={{ flex: 1, backgroundColor: theme.colors.gray[800] }}>
					<StatusBar
						barStyle="light-content"
						backgroundColor="transparent"
						translucent
					/>
					<UserProvider fallback={SignIn}>
						<RealmProvider>
							<Routes />
						</RealmProvider>
					</UserProvider>
				</SafeAreaProvider>
			</ThemeProvider>
		</AppProvider>
	)
}
