'use client'

import * as React from 'react'
import FirebasePreference from '@/types/FirebasePreference'
import RequestType from '@/types/RequestType'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import useFcmRequest from '@/hooks/useFcmRequest'

interface RequestFormProps {
  // input: Input
  // setInput: (input: Input) => void
  getStorageFiles: () => any
  firebasePref: FirebasePreference
}

const RequestForm = ({ firebasePref, getStorageFiles }: RequestFormProps) => {
  const { request, handleChange, handleSubmit } = useFcmRequest(
    firebasePref,
    getStorageFiles,
  )

  return (
    // <Grid container spacing={3}>
    <Grid item xs={12} lg={6}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>요청 양식</Typography>
          <Button onClick={() => console.log(request)}>요청값 조회</Button>
        </Box>

        {/* 법인폰 번호 */}
        <TextField
          label="법인폰 번호"
          name="phoneNumber"
          value={request.phoneNumber}
          onChange={handleChange}
          required
        />

        {/* 날짜 */}
        <TextField
          label="날짜"
          name="date"
          value={request.date}
          onChange={handleChange}
          required
        />

        {/* 요청 타입 */}
        <FormControl>
          <InputLabel id="type">요청 타입</InputLabel>

          <Select
            labelId="type"
            name="type"
            value={request.type}
            label="요청 타입"
            onChange={handleChange}
          >
            <MenuItem value={RequestType.UPLOAD_LOGS}>[1] 로그</MenuItem>
            <MenuItem value={RequestType.UPLOAD_FILE_LIST}>
              [2] 파일 리스트
            </MenuItem>
            <MenuItem value={RequestType.UPLOAD_RECORDS}>
              [5] 녹취 파일 업로드
            </MenuItem>
          </Select>
        </FormControl>

        {/* 녹취 파일 포함 */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="isIncludeRecord"
                value={request.isIncludeRecord}
                checked={request.isIncludeRecord}
                onChange={handleChange}
              />
            }
            label="녹취 파일 포함"
          />
        </FormGroup>

        {/* FCM 요청 */}
        <Button type="submit" onClick={handleSubmit} variant="contained">
          FCM 요청
        </Button>
      </Paper>
    </Grid>
    // </Grid>
  )
}

export default RequestForm
