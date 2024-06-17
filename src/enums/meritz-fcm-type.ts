/**
 * 메리츠 FCM 요청 타입.
 */
export enum MeritzFcmType {
  /**
   * 로그 파일 업로드.
   */
  UPLOAD_LOGS = 0,
  /**
   * 녹취 파일 재전송.
   */
  RESEND_RECORD = 1,
  /**
   * 원본 파일 변환 및 재전송.
   */
  CONVERT_AND_RESEND_RECORD = 2
}
