import { Client, ClientType } from '@/enums/client'

/**
 * OAuth 클라이언트 Secret 반환.
 */
export const getOAuthClientId = (client: ClientType) => {
  if (client === Client.CHUBB) return process.env.CHUBB_CLIENT_ID!
  if (client === Client.DB_LIFE) return process.env.DBLIFE_CLIENT_ID!
  if (client === Client.GS_SHOP_USB) return process.env.GSSHOPUSB_CLIENT_ID!
  if (client === Client.HANA) return process.env.HANA_CLIENT_ID!
  if (client === Client.HYUNDAI) return process.env.HYUNDAI_CLIENT_ID!
  if (client === Client.HYUNDAI_SHOP) return process.env.HYUNDAI_SHOP_CLIENT_ID!
  if (client === Client.KB_WIRELESS) return process.env.KB_CLIENT_ID!
  if (client === Client.KT_COMMERCE) return process.env.KTCOMMERCE_CLIENT_ID!
  if (client === Client.LINA) return process.env.LINA_CLIENT_ID!
  if (client === Client.LOTTE_CARD) return process.env.LOTTE_CARD_CLIENT_ID!
  if (client === Client.L_POINT) return process.env.LPOINT_CLIENT_ID!
  if (client === Client.MERITZ) return process.env.MERITZ_CLIENT_ID!
  if (client === Client.MORECX) return process.env.MORECX_CLIENT_ID!
  if (client === Client.NS_SHOP) return process.env.NS_SHOP_CLIENT_ID!
  if (client === Client.SHINHAN_CARD) return process.env.SHINHAN_CLIENT_ID!
  if (client === Client.SK_MNSERVICE) return process.env.SKNMS_CLIENT_ID!
  if (client === Client.ZILINK) return process.env.ZILINK_CLIENT_ID!
  return null
}

/**
 * OAuth 클라이언트 Secret 반환.
 */
export const getOAuthClientSecret = (client: ClientType) => {
  if (client === Client.CHUBB) return process.env.CHUBB_CLIENT_SECRET!
  if (client === Client.DB_LIFE) return process.env.DBLIFE_CLIENT_SECRET!
  if (client === Client.GS_SHOP_USB) return process.env.GSSHOPUSB_CLIENT_SECRET!
  if (client === Client.HANA) return process.env.HANA_CLIENT_SECRET!
  if (client === Client.HYUNDAI) return process.env.HYUNDAI_CLIENT_SECRET!
  if (client === Client.HYUNDAI_SHOP)
    return process.env.HYUNDAI_SHOP_CLIENT_SECRET!
  if (client === Client.KB_WIRELESS) return process.env.KB_CLIENT_SECRET!
  if (client === Client.KT_COMMERCE)
    return process.env.KTCOMMERCE_CLIENT_SECRET!
  if (client === Client.LINA) return process.env.LINA_CLIENT_SECRET!
  if (client === Client.LOTTE_CARD) return process.env.LOTTE_CARD_CLIENT_SECRET!
  if (client === Client.L_POINT) return process.env.LPOINT_CLIENT_SECRET!
  if (client === Client.MERITZ) return process.env.MERITZ_CLIENT_SECRET!
  if (client === Client.MORECX) return process.env.MORECX_CLIENT_SECRET!
  if (client === Client.NS_SHOP) return process.env.NS_SHOP_CLIENT_SECRET!
  if (client === Client.SHINHAN_CARD) return process.env.SHINHAN_CLIENT_SECRET!
  if (client === Client.SK_MNSERVICE) return process.env.SKNMS_CLIENT_SECRET!
  if (client === Client.ZILINK) return process.env.ZILINK_CLIENT_SECRET!
  return null
}
