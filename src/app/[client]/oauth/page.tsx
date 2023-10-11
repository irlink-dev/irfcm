'use client'

import useSWR from 'swr'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'
import { Client } from '@/enums/Client'
import useLocalStorage from '@/hooks/useLocalStorage'
import Logger from '@/utils/log'

const TAG = 'ClientOAuthPage'

const ClientOAuthPage = () => {
  const router = useRouter()
  const code = useSearchParams().get('code')

  const { data, isLoading } = useSWR(
    `/api/oauth?client=${Client.L_POINT}&code=${code}`,
    async (url: string) => {
      const response = await fetch(url, { method: 'POST' })
      return await response.json()
    },
  )

  const {
    getLocalStorageData,
    setLocalStorageData,
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  } = useLocalStorage(Client.L_POINT)

  const accessToken = getLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  const setTokens = (accessToken: string, refreshToken: string) => {
    Logger.log(
      TAG,
      `setTokens.\n\n` +
        `🔐 (accessToken): ${accessToken}\n\n` +
        `♻️ (refreshToken): ${refreshToken}\n\n`,
    )
    setLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken)
    setLocalStorageData(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken)
  }

  useEffect(() => {
    const tokenStatus = isLoading ? '🚫 INACTIVE' : '✅ ACTIVE'

    Logger.log(
      TAG,
      `useEffect(isLoading). isLoading: ${isLoading},\n\n` +
        `🔐 (accessToken): ${accessToken}\n\n` +
        `${tokenStatus}.\n\n`,
    )
    if (!isLoading && data) {
      setTokens(data.access_token, data.refresh_token)
      router.push('/lpoint')
    }
  }, [isLoading])

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
