import { ClientType } from '@/utils/constant'

/**
 * OAuth 클라이언트 Secret 반환.
 */
const getOAuthClientId = (client: ClientType) => {
  if (client === 'lpoint') return process.env.LPOINT_CLIENT_ID!
  return null
}

/**
 * OAuth 클라이언트 Secret 반환.
 */
const getOAuthClientSecret = (client: ClientType) => {
  if (client === 'lpoint') return process.env.LPOINT_CLIENT_SECRET!
  return null
}

export { getOAuthClientId, getOAuthClientSecret }
