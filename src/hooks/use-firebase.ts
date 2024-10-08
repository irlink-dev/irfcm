import { useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import FirebasePreference from '@/interfaces/firebase-preference'
import FirebaseConfig from '@/interfaces/firebase-config'
import { printLog } from '@/utils/log'

const useFirebase = (firebasePref: FirebasePreference) => {
  const TAG = 'useFirebase'

  /**
   * 파이어베이스 스토리지.
   */
  const [storageRef, setStorageRef] = useState<firebase.storage.Reference>()

  /**
   * 앱 초기화.
   */
  const initApp = async (firebaseConfig: FirebaseConfig) => {
    printLog(TAG, `initApp. projectId: ${firebaseConfig?.projectId}`)

    if (firebase.apps.length !== 0) {
      await firebase.app().delete()
    }
    await firebase.initializeApp(firebaseConfig)

    return firebase
  }

  /**
   * 스토리지 초기화.
   */
  const initStorage = (firebase: any) => {
    if (firebase.apps.length > 0) {
      printLog(TAG, `initStorage.`)
      const storage = firebase.storage() // import 'firebase/compat/storage'
      setStorageRef(() => storage.ref())
    }
  }

  /**
   * IRFCM 페이지 초기화.
   */
  const initialize = async () => {
    const firebase = await initApp(firebasePref.config)
    initStorage(firebase)
  }

  return { initialize, storageRef }
}

export default useFirebase
