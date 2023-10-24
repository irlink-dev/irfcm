import { Client, ClientType } from '@/enums/Client'

/**
 * Authorization Key 반환. (LEGACY)
 */
const useAuthorizationKey = (client: ClientType) => {
  if (client === Client.CHUBB) return process.env.CHUBB_AUTHORIZATION_KEY!
  if (client === Client.DB_LIFE) return process.env.DBLIFE_AUTHORIZATION_KEY!
  if (client === Client.HANA) return process.env.HANA_AUTHORIZATION_KEY!
  if (client === Client.KB_WIRELESS) return process.env.KB_AUTHORIZATION_KEY!
  if (client === Client.LINA) return process.env.LINA_AUTHORIZATION_KEY!
  if (client === Client.MERITZ) return process.env.MERITZ_AUTHORIZATION_KEY!
  if (client === Client.MORECX) return process.env.MORECX_AUTHORIZATION_KEY!
  if (client === Client.SHINHAN_CARD)
    return process.env.SHINHAN_AUTHORIZATION_KEY!
  if (client === Client.ZILINK) return process.env.ZILINK_AUTHORIZATION_KEY!
}

export default useAuthorizationKey
