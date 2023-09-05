import { NextApiRequest, NextApiResponse } from 'next'
import * as process from 'process'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const authorizationKey: AuthorizationKey = {
    CHUBB: process.env.CHUBB_AUTHORIZATION_KEY!,
    DB_LIFE: process.env.DBLIFE_AUTHORIZATION_KEY!,
    HANA: process.env.HANA_AUTHORIZATION_KEY!,
    KB_WIRELESS: process.env.KB_AUTHORIZATION_KEY!,
    LINA: process.env.LINA_AUTHORIZATION_KEY!,
    SHINHAN_CARD: process.env.SHINHAN_AUTHORIZATION_KEY!,
    ZILINK: process.env.ZILINK_AUTHORIZATION_KEY!,
  }
  const clientKey = request.query.clientKey as string
  const clientAuthorizationKey = authorizationKey[clientKey]

  if (!clientAuthorizationKey) {
    response.status(500).json({ error: 'Authorization key not found' })
    return
  }
  response.status(200).json({ authorizationKey: clientAuthorizationKey })
}

interface AuthorizationKey {
  CHUBB: string
  DB_LIFE: string
  HANA: string
  KB_WIRELESS: string
  LINA: string
  SHINHAN_CARD: string
  ZILINK: string

  [key: string]: string
}
