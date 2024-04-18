import 'react-native-get-random-values'
import './src/libs/dayjs'

import { ThemeProvider } from 'styled-components'
import { AppProvider, UserProvider } from '@realm/react'
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'
import { WifiSlash } from 'phosphor-react-native'
import { useNetInfo } from '@react-native-community/netinfo'

import theme from './src/theme'

import { REALM_APP_ID } from '@env'

import { RealmProvider, syncConfig } from './src/libs/realm'
import { Routes } from './src/routes'
import { Loading } from './src/components/Loading'
import { SignIn } from './src/screens/SignIn'
import { TopMessage } from './src/components/TopMessage'
import RootToast from './src/libs/toastMessage'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const netInfo = useNetInfo()

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <AppProvider id={REALM_APP_ID}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.colors.gray[800] }}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="transparent"
              translucent
            />
            {
              !netInfo.isConnected &&
              <TopMessage title="Você está off-line" icon={WifiSlash} />
            }
            <UserProvider fallback={SignIn}>
              <RealmProvider sync={syncConfig} fallback={Loading}>
                <Routes />
              </RealmProvider>
            </UserProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </AppProvider>
      <RootToast />
    </>
  )
}
