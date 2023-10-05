'use client'

import useSWR from 'swr'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import { AuthContext } from '@/components/context/AuthContext'

const ClientOAuthPage = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const { setAccessToken, setRefreshToken } = useContext(AuthContext)

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
      /** @todo sendMessage() */
    }
  }, [data])

  return <>{isLoading && <CircularProgress />}</>
}

export default ClientOAuthPage
