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

const useFcmRequest = (
  firebasePref: FirebasePreference,
  getStorageFiles: () => any,
) => {
  const LOCAL_STORAGE_VALUES_KEY = `irfcm:input:${firebasePref.config?.projectId}`

  const { getLocalStorageData } = useLocalStorage()

  const [request, setRequest] = useState<Input>(() => {
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
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => {
    const { value, name } = event.target

    if ('checked' in event.target && name === 'isIncludeRecord') {
      setRequest({
        ...request,
        [name]: event.target.checked,
      })
    } else {
      setRequest({
        ...request,
        [name]: value,
      })
    }
  }

  const handleSubmit = async () => {
    const token = await getFirebaseToken(request.phoneNumber)
    const _request: Request = {
      authorizationKey: firebasePref.authorizationKey,
      token: token,
      date: request.date,
      type: request.type.toString(),
      isIncludeRecord: request.isIncludeRecord,
      priority: 'high',
    }
    console.log(_request)
    const response = await requestFcm(_request)
    console.log(response)

    if (response.success === 1) {
      showSuccessSnackbar(enqueueSnackbar, 'FCM 전송 성공')
      setTimeout(() => {
        getStorageFiles().then(() => {
          /* empty */
        })
      }, 3000)
    }
    if (response.failure === 1) {
      showErrorSnackbar(enqueueSnackbar, 'FCM 전송 실패')
    }
  }

  return {
    request,
    handleChange,
    handleSubmit,
  }
}

export default useFcmRequest
