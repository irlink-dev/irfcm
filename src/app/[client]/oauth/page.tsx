'use client'

import useSWR from 'swr'
import { useContext, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'
import { AuthContext } from '@/components/context/AuthContext'
import { sendMessage } from '@/utils/fcm'
import { Client } from '@/utils/constant'
import useLocalStorage from '@/hooks/useLocalStorage'

const ClientOAuthPage = () => {
  const router = useRouter()
  const code = useSearchParams().get('code')

  const { data, isLoading } = useSWR(
    `/api/oauth?code=${code}`,
    async (url: string) => {
      const response = await fetch(url, { method: 'POST' })
      return await response.json()
    },
  )

  const LOCAL_STORAGE_ACCESS_TOKEN_KEY = `irfcm:access_token:${Client.L_POINT}`
  const LOCAL_STORAGE_REFRESH_TOKEN_KEY = `irfcm:refresh_token:${Client.L_POINT}`

  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()

  const accessToken = getLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  useEffect(() => {
    if (!isLoading) {
      setLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data?.access_token)
      setLocalStorageData(LOCAL_STORAGE_REFRESH_TOKEN_KEY, data?.refresh_token)
    }
  }, [data])

  /** @test */
  // const getResponse = async (message: any) => {
  //   const response = await sendMessage(Client.L_POINT, message)
  //   const data = await response.json()
  //   console.log(data)
  // }

  useEffect(() => {
    // if (accessToken) {
    //   const message = {
    //     accessToken: accessToken,
    //     token:
    //       'fohZvZgzRU23trQDAOSxaT:APA91bEczk4DIEnW9Nk_ldiyUk3h-saIzx800SVJO93_mz_kycx83Trf74xzM3C-jZv_x_p9AZTONQo_KX3z_XWk__XgTHYuE9fOQ7ESFo7aWPIz5EOX6as9lqrCeRKMm19eEtwrldOH',
    //     date: '2023-10-06',
    //     type: '2',
    //     isIncludeRecord: false,
    //     priority: 'high',
    //   }
    //   getResponse(message)
    // }
    router.push('/lpoint')
  }, [accessToken])

  return (
    <>
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

export default ClientOAuthPage
