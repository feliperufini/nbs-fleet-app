import { reverseGeocodeAsync } from 'expo-location'
import { Linking, Platform } from 'react-native'

const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

export const validateLicensePlate = (licensePlate: string) => {
  return licensePlate.toUpperCase().match(LICENSE_PLATE_REGEX)
}

type Props = {
  latitude: number
  longitude: number
}

export async function getAddressLocation({ latitude, longitude }: Props) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude })

    return addressResponse[0]?.formattedAddress
  } catch (error) {
    console.log(error)
  }
}

export async function openSettings() {
  if (Platform.OS === 'ios') {
    return Linking.openURL('app-settings:')
  }
  if (Platform.OS === 'android') {
    return Linking.openSettings()
  }
}
