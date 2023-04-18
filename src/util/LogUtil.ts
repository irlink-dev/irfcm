export default class LogUtil {

    TAG: string = 'LogUtil';

    /**
     * Debug 로그.
     */
    static d(tag: string, message: string) {
        this.printLog(tag, message);
    }

    /**
     * 예외(에러) 로그.
     */
    static exception(tag: string, error: Error | unknown) {
        this.printErrorLog(tag, error);
    }

    /**
     * 지정된 형식에 맞춰 콘솔 로그 출력.
     */
    static printLog(tag: string, message: string) {
        console.log(`[${tag}] ${message}`);
    }

    /**
     * 콘솔 에러 로그 출력.
     */
    static printErrorLog(tag: string, error: Error | unknown) {
        console.error(`[${tag}] ${error}`);
    }

}
