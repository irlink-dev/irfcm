import UseCase from '@/domain/UseCase';
import IrResponse from '@/util/IrResponse';

export default class GetLogsUseCase extends UseCase<Request, Response> {


    /**
     * 로그 다운로드 링크 API 요청.
     */
    override request(
        request: Request, onResponse: (response: Response) => void
    ) {
        // ...
    }
}


interface Request {
    date: string;           // 로그 날짜.
}

class Response extends IrResponse {
    /* empty */
}
