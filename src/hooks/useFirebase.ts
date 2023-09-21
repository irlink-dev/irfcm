import 'firebase/compat/storage'
import { useState } from 'react'
import firebase from 'firebase/compat/app'
import FirebasePreference from '@/types/FirebasePreference'
import FirebaseConfig from '@/types/FirebaseConfig'

const useFirebase = (firebasePref: FirebasePreference) => {
  /**
   * 파이어베이스 스토리지.
   */
  const [storageRef, setStorageRef] = useState<firebase.storage.Reference>()

  /**
   * 파이어베이스 초기화.
   */
  const initFirebaseApp = async (firebaseConfig: FirebaseConfig) => {
    console.log(`initFirebaseApp. projectId: ${firebaseConfig.projectId}`)

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
    const firebase = await initFirebaseApp(firebasePref.config)
    const storage = firebase.storage() // import 'firebase/compat/storage'
    setStorageRef(() => storage.ref())
  }

  return { initialize, storageRef }
}

export default useFirebase
