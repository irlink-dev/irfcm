export default interface Request {
  /**
   * 고객사별 인증 키.
   */
  authorizationKey: string | null

  /**
   * 법인폰 토큰.
   */
  token: string

  /**
   * 로그 날짜.
   */
  date?: string

  /**
   * 요청 타입.
   */
  type: number | string

  /**
   * 녹취 파일 포함 여부.
   */
  isIncludeRecord?: boolean

  /**
   * 중요도.
   */
  priority: string
}
