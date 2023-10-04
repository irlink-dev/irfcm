import Pathname from '@/types/Pathname'
import LogUtil from '@/utils/log'

const TAG = 'utils/oauth'

/**
 * OAuth 클라이언트 Secret 반환.
 */
const getOAuthClientId = (pathname: Pathname) => {
  LogUtil.log(TAG, `getOAuthClientId. pathname: ${pathname}`)
  if (pathname === 'lpoint') return process.env.LPOINT_CLIENT_ID!
  return null
}

/**
 * OAuth 클라이언트 Secret 반환.
 */
const getOAuthClientSecret = (pathname: Pathname) => {
  LogUtil.log(TAG, `getOAuthClientSecret. pathname: ${pathname}`)
  if (pathname === 'lpoint') return process.env.LPOINT_CLIENT_SECRET!
  return null
}

export { getOAuthClientId, getOAuthClientSecret }
