import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import useLocalStorage from './useLocalStorage'
import { FileData, createFileData } from './data'
import FirebasePreference from '@/types/FirebasePreference'
import { useEffect, useState } from 'react'
import { getStorageFileUrls } from './firebase'
import Input from '@/types/Input'
import useFormat from './useFormat'
import LogUtil from '@/util/log'

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

  // useEffect가 아니라 storageFileData를 변경하는 함수에서 함께 호출.
  // useEffect(() => {
  //   setLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY, storageFileData)
  // }, [storageFileData])

  /**
   * 스토리지 파일 가져오기.
   */
  const getStorageFiles = async (input: Input) => {
    LogUtil.log(
      TAG,
      `getStorageFiles. phoneNumber: ${input.phoneNumber}, date: ${input.date}`,
    )
    const urls = await getStorageFileUrls(
      input.phoneNumber,
      input.date,
      storageRef!,
    )
    setStorageFileData([])
    for (const url of urls) {
      const { parseUrl } = useFormat()
      const fileName = parseUrl(url)?.fileName!
      const fileData = createFileData(fileName, '', '', url)
      setStorageFileData((prevState) => [...prevState, fileData])
    }
  }

  return { getStorageFiles, storageFileData }
}

export default useStorageFiles
