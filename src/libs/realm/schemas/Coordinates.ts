import { Realm } from '@realm/react'

export type CoordinatesSchemaProps = {
  latitude: number
  longitude: number
  timestamp: number
}

export class Coordinates extends Realm.Object<Coordinates> {
  latitude!: number
  longitude!: number
  timestamp!: number

  static generate({ latitude, longitude, timestamp }: CoordinatesSchemaProps) {
    return {
      latitude,
      longitude,
      timestamp,
    }
  }

  static schema = {
    name: 'Coordinates',
    embedded: true,
    properties: {
      latitude: 'float',
      longitude: 'float',
      timestamp: 'float',
    },
  }
}
