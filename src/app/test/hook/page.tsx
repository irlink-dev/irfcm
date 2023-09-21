'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import { initFirebaseApp, getFirebaseToken } from '@/utils/firebase'
import { requestFcm } from '@/utils/fcm'
import FirebaseManager from '@/manager/FirebaseManager'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'

const HookTestPage = () => {
  React.useEffect(() => {
    initFirebaseApp(useFirebaseConfig('dblife')!)
  }, [])

  const handleClick = async () => {
    const token = await getFirebaseToken('010-8318-4910')
    console.log(token)

    const firebaseManager = new FirebaseManager()

    /* getAuthorizationKey */
    const authorizationKeyResponse = await fetch(
      `/api/AuthorizationKey?clientKey=${firebaseManager.clientKey.DB_LIFE}`,
    )
    const data = await authorizationKeyResponse.json()
    const authorizationKey = data.authorizationKey

    const request = {
      authorizationKey: authorizationKey,
      token: token,
      date: '2023-04-10',
      type: '1',
      isIncludeRecord: false,
      priority: 'high',
    }
    console.log(request)
    const response = await requestFcm(request)
    console.log(response)
  }

  return (
    <>
      <Button onClick={handleClick}>Get Firebase token</Button>
    </>
  )
}

export default HookTestPage
