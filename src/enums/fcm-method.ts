/**
 * FCM 요청 방식.
 */
export enum FcmMethod {
  /**
   * LEGACY 요청 방식.
   */
  LEGACY = 0,

  /**
   * HTTP v1 요청 방식. (OAuth 2.0)
   */
  HTTP_V1 = 1,
}

/**
 * type FcmMethodType = | FcmMethod.LEGACY | FcmMethod.HTTP_V1 ...
 */
export type FcmMethodType = (typeof FcmMethod)[keyof typeof FcmMethod]
