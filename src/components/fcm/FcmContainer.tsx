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
import { Box, Button, CircularProgress } from '@mui/material'
import { Client, ClientType, FcmMethod } from '@/utils/constant'
import { getUserToken } from '@/utils/firebase'
import ClientSelect from '@/components/ClientSelect'
import OAuthButton from '@/components/OAuthButton'

/**
 * FCM 컨테이너. Request 전역 상태 관리.
 */
const FcmContainer = ({
  params,
  firebasePref,
}: {
  params: { client: ClientType }
  firebasePref: FirebasePreference
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const { initialize, storageRef } = useFirebase(firebasePref)
  const { input, trigger, setTrigger, handleChange, onSubmit, doAuth } =
    useFcmRequest(firebasePref)

  useEffect(() => {
    initialize().then(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!isLoading) {
      /** @test 파이어베이스 앱 초기화 후 테스트할 코드를 아래에 작성 */
      // getUserToken(Client.LINA, '010-2874-6064').then((res) => console.log(res))
    }
  }, [isLoading])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ClientSelect params={params} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <OAuthButton params={params} firebasePref={firebasePref} />
        </Grid>
      </Grid>

      {!isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <RequestForm
              params={params}
              input={input}
              handleChange={handleChange}
              onSubmit={onSubmit}
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

      {isLoading && (
        <Box
          sx={{
            width: '100%',
            height: 345,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={64} />
        </Box>
      )}
    </>
  )
}

export default FcmContainer
