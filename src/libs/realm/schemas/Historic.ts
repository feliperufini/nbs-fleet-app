import { Realm } from '@realm/react'
import { CoordinatesSchemaProps } from './Coordinates'

type HistoricSchemaProps = {
  user_id: string
  license_plate: string
  description: string
  coordinates: CoordinatesSchemaProps[]
}

export class Historic extends Realm.Object<Historic> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  coordinates!: CoordinatesSchemaProps[]
  status!: string
  created_at!: Date
  updated_at!: Date

  static generate({ user_id, license_plate, description, coordinates }: HistoricSchemaProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
      coordinates,
      status: 'departure',
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static schema = {
    name: 'Historic',
    primaryKey: '_id' as const,
    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true
      },
      license_plate: 'string',
      description: 'string',
      coordinates: {
        type: 'list',
        objectType: 'Coordinates',
      },
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
