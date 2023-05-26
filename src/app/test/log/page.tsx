'use client'

import { useState } from 'react'
import LogUtil from '@/util/LogUtil'
import FormatUtil from '@/util/FormatUtil'
import FirebaseUtil from '@/util/FirebaseUtil'
import IrFirebaseConfig from '@/util/IrFirebaseConfig'
import FirebaseManager from '@/manager/FirebaseManager'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

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
        <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ mb: 1, width: '100%', display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <TextField
                    label="Date"
                    placeholder="yyyy-mm-dd"
                    variant="outlined"
                    size="small"
                    value={date}
                    onChange={handleDateChange}
                    sx={{ width: '100%' }} />
                <Button
                    variant="contained"
                    onClick={fcmRequest}
                    color="primary"
                    sx={{ height: '40px' }}>

                    <Typography noWrap sx={{ width: '140px', fontSize: '0.875rem', fontWeight: 500 }}>
                        FCM REQUEST
                    </Typography>
                </Button>
            </Box>
            <Box>
                <Button variant="outlined" onClick={initApp}>
                    INIT APP w/ DB_LIFE
                </Button>{' '}
                <Button variant="outlined" onClick={getLogs}>
                    GET LOGS
                </Button>{' '}
                <Button variant="outlined" onClick={showUrls}>
                    SHOW URLS
                </Button>
            </Box>
        </Paper>
        <TableContainer component={Paper} sx={{ p: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File name</TableCell>
                        <TableCell>Phone number</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Download</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showUrl && (
                        downloadLinks.map(url => (
                            <TableRow
                                key={url}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCell>{formatUtil.parseUrl(url)?.fileName!}</TableCell>
                                <TableCell>{formatUtil.parseUrl(url)?.phoneNumber!}</TableCell>
                                <TableCell>{formatUtil.parseUrl(url)?.date!}</TableCell>
                                <TableCell>
                                    <Link href={url} underline="hover">다운로드</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
