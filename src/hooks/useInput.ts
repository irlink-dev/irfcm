import { ChangeEvent, useEffect, useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const useInput = (defaultValues: object, localStorageKey: string) => {
  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()

  const [data, setData] = useState(() => {
    const data = getLocalStorageData(localStorageKey)
    return data ? data : defaultValues
  })

  useEffect(() => {
    setLocalStorageData(localStorageKey, data)
  }, [data])

  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target

    setData((prevData: object) => ({ ...prevData, [name]: value }))
  }

  return { data, onChange }
}

export default useInput
