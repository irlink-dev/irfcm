import { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import useLocalStorage from '@/hooks/use-local-storage'
import { FileData, createFileData } from '@/utils/data'
import FirebasePreference from '@/interfaces/firebase-preference'
import { getStorageFileUrls } from '@/utils/firebase'
import Input from '@/interfaces/input'
import { printLog } from '@/utils/log'
import { parseDownloadUrl } from '@/utils/format'
import { MorecxVariants } from '@/enums/morecx-variants'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  morecxVariantsAtom,
  storageFilesLoadingStatusAtom,
} from '@/states/global-state'
import useToast from './use-toast'

const useStorageFiles = (
  firebasePref: FirebasePreference,
  storageRef: firebase.storage.Reference,
) => {
  const TAG = 'useStorageFiles'
  const LOCAL_STORAGE_FILE_DATA_KEY = `irfcm:filedata:${firebasePref.config?.projectId}`
  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()
  const { showDefaultToast } = useToast()

  const [storageFileData, setStorageFileData] = useState<Array<FileData>>(
    () => {
      const savedFileData = getLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY)
      return savedFileData ? savedFileData : []
    },
  )

  const morecxVariant = useAtomValue(morecxVariantsAtom)
  const setIsStorageFilesLoading = useSetAtom(storageFilesLoadingStatusAtom)

  useEffect(() => {
    setLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY, storageFileData)
  }, [storageFileData])

  /**
   * 스토리지 파일 지우기.
   */
  const clearStorageFiles = () => {
    printLog(TAG, `clearStorageFiles.`)
    setStorageFileData([])
  }

  /**
   * 스토리지 파일 표시.
   */
  const showStorageFiles = (urls: Array<string>, client: string) => {
    printLog(TAG, `showStorageFiles. length: ${urls.length || 0}`)
    showDefaultToast('스토리지 파일이 업데이트 되었습니다.')

    for (const url of urls) {
      const fileName = parseDownloadUrl(url, client, morecxVariant)?.fileName!
      const fileData = createFileData(fileName, '', '', url)
      setStorageFileData((prevState) => [...prevState, fileData])
    }
  }

  /**
   * 스토리지 파일 가져오기.
   */
  const getStorageFiles = async (
    input: Input,
    client: string,
    variant: number,
  ) => {
    setIsStorageFilesLoading(true)
    printLog(
      TAG,
      `getStorageFiles. phoneNumber: ${input.phoneNumber}, date: ${input.date}, morecxVariant: ${MorecxVariants[variant]}`,
    )
    const urls = await getStorageFileUrls(
      input.phoneNumber,
      input.date,
      storageRef!,
      client,
      variant,
    )
    clearStorageFiles()
    showStorageFiles(urls, client)
    setIsStorageFilesLoading(false)
  }

  return { clearStorageFiles, getStorageFiles, storageFileData }
}

export default useStorageFiles
