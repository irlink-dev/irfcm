'use client'

import { Button, Grid } from '@mui/material'
import { Client, ClientType } from '@/utils/constant'
import useFcmRequest from '@/hooks/useFcmRequest'
import FirebasePreference from '@/types/FirebasePreference'

const OAuthButton = ({
  params,
  firebasePref,
}: {
  params: { client: ClientType }
  firebasePref: FirebasePreference
}) => {
  const { doAuth } = useFcmRequest(firebasePref)

  return (
    <>
      {params.client === Client.L_POINT && (
        <Button
          variant="outlined"
          onClick={() => doAuth(params.client)}
          sx={{
            width: '100%',
            height: 56,
            backgroundColor: 'white',
            fontWeight: 600,
          }}
        >
          Google로 OAuth 2.0 시작하기
        </Button>
      )}
    </>
  )
}

export default OAuthButton
