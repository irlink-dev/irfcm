import FirebaseConfig from '@/interfaces/firebase-config'

/**
 * 파이어베이스 설정.
 */
export default interface FirebasePreference {
  /**
   * 인증 키.
   */
  authorizationKey: string | null

  /**
   * OAuth 클라이언트 ID.
   */
  oAuthClientId: string | null

  /**
   * OAuth 클라이언트 Secret.
   */
  oAuthClientSecret: string | null | undefined

  /**
   * 설정 객체.
   */
  config: FirebaseConfig
}
