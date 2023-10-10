import { NextRequest, NextResponse } from 'next/server'
import { Client, ClientType, GoogleApi, GrantType } from '@/utils/constant'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'
import LogUtil from '@/utils/log'

const TAG = '/api/oauth'

const REDIRECT_URI =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/${Client.L_POINT}/oauth`
    : `https://irfcm.vercel.app/${Client.L_POINT}/oauth`

/**
 * authorization_code로 access_token과 refresh_token 발급.
 */
async function fetchTokens(
  clientId: string,
  clientSecret: string,
  authCode: string,
) {
  const response = await fetch(GoogleApi.OAUTH_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:
      `client_id=${clientId}` +
      `&client_secret=${clientSecret}` +
      `&grant_type=${GrantType.AUTHORIZATION_CODE}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&code=${authCode}`,
  })
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
  return await response.json()
}

/**
 * POST /api/oauth 요청.
 */
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const client = searchParams.get('client') as ClientType

  // LogUtil.log(TAG, `POST. client: ${client}`)

  const clientId = getOAuthClientId(client) as string
  const clientSecret = getOAuthClientSecret(client) as string
  const authCode = searchParams.get('code')
  const refreshToken = searchParams.get('refresh_token')

  // LogUtil.log(TAG, `POST. clientId: ${clientId}, clientSecret: ${clientSecret}`)
  // LogUtil.log(TAG, `POST. authCode: ${authCode}, refreshToken: ${refreshToken}`)

  if (authCode) {
    const data = await fetchTokens(clientId, clientSecret, authCode)
    return NextResponse.json(data)
  }
  if (refreshToken) {
    const data = await refreshAccessToken(clientId, clientSecret, refreshToken)
    return NextResponse.json(data)
  }
  return NextResponse.json({ ok: false })
}
