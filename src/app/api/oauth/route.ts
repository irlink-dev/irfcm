import { NextRequest, NextResponse } from 'next/server'
import { GoogleApi } from '@/enums/GoogleApi'
import { GrantType } from '@/enums/GrantType'
import { Client, ClientType } from '@/enums/Client'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'
import { printLog } from '@/utils/log'

const TAG = '/api/oauth'

/**
 * authorization_code로 access_token과 refresh_token 발급.
 */
async function fetchTokens(
  clientId: string,
  clientSecret: string,
  authCode: string,
  redirectUri: string,
) {
  const response = await fetch(GoogleApi.OAUTH_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      `client_id=${clientId}` +
      `&client_secret=${clientSecret}` +
      `&grant_type=${GrantType.AUTHORIZATION_CODE}` +
      `&redirect_uri=${redirectUri}` +
      `&code=${authCode}`,
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

/**
 * refresh_token으로 access_token 갱신.
 */
async function refreshAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string,
) {
  const response = await fetch(GoogleApi.OAUTH_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      `client_id=${clientId}` +
      `&client_secret=${clientSecret}` +
      `&grant_type=${GrantType.REFRESH_TOKEN}` +
      `&refresh_token=${refreshToken}`,
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

/**
 * POST /api/oauth 요청.
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const client = searchParams.get('client') as ClientType

  if (!Object.values(Client).includes(client as Client)) {
    printLog(TAG, `Invalid client value: ${client}`)
    return NextResponse.json({ ok: false, error: 'Invalid client value' })
  }

  const redirectUri =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000/${client}/oauth`
      : `https://irfcm.vercel.app/${client}/oauth`

  const clientId = getOAuthClientId(client) as string
  const clientSecret = getOAuthClientSecret(client) as string
  const authCode = searchParams.get('code')
  const refreshToken = searchParams.get('refresh_token')

  printLog(
    TAG,
    `POST. REQUEST \n` +
      `    - client: ${client}\n` +
      `    - clientId: ${clientId}\n` +
      `    - clientSecret: ${clientSecret}\n` +
      `    - authCode: ${authCode}\n` +
      `    - refreshToken: ${refreshToken}`,
  )
  try {
    if (authCode) {
      const data = await fetchTokens(
        clientId,
        clientSecret,
        authCode,
        redirectUri,
      )
      return NextResponse.json(data)
    }
    if (refreshToken) {
      const data = await refreshAccessToken(
        clientId,
        clientSecret,
        refreshToken,
      )
      if (!data?.access_token) {
        printLog(
          TAG,
          `Unexpected response from OAuth server: ${JSON.stringify(data)}`,
        )
        return NextResponse.json({
          ok: false,
          error: 'Unexpected response from OAuth server',
        })
      }
      return NextResponse.json(data)
    }
  } catch (error: any) {
    printLog(TAG, `Error during OAuth process: ${error.message}`)
    return NextResponse.json({ ok: false, error: 'Internal server error' })
  }
  return NextResponse.json({ ok: false })
}
