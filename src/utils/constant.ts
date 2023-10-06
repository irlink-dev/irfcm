/**
 * 고객사.
 */
export enum Client {
  CHUBB = 'chubb',
  DB_LIFE = 'dblife',
  HANA = 'hana',
  KB_WIRELESS = 'kb',
  LINA = 'lina',
  L_POINT = 'lpoint',
  MORECX = 'morecx',
  SHINHAN_CARD = 'shinhan',
  ZILINK = 'zilink',
}

/**
 * type ClientType = | Client.CHUBB | Client.DB_LIFE ...
 */
export type ClientType = (typeof Client)[keyof typeof Client]

/**
 * FCM 요청 방식.
 */
export enum FcmMethod {
  LEGACY = 0,
  HTTP_V1 = 1,
}

/**
 * type FcmMethodType = | FcmMethod.LEGACY | FcmMethod.HTTP_V1 ...
 */
export type FcmMethodType = (typeof FcmMethod)[keyof typeof FcmMethod]
