'use client'

import React from 'react'
import Input from '@/interfaces/Input'
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
import { FcmMethod } from '@/enums/FcmMethod'
import { Client, ClientType } from '@/enums/Client'
import { FcmType } from '@/enums/FcmType'
import { MeritzFcmType } from '@/enums/MeritzFcmType'

interface RequestFormProps {
  params: { client: ClientType }
  input: Input
  // handleSubmit: (option: string) => void
  onSubmit: (method: number | undefined, client: ClientType) => void
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => void
}

const RequestForm = ({
  params,
  input,
  // handleSubmit,
  onSubmit,
  handleChange,
}: RequestFormProps) => {
  const IS_MERITZ = params.client === Client.MERITZ

  /**
   * 요청 버튼 클릭 시
   */
  const onRequestButtonClick = () => {
    if (params.client === Client.L_POINT) {
      onSubmit(FcmMethod.HTTP_V1, params.client)
    } else {
      onSubmit(FcmMethod.LEGACY, params.client)
    }
  }

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
        disabled={IS_MERITZ}
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
          {/* 메리츠 */}
          {IS_MERITZ && (
            <MenuItem value={MeritzFcmType.UPLOAD_LOGS}>
              [0] 메리츠 로그
            </MenuItem>
          )}

          {/* 일반 */}
          {!IS_MERITZ && (
            <MenuItem value={FcmType.UPLOAD_LOGS}>[1] 로그</MenuItem>
          )}
          {!IS_MERITZ && (
            <MenuItem value={FcmType.UPLOAD_FILE_LIST}>
              [2] 파일 리스트
            </MenuItem>
          )}
          {!IS_MERITZ && (
            <MenuItem value={FcmType.UPLOAD_RECORDS}>
              [5] 녹취 파일 업로드
            </MenuItem>
          )}
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
          disabled={IS_MERITZ}
        />
      </FormGroup>
      <Button type="submit" onClick={onRequestButtonClick} variant="contained">
        FCM 요청
      </Button>
    </Paper>
  )
}

export default RequestForm
