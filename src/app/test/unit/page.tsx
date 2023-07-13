'use client'

import FormatUtil from '@/util/FormatUtil'
import GlobalStyle from '@/style/GlobalStyle'
import ButtonStyle from '@/style/ButtonStyle'

export default function UnitTestPage() {

    const TAG: string = 'UnitTestPage'

    const formatUtil = new FormatUtil()

    function testFormatPhoneNumberWithHyphen() {
        const phoneNumber = formatUtil.formatPhoneNumberWithHyphen('01099990000')
        console.log(TAG, `phoneNumber: ${phoneNumber}`)
    }

    function testExtractFileNameFromUrl() {
        const str1 = 'https://firebasestorage.googleapis.com/v0/b/db-life.appspot.com/o/log%2F010-8318-4910%2F2023-04-11%2Flog_20230411.txt?alt=media&token=fe45086d-ba72-4c8a-a361-d2f796727b79'
        const str2 = 'https://firebasestorage.googleapis.com/v0/b/db-life.appspot.com/o/log%2F010-8318-4910%2F2023-04-11%2FIRRecorderLog_20230411.txt?alt=media&token=2d47b885-96e0-4931-b77c-dab75373a065'
        const filename1 = formatUtil.extractFileNameFromUrl(str1)
        const filename2 = formatUtil.extractFileNameFromUrl(str2)
        console.log(TAG, `filename1: ${filename1}, filename2: ${filename2}`)
    }

    function testParseUrl() {
        const url: string = 'https://firebasestorage.googleapis.com/v0/b/db-life.appspot.com/o/log%2F010-2343-4168%2F2023-04-18%2FIRRecorderLog_20230418.txt?alt=media&token=55a17f9b-3069-4644-9444-a2181933682f'
        const parseUrl = formatUtil.parseUrl(url)
        console.log(TAG, `${parseUrl?.date}, ${parseUrl?.phoneNumber}, ${parseUrl?.fileName}`)
    }

    return (
        <section className={GlobalStyle.CONTAINER}>
            <button className={ButtonStyle.ALTERNATIVE}
                    onClick={testFormatPhoneNumberWithHyphen}>FORMAT PHONE NUMBER w/ HYPHEN
            </button>
            <button className={ButtonStyle.ALTERNATIVE}
                    onClick={testExtractFileNameFromUrl}>EXTRACT FILENAME FROM URL
            </button>
            <button className={ButtonStyle.DEFAULT}
                    onClick={testParseUrl}>PARSE URL
            </button>
        </section>
    )
}
