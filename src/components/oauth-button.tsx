'use client'

import { Button } from '@mui/material'
import { Client, ClientType } from '@/enums/client'
import useFcmRequest from '@/hooks/use-fcm-request'
import FirebasePreference from '@/interfaces/firebase-preference'

const OAuthButton = ({
  params,
  firebasePref,
}: {
  params: { client: ClientType }
  firebasePref: FirebasePreference
}) => {
  const { doAuth } = useFcmRequest(firebasePref)

  const IS_SHOW =
    params.client === Client.GS_SHOP_USB ||
    params.client === Client.HYUNDAI ||
    params.client === Client.KT_COMMERCE ||
    params.client === Client.L_POINT

  return (
    <>
      {IS_SHOW && (
        <Button
          // variant="outlined"
          // size="small"
          onClick={() => doAuth(params.client)}
          sx={{
            // width: '100%',
            // height: 56,
            // backgroundColor: 'white',
            // fontWeight: 600,
            textTransform: 'none',
            // borderRadius: '100px',
          }}
        >
          OAuth 2.0 인증
        </Button>
      )}
    </>
  )
}

export default OAuthButton
