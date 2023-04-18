'use client';

import FormatUtil from '@/util/FormatUtil';
import LogUtil from '@/util/LogUtil';

export default function UnitTestPage() {

    const TAG: string = 'UnitTestPage';

    const formatUtil = new FormatUtil();

    function testFormatPhoneNumberWithHyphen() {
        const phoneNumber = formatUtil.formatPhoneNumberWithHyphen('01099990000');
        LogUtil.d(TAG, `phoneNumber: ${phoneNumber}`);
    }

    function testExtractFileNameFromUrl() {
        const str1 = 'https://firebasestorage.googleapis.com/v0/b/db-life.appspot.com/o/log%2F010-8318-4910%2F2023-04-11%2Flog_20230411.txt?alt=media&token=fe45086d-ba72-4c8a-a361-d2f796727b79';
        const str2 = 'https://firebasestorage.googleapis.com/v0/b/db-life.appspot.com/o/log%2F010-8318-4910%2F2023-04-11%2FIRRecorderLog_20230411.txt?alt=media&token=2d47b885-96e0-4931-b77c-dab75373a065';
        const filename1 = formatUtil.extractFileNameFromUrl(str1);
        const filename2 = formatUtil.extractFileNameFromUrl(str2);
        LogUtil.d(TAG, `filename1: ${filename1}, filename2: ${filename2}`);
    }

    return (
        <>
            <button onClick={testFormatPhoneNumberWithHyphen}>formatPhoneNumberWithHyphen</button>
            <br />
            <button onClick={testExtractFileNameFromUrl}>extractFileNameFromUrl</button>
        </>
    );
}
