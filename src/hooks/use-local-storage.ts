import { ClientType } from '@/enums/client'

const useLocalStorage = (client: ClientType | null = null) => {
  const LOCAL_STORAGE_ACCESS_TOKEN_KEY = `irfcm:access_token:${client}`
  const LOCAL_STORAGE_REFRESH_TOKEN_KEY = `irfcm:refresh_token:${client}`

  const getLocalStorageData = (key: string) => {
    if (typeof window === 'undefined') {
      return null
    }
    const data = localStorage?.getItem(key)
    return data === 'undefined' ? null : data ? JSON.parse(data) : null
  }

  const setLocalStorageData = (key: string, data: unknown) => {
    if (typeof window === 'undefined') {
      return
    }
    localStorage?.setItem(key, JSON.stringify(data))
  }

  return {
    getLocalStorageData,
    setLocalStorageData,
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  }
}

export default useLocalStorage
