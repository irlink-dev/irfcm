'use client'

import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Link from '@mui/material/Link'
import RefreshIcon from '@mui/icons-material/Refresh'
import { createFileData, FileData } from '@/hooks/data'
import { getStorageFileUrls, initFirebaseApp } from '@/hooks/firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FirebasePreference from '@/types/FirebasePreference'
import useLocalStorage from '@/hooks/useLocalStorage'
import RequestForm from '@/components/fcm/RequestForm'
import Input from '@/types/Input'
import RequestType from '@/types/RequestType'
import useFormat from '@/hooks/useFormat'

const Fcm = ({ firebasePref }: { firebasePref: FirebasePreference }) => {
  const LOCAL_STORAGE_VALUES_KEY = `irfcm:input:${firebasePref.config?.projectId}`
  const LOCAL_STORAGE_FILE_DATA_KEY = `irfcm:filedata:${firebasePref.config?.projectId}`

  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()

  const { parseUrl } = useFormat()

  const [input, setInput] = React.useState<Input>(() => {
    const savedValues = getLocalStorageData(LOCAL_STORAGE_VALUES_KEY)
    return savedValues
      ? savedValues
      : {
          phoneNumber: '',
          date: '',
          type: RequestType.UPLOAD_LOGS,
          isIncludeRecord: false,
        }
  })

  const [storageRef, setStorageRef] =
    React.useState<firebase.storage.Reference>()

  const [storageFileData, setStorageFileData] = React.useState<Array<FileData>>(
    () => {
      const savedFileData = getLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY)
      return savedFileData ? savedFileData : []
    },
  )

  const init = async () => {
    const firebase = await initFirebaseApp(firebasePref.config)
    const storage = firebase.storage() // import 'firebase/compat/storage'
    return storage.ref()
  }

  React.useEffect(() => {
    init().then((ref) => setStorageRef(ref))
  }, [])

  React.useEffect(() => {
    setLocalStorageData(LOCAL_STORAGE_VALUES_KEY, input)
  }, [input])

  React.useEffect(() => {
    setLocalStorageData(LOCAL_STORAGE_FILE_DATA_KEY, storageFileData)
  }, [storageFileData])

  const getStorageFiles = async () => {
    const urls = await getStorageFileUrls(
      input.phoneNumber,
      input.date,
      storageRef!,
    )

    setStorageFileData([])
    for (const url of urls) {
      const fileName = parseUrl(url)?.fileName!
      const fileData = createFileData(fileName, '', '', url)
      setStorageFileData((prevState) => [...prevState, fileData])
    }
  }

  return (
    <Grid container spacing={3}>
      {/* 요청 양식 */}
      <Grid item xs={12} lg={6}>
        <RequestForm
          input={input}
          setInput={setInput}
          getStorageFiles={getStorageFiles}
          firebasePref={firebasePref}
        />
      </Grid>

      {/* 스토리지 파일 */}
      <Grid item xs={12} lg={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography>스토리지 파일</Typography>
            <IconButton onClick={getStorageFiles}>
              <RefreshIcon />
            </IconButton>
          </Box>
          {storageFileData.length > 0 ? (
            <Table>
              <TableBody>
                {storageFileData.map((storageFile) => (
                  <TableRow
                    key={storageFile.fileName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography
                        sx={{
                          width: 300,
                          fontSize: 14,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {decodeURIComponent(storageFile.fileName)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link href={storageFile.downloadUrl} underline="hover">
                        다운로드
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="caption" sx={{ color: '#999999' }}>
              스토리지가 비어 있습니다
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Fcm

/**
 * <TableHead>
 *     <TableRow>
 *         <TableCell>File name</TableCell>
 *         <TableCell>Download</TableCell>
 *     </TableRow>
 * </TableHead>
 */
