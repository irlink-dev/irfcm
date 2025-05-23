'use client'
import React, { useState } from 'react'
import Input from '@/interfaces/input'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { FcmMethod } from '@/enums/fcm-method'
import { Client, ClientType } from '@/enums/client'
import { FcmType } from '@/enums/fcm-type'
import { MeritzFcmType } from '@/enums/meritz-fcm-type'
import { useAtom, useAtomValue } from 'jotai'
import { fcmRequestLoadingStatusAtom, morecxVariantsAtom } from '@/states/global-state'
import OAuthButton from '@/components/oauth-button'
import FirebasePreference from '@/interfaces/firebase-preference'
import { printLog } from '@/utils/log'

const TAG = 'RequestForm'

interface RequestFormProps {
  params: { client: ClientType }
  input: Input
  onSubmit: (
    method: number | undefined,
    client: ClientType,
    variant: number,
  ) => Promise<void> // Ensure onSubmit returns a Promise
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => void
  showInputValues: (isBatch: boolean) => void
  firebasePref: FirebasePreference
  isBatch?: boolean
}

const RequestForm = ({
                       params,
                       input,
                       onSubmit,
                       handleChange,
                       showInputValues,
                       firebasePref,
                       isBatch = false,
                     }: RequestFormProps) => {
  const IS_MERITZ = params.client === Client.MERITZ

  const morecxVariant = useAtomValue(morecxVariantsAtom)
  const [isFcmRequestLoading, setIsFcmRequestLoading] = useAtom(
    fcmRequestLoadingStatusAtom,
  )

  const [fileContent, setFileContent] = useState<string[]>([])

  /**
   * 파일 업로드 핸들러
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // txt 파일 확장자 체크
      if (!file.name.toLowerCase().endsWith('.txt')) {
        printLog(TAG, '.txt 파일만 업로드 가능합니다.')
        return
      }

      const reader = new FileReader()

      reader.onload = async (e) => {
        const content = e.target?.result as string
        const lines = content.split('\n')

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          input.amrFileName = line
          printLog(TAG, `${i}: ${line}`)
          await onSubmit(FcmMethod.HTTP_V1, params.client, -1)

          // 10줄마다 2초 딜레이
          if ((i + 1) % 10 === 0 && i < lines.length - 1) {
            printLog(TAG, `Processing delay for 2000ms after ${i + 1} lines`)
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }
      }

      reader.onerror = () => {
        printLog(TAG, 'error reading file')
      }

      reader.readAsText(file)
    }
  }

  /**
   * 요청 버튼 클릭 시
   */
  const onRequestButtonClick = () => {
    input.phoneNumber = input.phoneNumber.replace(/\D/g, '')

    setIsFcmRequestLoading(true)
    onSubmit(FcmMethod.HTTP_V1, params.client, -1)
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
        <Typography sx={{ wordBreak: 'keep-all' }}>요청 양식</Typography>
        <Box>
          <Button
            onClick={() => showInputValues(isBatch)}
            sx={{ color: '#888888', fontWeight: 400 }}
          >
            입력값 조회
          </Button>
          <OAuthButton params={params} firebasePref={firebasePref} />
        </Box>
      </Box>
      {!isBatch && (
        <TextField
          label='법인폰 번호'
          name='phoneNumber'
          value={input.phoneNumber}
          onChange={handleChange}
          required
        />
      )}
      <TextField
        label='날짜'
        name='date'
        value={input.date}
        onChange={handleChange}
        required
      />
      {!isBatch && IS_MERITZ && (input.type === MeritzFcmType.RESEND_RECORD || input.type === MeritzFcmType.CONVERT_AND_RESEND_RECORD) && (
        <TextField
          label='amr 파일명'
          name='amrFileName'
          value={input.amrFileName}
          onChange={handleChange}
          required
        />
      )}
      {!isBatch && IS_MERITZ && input.type === MeritzFcmType.CONVERT_AND_RESEND_RECORD && (
        <TextField
          label='m4a 파일명'
          name='m4aFileName'
          value={input.m4aFileName}
          onChange={handleChange}
          required
        />
      )}
      {!isBatch && IS_MERITZ && input.type === MeritzFcmType.CONVERT_AND_RESEND_RECORD && (
        <TextField
          label='call ID'
          name='callId'
          value={input.callId}
          onChange={handleChange}
          required
        />
      )}
      <FormControl>
        <InputLabel id='type'>요청 타입</InputLabel>
        <Select
          labelId='type'
          name='type'
          value={input.type}
          label='요청 타입'
          onChange={handleChange}
        >
          {/* 메리츠 */}
          {IS_MERITZ && (
            <MenuItem value={MeritzFcmType.UPLOAD_LOGS}>
              [0] 메리츠 로그
            </MenuItem>
          )}
          {IS_MERITZ && (
            <MenuItem value={MeritzFcmType.RESEND_RECORD}>
              [1] 녹취 파일 재전송
            </MenuItem>
          )}
          {IS_MERITZ && !isBatch && (
            <MenuItem value={MeritzFcmType.CONVERT_AND_RESEND_RECORD}>
              [2] 원본 녹취 변환 및 재전송
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
          {!IS_MERITZ && (
            <MenuItem value={FcmType.CALL_RE_UPLOAD_ALL_FILES}>
              [6] 모든 녹취 파일 재전송
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <Box>
        {isBatch && IS_MERITZ && input.type === MeritzFcmType.RESEND_RECORD && (
          <Button
            component='label'
            variant='contained'
          >
            Upload file
            <input type='file' style={{ display: 'none' }} accept='.txt' onChange={handleFileChange} />
          </Button>
        )}
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              name='isIncludeRecord'
              value={input.isIncludeRecord}
              checked={input.isIncludeRecord}
              onChange={handleChange}
            />
          }
          label='녹취 파일 포함'
          disabled={IS_MERITZ}
        />
      </FormGroup>
      <Button
        type='submit'
        onClick={onRequestButtonClick}
        variant='contained'
        disabled={isFcmRequestLoading}
        sx={{
          borderRadius: '100px',
        }}
      >
        {isFcmRequestLoading ? <span>요청 중...</span> : <span>FCM 요청</span>}
        {isFcmRequestLoading && (
          <CircularProgress
            size={16}
            thickness={7}
            sx={{
              ml: 1,
              color: 'white',
            }}
          />
        )}
      </Button>
    </Paper>
  )
}

export default RequestForm
