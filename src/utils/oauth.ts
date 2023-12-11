import { Client, ClientType } from '@/enums/Client'


/**
 * OAuth 클라이언트 Secret 반환.
 */
export const getOAuthClientId = (client: ClientType) => {
  if (client === Client.L_POINT) return process.env.LPOINT_CLIENT_ID!
  return null
}

/**
 * OAuth 클라이언트 Secret 반환.
 */
export const getOAuthClientSecret = (client: ClientType) => {
  if (client === Client.L_POINT) return process.env.LPOINT_CLIENT_SECRET!
  return null
}
