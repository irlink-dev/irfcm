import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { getFirebaseToken } from '@/hooks/firebase'
import Request from '@/types/Request'
import { requestFcm } from '@/hooks/fcm'
import { showErrorSnackbar, showSuccessSnackbar } from '@/hooks/snackbar'
import { useSnackbar } from 'notistack'
import RequestType from '@/types/RequestType'
import FirebasePreference from '@/types/FirebasePreference'
import Input from '@/types/Input'
import useLocalStorage from './useLocalStorage'

const useFcmRequest = (firebasePref: FirebasePreference) => {
  const LOCAL_STORAGE_VALUES_KEY = `irfcm:input:${firebasePref.config?.projectId}`

  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()

  const [input, setInput] = useState<Input>(() => {
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
  const [isSuccess, setIsSuccess] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  /**
   * 요청 양식 값 변동 시.
   */
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => {
    const { value, name } = event.target

    if ('checked' in event.target && name === 'isIncludeRecord') {
      setInput({
        ...input,
        [name]: event.target.checked,
      })
    } else {
      setInput({
        ...input,
        [name]: value,
      })
    }
    setLocalStorageData(LOCAL_STORAGE_VALUES_KEY, input)
  }

  /**
   * 요청 양식 제출 시.
   */
  const handleSubmit = async () => {
    const token = await getFirebaseToken(input.phoneNumber)
    const request: Request = {
      authorizationKey: firebasePref.authorizationKey,
      token: token,
      date: input.date,
      type: input.type.toString(),
      isIncludeRecord: input.isIncludeRecord,
      priority: 'high',
    }
    const response = await requestFcm(request)
    console.log('[요청과 응답]', request, response)

    setIsSuccess(false)
    if (response.success === 1) {
      showSuccessSnackbar(enqueueSnackbar, 'FCM 전송 성공')
      setIsSuccess(true)
      // setTimeout(() => {
      //   getStorageFiles().then(() => {
      //     /* empty */
      //   })
      // }, 3000)
    }
    if (response.failure === 1) {
      showErrorSnackbar(enqueueSnackbar, 'FCM 전송 실패')
    }
  }

  return {
    input,
    isSuccess,
    handleChange,
    handleSubmit,
  }
}

export default useFcmRequest
