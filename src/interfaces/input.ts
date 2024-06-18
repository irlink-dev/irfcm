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
   * amr 파일명. (메리츠 전용)
   */
  amrFileName: string

  /**
   * m4a 파일명. (메리츠 전용)
   */
  m4aFileName: string

  /**
   * call ID. (메리츠 전용)
   */
  callId: string

  /**
   * 녹취 포함 여부.
   */
  isIncludeRecord: boolean
}
