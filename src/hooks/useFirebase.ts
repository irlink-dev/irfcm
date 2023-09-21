import 'firebase/compat/storage'
import { useState } from 'react'
import firebase from 'firebase/compat/app'
import FirebasePreference from '@/types/FirebasePreference'
import FirebaseConfig from '@/types/FirebaseConfig'
import LogUtil from '@/utils/log'

const useFirebase = (firebasePref: FirebasePreference) => {
  const TAG = 'useFirebase'

  /**
   * 파이어베이스 스토리지.
   */
  const [storageRef, setStorageRef] = useState<firebase.storage.Reference>()

  /**
   * 파이어베이스 초기화.
   */
  const initApp = async (firebaseConfig: FirebaseConfig) => {
    LogUtil.log(TAG, `initApp. projectId: ${firebaseConfig.projectId}`)

    if (firebase.apps.length !== 0) {
      await firebase.app().delete()
    }
    await firebase.initializeApp(firebaseConfig)

    return firebase
  }

  /**
   * IRFCM 페이지 초기화.
   */
  const initialize = async () => {
    const firebase = await initApp(firebasePref.config)
    const storage = firebase.storage() // import 'firebase/compat/storage'
    setStorageRef(() => storage.ref())
  }

  return { initialize, storageRef }
}

export default useFirebase
