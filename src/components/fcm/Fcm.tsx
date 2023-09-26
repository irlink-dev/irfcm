'use client'

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import 'firebase/compat/storage'
import FirebasePreference from '@/types/FirebasePreference'
import RequestForm from '@/components/fcm/RequestForm'
import useFcmRequest from '@/hooks/useFcmRequest'
import useFirebase from '@/hooks/useFirebase'
import StorageFiles from './StorageFiles'
import Pathname from '@/types/Pathname'

/**
 * FCM 컨테이너. Request 전역 상태 관리.
 */
const FcmContainer = ({
  params,
  firebasePref,
}: {
  params: { client: Pathname }
  firebasePref: FirebasePreference
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const { initialize, storageRef } = useFirebase(firebasePref)
  const { input, trigger, setTrigger, handleChange, handleSubmit } =
    useFcmRequest(firebasePref)

  useEffect(() => {
    initialize().then(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading && <>Loading...</>}

      {!isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <RequestForm
              params={params}
              input={input}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <StorageFiles
              params={params}
              input={input}
              trigger={trigger}
              setTrigger={setTrigger}
              firebasePref={firebasePref}
              storageRef={storageRef!}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default FcmContainer
