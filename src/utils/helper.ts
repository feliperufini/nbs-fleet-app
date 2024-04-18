import { LocationObjectCoords, reverseGeocodeAsync } from 'expo-location'

const LICENSE_PLATE_REGEX = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}'

export const validateLicensePlate = (licensePlate: string) => {
  return licensePlate.toUpperCase().match(LICENSE_PLATE_REGEX)
}

export async function getAddressLocation({ latitude, longitude }: LocationObjectCoords) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude })

    // addressResponse[0] = {
    //   city: null,
    //   country: "Brazil",
    //   district: "Bairro Centro",
    //   formattedAddress: "R. Pedro Teixeira, 1414 - Bairro Centro, Ji-Paraná - RO, 76900-062, Brazil",
    //   isoCountryCode: "BR",
    //   name: "1414",
    //   postalCode: "76900-062",
    //   region: "Rondônia",
    //   street: "Rua Pedro Teixeira",
    //   streetNumber: "1414",
    //   subregion: "Ji-Paraná",
    //   timezone: null
    // }
    return addressResponse[0]?.formattedAddress
  } catch (error) {
    console.log(error)
  }
}
