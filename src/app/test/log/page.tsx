'use client'

import * as React from 'react'
import FirebaseUtil from '@/utils/FirebaseUtil'
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
import useFormat from '@/hooks/useFormat'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'

export default function LogTestPage() {
  const TAG: string = 'LogTestPage'

  const firebaseUtil = new FirebaseUtil()
  const firebaseManager = new FirebaseManager()

  const [date, setDate] = React.useState<string>('')
  const [bucket, setBucket] = React.useState<any>()
  const [downloadLinks, setDownloadLinks] = React.useState<Array<string>>([])
  const [showUrl, setShowUrl] = React.useState<boolean>(false)

  const { parseUrl } = useFormat()

  /* TODO 'use client' 에서 config 가져오면 app deleted 됨. 정석대로 Server Side 에서 props 로 넘겨줘야 함. */
  function initApp() {
    // const app = firebaseUtil.initFirebaseApp(useFirebaseConfig('dblife')!)
    // const bucketName = useFirebaseConfig('dblife')!.storageBucket
    // const bucket = app.storage().refFromURL(`gs://${bucketName}`)
    // setBucket(bucket)
  }

  async function fcmRequest() {
    const response = await fetch(
      `/api/AuthorizationKey?clientKey=${firebaseManager.clientKey.DB_LIFE}`,
    )
    const data = await response.json()
    const authorizationKey = data.authorizationKey
    console.log(TAG, `fcmRequest. authorizationKey: ${authorizationKey}`)
    await firebaseUtil.sendFcmToAllTokens(authorizationKey, date)
  }

  async function getLogs() {
    if (!bucket) {
      console.log(TAG, `getLogs. bucket is undefined. return.`)
      return
    }
    const phoneNumberList = await firebaseUtil.getPhoneNumberList(bucket)
    console.log(TAG, `getLogs. phoneNumberList: ${phoneNumberList.length}`)

    setDownloadLinks([]) // 다운로드 링크 목록 비우기.

    for (const phoneNumber of phoneNumberList) {
      firebaseUtil
        .getLogsInFolder(phoneNumber, date)
        .then((urls) => {
          setDownloadLinks((prevState) => prevState.concat(urls))
        })
        .catch((error) => {
          console.log(TAG, error)
        })
    }
  }

  function showUrls() {
    console.log(TAG, `showUrls. downloadLinks: ${downloadLinks.length}`)
    if (downloadLinks.length > 0) {
      setShowUrl(true)
    }
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDate(event.target.value)
  }

  return (
    <>
      <Typography sx={{ mb: 2 }}>전체 로그 수집</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            mb: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <TextField
            label="Date"
            placeholder="yyyy-mm-dd"
            variant="outlined"
            size="small"
            value={date}
            onChange={handleDateChange}
            sx={{ width: '100%' }}
          />
          <Button
            variant="contained"
            onClick={fcmRequest}
            color="primary"
            sx={{ height: '40px' }}
          >
            <Typography
              noWrap
              sx={{ width: '140px', fontSize: '0.875rem', fontWeight: 500 }}
            >
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
            {showUrl &&
              downloadLinks.map((url) => (
                <TableRow
                  key={url}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{parseUrl(url)?.fileName!}</TableCell>
                  <TableCell>{parseUrl(url)?.phoneNumber!}</TableCell>
                  <TableCell>{parseUrl(url)?.date!}</TableCell>
                  <TableCell>
                    <Link href={url} underline="hover">
                      다운로드
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
