import { Realm } from '@realm/react'

type HistoricSchemaProps = {
  user_id: string
  license_plate: string
  description: string
}

export class Historic extends Realm.Object<Historic> {
  _id!: string
  user_id!: string
  license_plate!: string
  description!: string
  status!: string
  created_at!: Date
  updated_at!: Date

  static generate({ user_id, license_plate, description }: HistoricSchemaProps) {
    return {
      _id: new Realm.BSON.UUID(),
      user_id,
      license_plate,
      description,
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
      user_id: 'string',
      // user_id: {
      //   type: 'string',
      //   indexed: true
      // },
      license_plate: 'string',
      description: 'string',
      status: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
