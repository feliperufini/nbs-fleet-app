import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic'
import { Coordinates } from './schemas/Coordinates'

const behaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: behaviorConfiguration,
  existingRealmFileBehavior: behaviorConfiguration
}

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Coordinates, Historic],
  })
