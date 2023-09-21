'use client'

import React from 'react'
import RequestType from '@/types/RequestType'
import Input from '@/types/Input'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'

interface RequestFormProps {
  input: Input
  handleSubmit: () => void
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => void
}

const RequestForm = ({
  input,
  handleSubmit,
  handleChange,
}: RequestFormProps) => {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography>요청 양식</Typography>
        <Button onClick={() => console.log(input)}>요청값 조회</Button>
      </Box>
      <TextField
        label="법인폰 번호"
        name="phoneNumber"
        value={input.phoneNumber}
        onChange={handleChange}
        required
      />
      <TextField
        label="날짜"
        name="date"
        value={input.date}
        onChange={handleChange}
        required
      />
      <FormControl>
        <InputLabel id="type">요청 타입</InputLabel>
        <Select
          labelId="type"
          name="type"
          value={input.type}
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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name="isIncludeRecord"
              value={input.isIncludeRecord}
              checked={input.isIncludeRecord}
              onChange={handleChange}
            />
          }
          label="녹취 파일 포함"
        />
      </FormGroup>
      <Button type="submit" onClick={handleSubmit} variant="contained">
        FCM 요청
      </Button>
    </Paper>
  )
}

export default RequestForm
