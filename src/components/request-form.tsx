'use client'

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
import {
  fcmRequestLoadingStatusAtom,
  morecxVariantsAtom,
} from '@/atoms/global-state-atoms'
import OAuthButton from '@/components/oauth-button'
import FirebasePreference from '@/interfaces/firebase-preference'

const TAG = 'RequestForm'

interface RequestFormProps {
  params: { client: ClientType }
  input: Input
  // handleSubmit: (option: string) => void
  onSubmit: (
    method: number | undefined,
    client: ClientType,
    variant: number,
  ) => void
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
  // handleSubmit,
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

  /**
   * 요청 버튼 클릭 시
   */
  const onRequestButtonClick = () => {
    setIsFcmRequestLoading(true)

    const IS_HTTP_V1 =
      params.client === Client.GS_SHOP_USB ||
      params.client === Client.HYUNDAI ||
      params.client === Client.KT_COMMERCE ||
      params.client === Client.L_POINT

    if (IS_HTTP_V1) {
      onSubmit(FcmMethod.HTTP_V1, params.client, -1)
    } else {
      onSubmit(FcmMethod.LEGACY, params.client, morecxVariant)
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
          label="법인폰 번호"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={handleChange}
          required
        />
      )}
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
      <Button
        type="submit"
        onClick={onRequestButtonClick}
        variant="contained"
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
