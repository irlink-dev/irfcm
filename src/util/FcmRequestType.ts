export default class RequestType {

    /**
     * 로그 업로드.
     */
    static UPLOAD_LOGS = 1;

    /**
     * 파일 리스트 업로드.
     */
    static UPLOAD_FILE_LIST = 2;

    /**
     * 녹취 파일 강제 변환.
     */
    static FORCE_CONVERT_FILE = 3;

    /**
     * 상판 막기.
     */
    static ENABLE_BLOCK_WINDOW = 200;

    /**
     * 상판 해제.
     */
    static DISABLE_BLOCK_WINDOW = 201;

};

/**
 * TODO FCM Request Type 에 따른 처리 분기.
 * UPLOAD_LOGS, UPLOAD_FILE_LIST 는 POST 후 자동으로 다운로드 링크를 GET 하는 방식으로.
 * FORCE_CONVERT_FILE?, ENABLE_BLOCK_WINDOW, DISABLE_BLOCK_WINDOW 는 POST 만 하면 됨.
 */
