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
   * ROOM 데이터베이스 업로드.
   */
  UPLOAD_DATABASE = 6,

  /**
   * 서비스 재시작.
   */
  RESTART_SERVICE = 10,

  /**
   * 전화 생성.
   */
  MAKE_CALL = 100,

  /**
   * 전화 연결.
   */
  CONNECT_CALL = 101,

  /**
   * 전화 끊기.
   */
  DISCONNECT_CALL = 102,

  /**
   * 상판 막기.
   */
  ENABLE_BLOCK_WINDOW = 200,

  /**
   * 상판 열기.
   */
  DISABLE_BLOCK_WINDOW = 201,
}
