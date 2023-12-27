'use client'

import useSWR from 'swr'
import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'
import { Client, ClientType } from '@/enums/Client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { printLog } from '@/utils/log'

const TAG = 'ClientOAuthPage'

const ClientOAuthPage = ({ params }: { params: { client: ClientType } }) => {
  const router = useRouter()
  const code = useSearchParams().get('code')

  const { data, isLoading } = useSWR(
    `/api/oauth?client=${params.client}&code=${code}`,
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
  } = useLocalStorage(params.client)

  const accessToken = getLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  const setTokens = (accessToken: string, refreshToken: string) => {
    printLog(
      TAG,
      `setTokens.\n\n` +
        `🔐 (accessToken): ${accessToken}\n\n` +
        `♻️ (refreshToken): ${refreshToken}\n\n`,
    )
    setLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken)
    setLocalStorageData(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken)
  }

  useEffect(() => {
    printLog(TAG, `useEffect(isLoading). isLoading: ${isLoading}`)

    if (!isLoading && data) {
      setTokens(data.access_token, data.refresh_token)
      router.push(`/${params.client}`)
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
