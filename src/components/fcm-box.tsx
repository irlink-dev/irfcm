'use client'

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import 'firebase/compat/storage'
import FirebasePreference from '@/interfaces/firebase-preference'
import RequestForm from '@/components/request-form'
import useFcmRequest from '@/hooks/use-fcm-request'
import useFirebase from '@/hooks/use-firebase'
import StorageFiles from '@/components/storage-files'
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Tab,
  Tabs,
} from '@mui/material'
import { ClientType } from '@/enums/client'
import ClientSelect from '@/components/client-select'
import OAuthButton from '@/components/oauth-button'
import { useRouter } from 'next/navigation'
import TopNav from './top-nav'

/**
 * FCM 컨테이너. Request 전역 상태 관리.
 */
const FcmBox = ({
  params,
  firebasePref,
}: {
  params: { client: ClientType }
  firebasePref: FirebasePreference
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { initialize, storageRef } = useFirebase(firebasePref)

  const {
    input,
    trigger,
    setTrigger,
    handleChange,
    onSubmit,
    doAuth,
    showInputValues,
  } = useFcmRequest(firebasePref)

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
      <TopNav params={params} />

      <Box sx={{ display: 'flex', justifyContent: 'end', pb: 1 }}>
        <OAuthButton params={params} firebasePref={firebasePref} />
      </Box>

      <Grid container rowSpacing={2} columnSpacing={3}>
        {!isLoading && (
          <>
            <Grid item xs={12} lg={6}>
              <RequestForm
                params={params}
                input={input}
                handleChange={handleChange}
                onSubmit={onSubmit}
                showInputValues={showInputValues}
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
          </>
        )}
      </Grid>

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

export default FcmBox
