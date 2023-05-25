'use client'

import FirebaseUtil from '@/util/FirebaseUtil'
import IrFirebaseConfig from '@/util/IrFirebaseConfig'
import GlobalStyle from '@/style/GlobalStyle'
import LogUtil from '@/util/LogUtil'
import { useState } from 'react'
import FirebaseManager from '@/manager/FirebaseManager'
import FormatUtil from '@/util/FormatUtil'
import ButtonStyle from '@/style/ButtonStyle'
import { Button, Paper, TextField, Typography } from '@mui/material'

export default function LogTestPage() {

    const TAG: string = 'LogTestPage'

    const firebaseUtil = new FirebaseUtil()
    const firebaseManager = new FirebaseManager()
    const irFirebaseConfig = new IrFirebaseConfig()
    const formatUtil = new FormatUtil()

    const [date, setDate] = useState<string>('')
    const [bucket, setBucket] = useState<any>()
    const [downloadLinks, setDownloadLinks] = useState<Array<string>>([])
    const [showUrl, setShowUrl] = useState<boolean>(false)

    function initApp() {
        const app = firebaseUtil.initFirebaseApp(irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG)
        const bucketName = irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG.storageBucket
        const bucket = app.storage().refFromURL(`gs://${bucketName}`)
        setBucket(bucket)
    }

    async function fcmRequest() {
        const response = await fetch(`/api/AuthorizationKey?clientKey=${firebaseManager.clientKey.DB_LIFE}`)
        const data = await response.json()
        const authorizationKey = data.authorizationKey
        LogUtil.d(TAG, `fcmRequest. authorizationKey: ${authorizationKey}`)
        await firebaseUtil.sendFcmToAllTokens(authorizationKey, date)
    }

    async function getLogs() {
        if (!bucket) {
            LogUtil.d(TAG, `getLogs. bucket is undefined. return.`)
            return
        }
        const phoneNumberList = await firebaseUtil.getPhoneNumberList(bucket)
        LogUtil.d(TAG, `getLogs. phoneNumberList: ${phoneNumberList.length}`)

        setDownloadLinks([])                                           // 다운로드 링크 목록 비우기.

        for (const phoneNumber of phoneNumberList) {
            firebaseUtil.getLogsInFolder(phoneNumber, date)
                .then((urls) => {
                    setDownloadLinks(prevState => prevState.concat(urls))
                })
                .catch(error => {
                    LogUtil.exception(TAG, error)
                })
        }
    }

    function showUrls() {
        LogUtil.d(TAG, `showUrls. downloadLinks: ${downloadLinks.length}`)
        if (downloadLinks.length > 0) {
            setShowUrl(true)
        }
    }

    function handleDateChange(event: any) {
        setDate(event.target.value)
    }

    return <>
        <Typography sx={{ mb: 2 }}>전체 로그 수집</Typography>
        <Paper sx={{ p: 2, mb: 1 }}>
            <TextField
                label="YYYY-MM-DD 형태로 날짜를 입력하세요"
                variant="filled"
                size="small"
                fullWidth
                value={date}
                onChange={handleDateChange}
                sx={{ mb: 1 }} />

            <Button variant="outlined" onClick={initApp}>
                INIT APP w/ DB_LIFE
            </Button>{' '}
            <Button variant="outlined" onClick={fcmRequest} color="secondary">
                <strong>FCM REQUEST</strong>
            </Button>{' '}
            <Button variant="outlined" onClick={getLogs}>
                GET LOGS
            </Button>{' '}
            <Button variant="outlined" onClick={showUrls}>
                SHOW URLS
            </Button>
        </Paper>
        <Paper sx={{ p: 2 }}>
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
                            <TableListRow
                                key={url}
                                fileName={formatUtil.parseUrl(url)?.fileName!}
                                phoneNumber={formatUtil.parseUrl(url)?.phoneNumber!}
                                date={formatUtil.parseUrl(url)?.date!}
                                downloadUrl={url} />
                        ))
                    ) : null}
                    </tbody>
                </table>
            </div>
        </Paper>
    </>
}

interface TableListRowProps {
    fileName: string
    phoneNumber: string
    date: string
    downloadUrl: string
}

function TableListRow({ fileName, phoneNumber, date, downloadUrl }: TableListRowProps) {
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
    )
}
