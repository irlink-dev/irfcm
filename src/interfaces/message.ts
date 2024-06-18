export default interface Message {
  /**
   * @deprecated
   * 고객사별 인증 키. (LEGACY)
   */
  authKey?: string

  /**
   * 액세스 토큰.
   */
  accessToken?: string

  /**
   * 법인폰 번호
   */
  phoneNumber?: string

  /**
   * 법인폰 토큰.
   */
  token: string

  /**
   * 요청 날짜.
   */
  date: string

  /**
   * 요청 타입.
   */
  type: string

  /**
   * amr 파일명. (메리츠 전용)
   */
  amrFileName?: string

  /**
   * 녹취 파일 포함 여부.
   */
  isIncludeRecord: boolean

  /**
   * 중요도.
   */
  priority: string
}
