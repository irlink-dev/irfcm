'use client';

import IrFirebaseConfig from '@/util/IrFirebaseConfig';
import LogUtil from '@/util/LogUtil';
import { useEffect } from 'react';
import 'firebase/compat/storage';
import FirebaseUtil from '@/util/FirebaseUtil';

export default function TestPage() {

    const TAG: string = 'TestPage';

    const firebaseUtil = new FirebaseUtil();
    const irFirebaseConfig = new IrFirebaseConfig();

    let bucket: any = null;

    useEffect(() => {
        const app = firebaseUtil.initFirebaseApp(irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG);
        const bucketName = irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG.storageBucket;
        bucket = app.storage().refFromURL(`gs://${bucketName}`);
    }, []);

    async function getFileDownloadLinks(filenames: Array<string>): Promise<Array<string>> {
        const urls: Array<string> = [];

        for (const filename of filenames) {
            const fileRef = bucket.child(filename);
            const url = await fileRef.getDownloadURL();
            urls.push(url);
        }
        return urls;
    }

    function getLogs() {
        const phoneNumber = '010-8318-4910';
        const date = '2023-04-10';
        const dateWithoutHyphen = date.replace(/-/g, '');

        const filenames = [
            `log/${phoneNumber}/${date}/log_${dateWithoutHyphen}.txt`,
            `log/${phoneNumber}/${date}/IRRecorderLog_${dateWithoutHyphen}.txt`,
        ];
        getFileDownloadLinks(filenames)
            .then(urls => {
                LogUtil.d(TAG, `getFileDownloadLinks. length: ${urls.length}`);
            })
            .catch(error => {
                LogUtil.exception(TAG, error);
            });
    }

    return (
        <>
            <button onClick={getLogs}>테스트 버튼</button>
        </>
    );
}
