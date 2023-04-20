'use client';

import FirebaseUtil from '@/util/FirebaseUtil';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';
import GlobalStyle from '@/style/GlobalStyle';
import LogUtil from '@/util/LogUtil';
import { useState } from 'react';
import FirebaseManager from '@/manager/FirebaseManager';
import FormatUtil from '@/util/FormatUtil';
import ButtonStyle from '@/style/ButtonStyle';

export default function LogTestPage() {

    const TAG: string = 'LogTestPage';

    const firebaseUtil = new FirebaseUtil();
    const firebaseManager = new FirebaseManager();
    const irFirebaseConfig = new IrFirebaseConfig();
    const formatUtil = new FormatUtil();

    const DATE = '2023-04-18';
    const [bucket, setBucket] = useState<any>();
    const [downloadLinks, setDownloadLinks] = useState<Array<string>>([]);
    const [showUrl, setShowUrl] = useState<boolean>();

    function initApp() {
        const app = firebaseUtil.initFirebaseApp(irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG);
        const bucketName = irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG.storageBucket;
        const bucket = app.storage().refFromURL(`gs://${bucketName}`);
        setBucket(bucket);
    }

    async function fcmRequest() {
        const response = await fetch(`/api/AuthorizationKey?clientKey=${firebaseManager.clientKey.DB_LIFE}`);
        const data = await response.json();
        const authorizationKey = data.authorizationKey;
        LogUtil.d(TAG, `fcmRequest. authorizationKey: ${authorizationKey}`);
        await firebaseUtil.sendFcmToAllTokens(authorizationKey, DATE);
    }

    async function getLogs() {
        if (!bucket) {
            LogUtil.d(TAG, `getLogs. bucket is undefined. return.`);
            return;
        }
        const phoneNumberList = await firebaseUtil.getPhoneNumberList(bucket);
        LogUtil.d(TAG, `getLogs. phoneNumberList: ${phoneNumberList.length}`);

        setDownloadLinks([]);                                           // 다운로드 링크 목록 비우기.

        for (const phoneNumber of phoneNumberList) {
            firebaseUtil.getLogsInFolder(phoneNumber, DATE)
                .then((urls) => {
                    setDownloadLinks(prevState => prevState.concat(urls));
                })
                .catch(error => {
                    LogUtil.exception(TAG, error);
                });
        }
    }

    function showUrls() {
        LogUtil.d(TAG, `showUrls. downloadLinks: ${downloadLinks.length}`);
        if (downloadLinks.length > 0) {
            setShowUrl(true);
        }
    }

    return (
        <section className={GlobalStyle.CONTAINER}>

            <button type="button"
                    onClick={initApp}
                    className={ButtonStyle.ALTERNATIVE}>INIT APP
            </button>
            <button type="button"
                    onClick={fcmRequest}
                    className={ButtonStyle.DEFAULT}>FCM REQUEST
            </button>
            <button type="button"
                    onClick={getLogs}
                    className={ButtonStyle.ALTERNATIVE}>GET LOGS
            </button>
            <button type="button"
                    onClick={showUrls}
                    className={ButtonStyle.ALTERNATIVE}>SHOW URLS
            </button>
            <br />

            <div className="relative overflow-x-auto my-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            File name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Download
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {showUrl ? (
                        downloadLinks.map(url => (
                            <TableList key={url}
                                       fileName={formatUtil.parseUrl(url)?.fileName!}
                                       phoneNumber={formatUtil.parseUrl(url)?.phoneNumber!}
                                       date={formatUtil.parseUrl(url)?.date!}
                                       downloadUrl={url} />
                        ))
                    ) : null}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function TableList({
                       fileName,
                       phoneNumber,
                       date,
                       downloadUrl,
                   }: {
    fileName: string,
    phoneNumber: string,
    date: string,
    downloadUrl: string,
}) {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {fileName}
            </th>
            <td className="px-6 py-4">
                {phoneNumber}
            </td>
            <td className="px-6 py-4">
                {date}
            </td>
            <td className="px-6 py-4">
                <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                   href={downloadUrl}
                   download={`${fileName}_${phoneNumber}.txt`}>다운로드</a>
            </td>
        </tr>
    );
}
