export default class FormatUtil {

    TAG: string = 'FormatUtil';

    /**
     * 전화번호 하이픈 형식 포맷.
     */
    formatPhoneNumberWithHyphen(phoneNumber: string) {
        const match = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        } else {
            return phoneNumber;
        }
    }

    /**
     * 파이어베이스 스토리지 파일 다운로드 링크에서 파일명만 추출. (확장자 포함)
     */
    extractFileNameFromUrl(url: string): string {
        const fileNameRegex = /%2f(.*?)\?/i;
        const matches = fileNameRegex.exec(url);
        const str = matches ? matches[1] : '';
        const parts = str.split('%2F');
        const lastPart = parts[parts.length - 1];
        return lastPart;
    }

}
