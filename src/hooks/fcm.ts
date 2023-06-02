/**
 * 요청 타입.
 */
const requestType = () => {

    /**
     * 로그 파일 업로드.
     */
    const UPLOAD_LOGS = 1

    /**
     * m4a/amr 파일 목록 업로드.
     */
    const UPLOAD_FILE_LIST = 2

    /**
     * 파일 강제 변환.
     */
    const FORCE_CONVERT_FILE = 3

    /**
     * 레거시 통화 기록 업로드.
     */
    const UPLOAD_CALL_LOG = 4

    /**
     * 녹취 파일 업로드.
     */
    const UPLOAD_RECORDS = 5

    /**
     * ROOM 데이터베이스 업로드.
     */
    const UPLOAD_DATABASE = 6

    /**
     * 서비스 재시작.
     */
    const RESTART_SERVICE = 10

    /**
     * 전화 생성.
     */
    const MAKE_CALL = 100

    /**
     * 전화 연결.
     */
    const CONNECT_CALL = 101

    /**
     * 전화 끊기.
     */
    const DISCONNECT_CALL = 102

    /**
     * 상판 막기.
     */
    const ENABLE_BLOCK_WINDOW = 200

    /**
     * 상판 열기.
     */
    const DISABLE_BLOCK_WINDOW = 201


    return {
        UPLOAD_LOGS,                    //   1
        UPLOAD_FILE_LIST,               //   2
        FORCE_CONVERT_FILE,             //   3
        UPLOAD_CALL_LOG,                //   4
        UPLOAD_RECORDS,                 //   5
        UPLOAD_DATABASE,                //   6
        RESTART_SERVICE,                //  10
        MAKE_CALL,                      // 100
        CONNECT_CALL,                   // 101
        DISCONNECT_CALL,                // 102
        ENABLE_BLOCK_WINDOW,            // 200
        DISABLE_BLOCK_WINDOW            // 201
    }
}

export interface Request {

    /**
     * 고객사별 파이어베이스 인증 키.
     */
    authorizationKey: string

    /**
     * 법인폰 파이어베이스 토큰.
     */
    token: string

    /**
     * 로그 날짜.
     */
    date: string

    /**
     * 요청 타입.
     */
    type: string

    /**
     * 녹취 파일 포함 여부.
     */
    isIncludeRecord: boolean

    /**
     * 중요도.
     */
    priority: string
}

/**
 * FCM 요청.
 */
const requestFcm = async (request: Request) => {
    const FCM_REQUEST_URL = 'https://fcm.googleapis.com/fcm/send'

    return await fetch(FCM_REQUEST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': request.authorizationKey
        },
        body: JSON.stringify({
            'to': String(request.token),
            'data': {
                'type': Number(request.type),
                'date': String(request.date),
                'isIncludeRecord': Boolean(request.isIncludeRecord)
            },
            'priority': String(request.priority)
        })
    }).then(response => response.json())
}

export { requestType, requestFcm }


/**
 * .then(data => {
 *     if (data.success == 1) {
 *         const response = new Response(
 *             IrResponse.Code.SUCCESS,
 *             'FCM 전송 성공.'
 *         )
 *         onResponse(response)
 *     }
 *     if (data.failure == 1) {
 *         const response = new Response(
 *             IrResponse.Code.FAIL,
 *             '잘못된 요청이거나 법인폰 전원이 꺼져 있습니다.'
 *         )
 *         onResponse(response)
 *     }
 * })
 * .catch(error => {
 *     LogUtil.d(this.TAG, `request. error: ${error}`)
 *     const response = new Response(
 *         IrResponse.Code.FAIL,
 *         'FCM 요청 중 에러가 발생했습니다. 다시 시도해주세요.'
 *     )
 *     onResponse(response)
 * })
 */
