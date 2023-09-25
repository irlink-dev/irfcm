const useLocalStorage = () => {
  const getLocalStorageData = (key: string) => {
    if (typeof window === 'undefined') {
      return null
    }
    const data = localStorage?.getItem(key)
    return data ? JSON.parse(data) : null
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
  }
}

export default useLocalStorage
