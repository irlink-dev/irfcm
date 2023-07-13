import UseCase from '@/domain/UseCase';
import IrResponse from '@/util/IrResponse';

export default class SendFcmUseCase extends UseCase<Request, Response> {

    TAG: string = 'SendFcmUseCase';

    FCM_REQUEST_URL = 'https://fcm.googleapis.com/fcm/send';


    /**
     * FCM 전송 API 요청.
     */
    override request(
        request: Request, onResponse: (response: Response) => any
    ): any {
        fetch(this.FCM_REQUEST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': request.authorizationKey
            },
            body: JSON.stringify({
                'to': String(request.token),
                'data': {
                    'type': Number(request.requestType),
                    'date': String(request.date),
                    'isIncludeRecord': Boolean(request.isIncludeRecord)
                },
                'priority': String(request.priority)
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == 1) {
                    const response = new Response(
                        IrResponse.Code.SUCCESS,
                        'FCM 전송 성공.'
                    );
                    onResponse(response);
                }
                if (data.failure == 1) {
                    const response = new Response(
                        IrResponse.Code.FAIL,
                        '잘못된 요청이거나 법인폰 전원이 꺼져 있습니다.'
                    );
                    onResponse(response);
                }
            })
            .catch(error => {
                console.log(this.TAG, `request. error: ${error}`);
                const response = new Response(
                    IrResponse.Code.FAIL,
                    'FCM 요청 중 에러가 발생했습니다. 다시 시도해주세요.'
                );
                onResponse(response);
            });
    }

}


interface Request {
    authorizationKey: string,               // 고객사별 파이어베이스 인증 키.
    token: string,                          // 법인폰 파이어베이스 토큰.
    date: string,                           // 로그 날짜.
    requestType: string,                    // 요청 타입.
    isIncludeRecord: boolean,               // 녹취 파일 포함 여부.
    priority: string                        // 중요도.
}

class Response extends IrResponse {
    code?: number;                          // 응답 코드.
    message?: string;                       // 응답 메시지.
}
