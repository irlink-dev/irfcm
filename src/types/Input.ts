/**
 * 사용자 입력 값.
 */
export default interface Input {
  /**
   * 법인폰 번호.
   */
  phoneNumber: string

  /**
   * 날짜.
   */
  date: string

  /**
   * 요청 타입.
   */
  type: number

  /**
   * 녹취 포함 여부.
   */
  isIncludeRecord: boolean
}
