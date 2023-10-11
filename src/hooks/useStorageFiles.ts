import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import useLocalStorage from '@/hooks/useLocalStorage'
import useFormat from '@/hooks/useFormat'
import { FileData, createFileData } from '@/utils/data'
import FirebasePreference from '@/interfaces/FirebasePreference'
import { getStorageFileUrls } from '@/utils/firebase'
import Input from '@/interfaces/Input'
import Logger from '@/utils/log'

const useStorageFiles = (
  firebasePref: FirebasePreference,
  storageRef: firebase.storage.Reference,
) => {
  const TAG = 'useStorageFiles'
  const LOCAL_STORAGE_FILE_DATA_KEY = `irfcm:filedata:${firebasePref.config?.projectId}`
  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()

  const [storageFileData, setStorageFileData] = useState<Array<FileData>>(
    () => {
      const savedFileData = getLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY)
      return savedFileData ? savedFileData : []
    },
  )

  useEffect(() => {
    setLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY, storageFileData)
  }, [storageFileData])

  /**
   * 스토리지 파일 지우기.
   */
  const clearStorageFiles = () => {
    Logger.log(TAG, `clearStorageFiles.`)
    setStorageFileData([])
  }

  /**
   * 스토리지 파일 표시.
   */
  const showStorageFiles = (urls: Array<string>, client: string) => {
    Logger.log(TAG, `showStorageFiles. length: ${urls.length || 0}`)

    for (const url of urls) {
      const { parseUrl } = useFormat()
      const fileName = parseUrl(url, client)?.fileName!
      const fileData = createFileData(fileName, '', '', url)
      setStorageFileData((prevState) => [...prevState, fileData])
    }
  }

  /**
   * 스토리지 파일 가져오기.
   */
  const getStorageFiles = async (input: Input, client: string) => {
    Logger.log(
      TAG,
      `getStorageFiles. phoneNumber: ${input.phoneNumber}, date: ${input.date}`,
    )
    const urls = await getStorageFileUrls(
      input.phoneNumber,
      input.date,
      storageRef!,
      client,
    )
    clearStorageFiles()
    showStorageFiles(urls, client)
  }

  return { clearStorageFiles, getStorageFiles, storageFileData }
}

export default useStorageFiles
