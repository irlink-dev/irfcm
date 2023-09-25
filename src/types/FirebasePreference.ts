import FirebaseConfig from '@/types/FirebaseConfig'

/**
 * 파이어베이스 설정.
 */
export default interface FirebasePreference {
  /**
   * 인증 키.
   */
  authorizationKey: string

  /**
   * 설정 객체.
   */
  config: FirebaseConfig
}
