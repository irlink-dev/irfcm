/**
 * OAuth 인증 유형.
 */
export enum GrantType {
  /**
   * 인가 코드.
   */
  AUTHORIZATION_CODE = 'authorization_code',

  /**
   * 리프레시 토큰.
   */
  REFRESH_TOKEN = 'refresh_token',
}
