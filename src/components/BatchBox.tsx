'use client'

import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import RefreshIcon from '@mui/icons-material/Refresh'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { requestFcm, requestType } from '@/utils/fcm'
import {
  getUserToken,
  getStorageFileUrls,
  initFirebaseApp,
} from '@/utils/firebase'
import { showErrorSnackbar, showSuccessSnackbar } from '@/utils/snackbar'
import { grey } from '@mui/material/colors'
import { createFileData } from '@/utils/data'
import FirebasePreference from '@/interfaces/FirebasePreference'
import Input from '@/interfaces/Input'
import Request from '@/interfaces/Request'

const BatchBox = ({ firebasePref }: { firebasePref: FirebasePreference }) => {
  const { UPLOAD_LOGS, UPLOAD_FILE_LIST, UPLOAD_RECORDS } = requestType()

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => {
    const { value, name } = event.target

    if ('checked' in event.target && name === 'isIncludeRecord') {
      // console.log(`[${name}] ${event.target.checked}`)
      setValues({
        ...values,
        [name]: event.target.checked,
      })
    } else {
      // console.log(`[${name}] ${value}`)
      setValues({
        ...values,
        [name]: value,
      })
    }
  }

  const handleSubmit = async () => {
    // const token = await getUserToken(values.phoneNumber)
    // const request: Request = {
    //     authorizationKey: authorizationKey,
    //     token: token,
    //     date: values.date,
    //     type: values.type.toString(),
    //     isIncludeRecord: values.isIncludeRecord,
    //     priority: 'high'
    // }
    // const response = await requestFcm(request)
    // console.log(response)
    // if (response.success === 1) {
    // showSuccessSnackbar(enqueueSnackbar, 'FCM 전송 성공')
    // setTimeout(() => {
    //     getStorageFiles().then(() => {
    //         /* empty */
    //     })
    // }, 3000)
    // }
    // if (response.failure === 1) {
    // showErrorSnackbar(enqueueSnackbar, 'FCM 전송 실패')
    // }
  }

  const getStorageFiles = async () => {
    // const urls = await getStorageFileUrls(values.phoneNumber, values.date, storageRef!)
    //
    // setStorageFileData([])
    // for (const url of urls) {
    //     const fileName = parseUrl(url)?.fileName!
    //     const fileData = createFileData(fileName, '', '', url)
    //     setStorageFileData(prevState => [...prevState, fileData])
    // }
  }

  const [values, setValues] = React.useState<Input>({
    phoneNumber: '',
    date: '',
    type: UPLOAD_LOGS,
    isIncludeRecord: false,
  })

  const {
    // phoneNumber,
    date,
    type,
    isIncludeRecord,
  } = values

  const [storageRef, setStorageRef] =
    React.useState<firebase.storage.Reference>()

  const init = async () => {
    // const firebase = await initFirebaseApp(firebasePref.config)
    const storage = firebase.storage() // import 'firebase/compat/storage'
    return storage.ref()
  }

  React.useEffect(() => {
    init().then((ref) => setStorageRef(ref))
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography>요청 양식</Typography>
            {/*<TextField*/}
            {/*    label="법인폰 번호"*/}
            {/*    name="phoneNumber"*/}
            {/*    value={phoneNumber}*/}
            {/*    onChange={handleChange}*/}
            {/*    required />*/}
            <TextField
              label="날짜"
              name="date"
              value={date}
              onChange={handleChange}
              required
            />
            <FormControl>
              <InputLabel id="type">요청 타입</InputLabel>
              <Select
                labelId="type"
                name="type"
                value={type}
                label="요청 타입"
                onChange={handleChange}
              >
                <MenuItem value={UPLOAD_LOGS}>[1] 로그</MenuItem>
                <MenuItem value={UPLOAD_FILE_LIST}>[2] 파일 리스트</MenuItem>
                <MenuItem value={UPLOAD_RECORDS}>[5] 녹취 파일 업로드</MenuItem>
              </Select>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isIncludeRecord"
                    value={isIncludeRecord}
                    checked={isIncludeRecord}
                    onChange={handleChange}
                    disabled
                  />
                }
                label="녹취 파일 포함"
              />
              <Typography variant="caption" sx={{ color: grey[500] }}>
                모든 법인폰의 녹취 파일을 전부 수집하므로 주의해야 함
              </Typography>
            </FormGroup>
            <Button type="submit" onClick={handleSubmit} variant="contained">
              FCM 요청
            </Button>
          </Paper>
          <Button onClick={() => console.log(values)} sx={{ mt: 2, mb: 2 }}>
            Show req values
          </Button>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography>배치</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Paper
            sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
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
            {/*{storageFileData.length > 0 ? (*/}
            {/*    <Table>*/}
            {/*        <TableBody>*/}
            {/*            {storageFileData.map(storageFile => (*/}
            {/*                <TableRow*/}
            {/*                    key={storageFile.fileName}*/}
            {/*                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
            {/*                >*/}
            {/*                    <TableCell>*/}
            {/*                        <Typography*/}
            {/*                            sx={{*/}
            {/*                                width: 300,*/}
            {/*                                fontSize: 14,*/}
            {/*                                whiteSpace: 'nowrap',*/}
            {/*                                overflow: 'hidden',*/}
            {/*                                textOverflow: 'ellipsis'*/}
            {/*                            }}*/}
            {/*                        >*/}
            {/*                            {decodeURIComponent(storageFile.fileName)}*/}
            {/*                        </Typography>*/}
            {/*                    </TableCell>*/}
            {/*                    <TableCell>*/}
            {/*                        <Link*/}
            {/*                            href={storageFile.downloadUrl}*/}
            {/*                            underline=" hover"*/}
            {/*                        >*/}
            {/*                            다운로드*/}
            {/*                        </Link>*/}
            {/*                    </TableCell>*/}
            {/*                </TableRow>*/}
            {/*            ))}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*) : (*/}
            {/*    <Typography*/}
            {/*        variant=" caption"*/}
            {/*        sx={{ color: '#999999' }}*/}
            {/*    >*/}
            {/*        스토리지가 비어 있습니다*/}
            {/*    </Typography>*/}
            {/*)}*/}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default BatchBox
