import AsyncStorage from '@react-native-async-storage/async-storage'

const ASYNC_STORAGE_KEY = '@nbsfleet:last_sync'

export async function getLastAsyncTimestamp() {
  const timestamp = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)

  return Number(timestamp)
}

export async function saveLastSyncTimestamp() {
  const timestamp = new Date().getTime()
  await AsyncStorage.setItem(ASYNC_STORAGE_KEY, timestamp.toString())

  return timestamp
}
