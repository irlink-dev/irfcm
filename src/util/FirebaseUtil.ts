import firebase from 'firebase/compat/app';
import LogUtil from '@/util/LogUtil';
import FormatUtil from '@/util/FormatUtil';

export default class FirebaseUtil {

    TAG: string = 'FirebaseUtil';

    formatUtil = new FormatUtil();

    /**
     * 파이어베이스 초기화.
     */
    initFirebaseApp = (firebaseConfig: FirebaseConfig) => {
        LogUtil.d(this.TAG, `initFirebaseApp. projectId: ${firebaseConfig.projectId}`);

        if (firebase.apps.length == 0) {
            firebase.initializeApp(firebaseConfig);                                         // 앱이 존재하지 않으면, 앱을 초기화.
        } else {
            firebase.app().delete().then(() => firebase.initializeApp(firebaseConfig));     // 앱이 존재하면, 삭제하고 다시 초기화.
        }
        return firebase;
    };

    /**
     * 파일 다운로드 링크 받기.
     */
    async getFileDownloadLinks(
        filenames: Array<string>,
        bucket: firebase.storage.Reference
    ) {
        const urls: Array<string> = [];

        for (const filename of filenames) {
            const fileRef = bucket.child(filename);
            const url = await fileRef.getDownloadURL();
            urls.push(url);
        }
        return urls;
    }

    /**
     * 로그 다운로드 링크 받기.
     */
    async getLogDownloadLinks(
        phoneNumber: string,
        date: string,
        bucket: firebase.storage.Reference
    ) {
        const phoneNumberWithHyphen = this.formatUtil.formatPhoneNumberWithHyphen(phoneNumber);
        const dateWithoutHyphen = date.replace(/-/g, '');

        const filenames = [
            `log/${phoneNumberWithHyphen}/${date}/log_${dateWithoutHyphen}.txt`,                    // 앱 로그.
            `log/${phoneNumberWithHyphen}/${date}/IRRecorderLog_${dateWithoutHyphen}.txt`,          // 레코더 로그.
        ];
        try {
            const urls = await this.getFileDownloadLinks(filenames, bucket);
            LogUtil.d(this.TAG, `getLogDownloadLinks. length: ${urls.length}`);
            return urls;

        } catch (error) {
            LogUtil.exception(this.TAG, error);
            LogUtil.d(this.TAG, `getLogDownloadLinks. return empty array.`);
            return [];
        }
    }

}

