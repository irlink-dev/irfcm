'use client'

import useSWR from 'swr'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import { AuthContext } from '@/components/context/AuthContext'
import { sendMessage } from '@/utils/fcm'

const ClientOAuthPage = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const { accessToken, setAccessToken, setRefreshToken } =
    useContext(AuthContext)

  const { data, isLoading } = useSWR(
    `/api/oauth?code=${code}`,
    async (url: string) => {
      const response = await fetch(url, { method: 'POST' })
      return await response.json()
    },
  )

  useEffect(() => {
    if (!isLoading) {
      setAccessToken((prevState) => ({
        ...prevState,
        lpoint: data?.access_token,
      }))
      setRefreshToken((prevState) => ({
        ...prevState,
        lpoint: data?.refresh_token,
      }))
    }
  }, [data])

  useEffect(() => {
    if (accessToken.lpoint) {
      const message = {
        accessToken: accessToken.lpoint,
        token:
          'fohZvZgzRU23trQDAOSxaT:APA91bEczk4DIEnW9Nk_ldiyUk3h-saIzx800SVJO93_mz_kycx83Trf74xzM3C-jZv_x_p9AZTONQo_KX3z_XWk__XgTHYuE9fOQ7ESFo7aWPIz5EOX6as9lqrCeRKMm19eEtwrldOH',
        date: '2023-10-05',
        type: '1',
        isIncludeRecord: false,
        priority: 'high',
      }
      sendMessage(message).then((response) => console.log(response.json()))
    }
  }, [accessToken])

  return <>{isLoading && <CircularProgress />}</>
}

export default ClientOAuthPage
