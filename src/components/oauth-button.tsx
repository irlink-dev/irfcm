'use client'

import { Button, Grid } from '@mui/material'
import { Client, ClientType } from '@/enums/client'
import useFcmRequest from '@/hooks/use-fcm-request'
import FirebasePreference from '@/interfaces/firebase-preference'

const OauthButton = ({
  params,
  firebasePref,
}: {
  params: { client: ClientType }
  firebasePref: FirebasePreference
}) => {
  const { doAuth } = useFcmRequest(firebasePref)

  const IS_SHOW =
    params.client === Client.L_POINT ||
    params.client === Client.GS_SHOP_USB ||
    params.client === Client.KT_COMMERCE

  return (
    <>
      {IS_SHOW && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => doAuth(params.client)}
          sx={{
            // width: '100%',
            // height: 56,
            backgroundColor: 'white',
            fontWeight: 600,
            textTransform: 'none',
          }}
        >
          Google로 OAuth 2.0 시작하기
        </Button>
      )}
    </>
  )
}

export default OauthButton