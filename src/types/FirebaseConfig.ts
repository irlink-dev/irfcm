/**
 * 파이어베이스 설정 객체.
 */
export default interface FirebaseConfig {
  /**
   * API 키.
   */
  apiKey: string

  /**
   * 인증 도메인.
   */
  authDomain: string

  /**
   * DB 주소.
   */
  databaseURL?: string

  /**
   * 프로젝트 아이디.
   */
  projectId: string

  /**
   * 저장소 버킷.
   */
  storageBucket: string

  /**
   * 메시지 센더 아이디.
   */
  messagingSenderId?: string

  /**
   * 앱 아이디.
   */
  appId: string

  /**
   * 고유 식별자.
   */
  measurementId?: string
}
