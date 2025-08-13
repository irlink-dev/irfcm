/**
 * FCM 요청 타입.
 */
export enum FcmType {
  /**
   * 로그 파일 업로드.
   */
  UPLOAD_LOGS = 1,

  /**
   * m4a/amr 파일 목록 업로드.
   */
  UPLOAD_FILE_LIST = 2,

  /**
   * 파일 강제 변환.
   */
  FORCE_CONVERT_FILE = 3,

  /**
   * 레거시 통화 기록 업로드.
   */
  UPLOAD_CALL_LOG = 4,

  /**
   * 녹취 파일 업로드.
   */
  UPLOAD_RECORDS = 5,

  /**
   * reUploadAllFiles 함수 호출.
   */
  CALL_RE_UPLOAD_ALL_FILES = 6,

  /**
   * 상판 막기.
   */
  ENABLE_BLOCK_WINDOW = 200,

  /**
   * 상판 열기.
   */
  DISABLE_BLOCK_WINDOW = 201,
}
