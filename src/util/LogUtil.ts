export default class LogUtil {

    TAG: string = 'LogUtil';

    /**
     * Debug 로그.
     */
    static d(tag: string, message: string) {
        this.printLog(tag, message);
    }

    /**
     * 지정된 형식에 맞춰 콘솔 로그 출력.
     */
    static printLog(tag: string, message: string) {
        console.log(`[${tag}] ${message}`);
    }

}
