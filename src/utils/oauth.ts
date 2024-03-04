import { Client, ClientType } from '@/enums/client'

/**
 * OAuth 클라이언트 Secret 반환.
 */
export const getOAuthClientId = (client: ClientType) => {
  if (client === Client.L_POINT) return process.env.LPOINT_CLIENT_ID!
  if (client === Client.GS_SHOP_USB) return process.env.GSSHOPUSB_CLIENT_ID!
  if (client === Client.KT_COMMERCE) return process.env.KTCOMMERCE_CLIENT_ID!
  return null
}

/**
 * OAuth 클라이언트 Secret 반환.
 */
export const getOAuthClientSecret = (client: ClientType) => {
  if (client === Client.L_POINT) return process.env.LPOINT_CLIENT_SECRET!
  if (client === Client.GS_SHOP_USB) return process.env.GSSHOPUSB_CLIENT_SECRET!
  if (client === Client.KT_COMMERCE)
    return process.env.KTCOMMERCE_CLIENT_SECRET!
  return null
}
