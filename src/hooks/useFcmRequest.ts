import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { getFirebaseToken } from '@/utils/firebase'
import Request from '@/types/Request'
import { requestFcm } from '@/utils/fcm'
import { showErrorSnackbar, showSuccessSnackbar } from '@/utils/snackbar'
import { useSnackbar } from 'notistack'
import RequestType from '@/types/RequestType'
import FirebasePreference from '@/types/FirebasePreference'
import Input from '@/types/Input'
import useLocalStorage from './useLocalStorage'
import LogUtil from '@/utils/log'

const useFcmRequest = (firebasePref: FirebasePreference) => {
  const TAG = 'useFcmRequest'
  const LOCAL_STORAGE_VALUES_KEY = `irfcm:input:${firebasePref.config?.projectId}`
  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()
  const { enqueueSnackbar } = useSnackbar()

  const [trigger, setTrigger] = useState<boolean>(false) // get storage files trigger.
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

  useEffect(() => {
    setLocalStorageData(LOCAL_STORAGE_VALUES_KEY, input)
  }, [input])

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
  }

  /**
   * 요청 양식 제출 시.
   */
  const handleSubmit = async () => {
    const token = await getFirebaseToken(input.phoneNumber)
    LogUtil.log(TAG, `handleSubmit. token: ${token}`)

    const request: Request = {
      authorizationKey: firebasePref.authorizationKey,
      token: token,
      date: input.date,
      type: input.type.toString(),
      isIncludeRecord: input.isIncludeRecord,
      priority: 'high',
    }
    const response = await requestFcm(request)

    if (response.success === 1) {
      showSuccessSnackbar(enqueueSnackbar, 'FCM 전송 성공')
      setTrigger(() => true)
    }
    if (response.failure === 1) {
      showErrorSnackbar(enqueueSnackbar, 'FCM 전송 실패')
    }
  }

  return {
    input,
    trigger,
    setTrigger,
    handleChange,
    handleSubmit,
  }
}

export default useFcmRequest