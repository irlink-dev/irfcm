import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { getUserToken, getNewOAuthCode } from '@/utils/firebase'
import Request from '@/interfaces/Request'
import { requestFcm, requestMeritzFcm, sendMessage } from '@/utils/fcm'
import { showErrorSnackbar, showSuccessSnackbar } from '@/utils/snackbar'
import { useSnackbar } from 'notistack'
import FirebasePreference from '@/interfaces/FirebasePreference'
import Input from '@/interfaces/Input'
import useLocalStorage from './useLocalStorage'
import { printErrorLog, printLog } from '@/utils/log'
import { FcmMethod } from '@/enums/FcmMethod'
import { Client, ClientType } from '@/enums/Client'
import Message from '@/interfaces/Message'
import { FcmType } from '@/enums/FcmType'
import { MeritzFcmType } from '@/enums/MeritzFcmType'

const useFcmRequest = (firebasePref: FirebasePreference) => {
  const TAG = 'useFcmRequest'

  const projectId = firebasePref.config?.projectId

  const client =
    projectId === 'gs-shop-irusb'
      ? Client.GS_SHOP_USB
      : projectId === 'l-point'
      ? Client.L_POINT
      : null

  const LOCAL_STORAGE_VALUES_KEY = `irfcm:input:${firebasePref.config?.projectId}`
  const LOCAL_STORAGE_ACCESS_TOKEN_KEY = `irfcm:access_token:${client}`
  const LOCAL_STORAGE_REFRESH_TOKEN_KEY = `irfcm:refresh_token:${client}`

  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()
  const { enqueueSnackbar } = useSnackbar()

  const accessToken = getLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  const refreshToken = getLocalStorageData(LOCAL_STORAGE_REFRESH_TOKEN_KEY)

  const [trigger, setTrigger] = useState<boolean>(false) // 스토리지 파일 트리거.
  const [input, setInput] = useState<Input>(() => {
    const savedValues = getLocalStorageData(LOCAL_STORAGE_VALUES_KEY)
    return savedValues
      ? savedValues
      : {
          phoneNumber: '',
          date: '',
          type: FcmType.UPLOAD_LOGS,
          isIncludeRecord: false,
        }
  })

  useEffect(() => {
    setLocalStorageData(LOCAL_STORAGE_VALUES_KEY, input)
  }, [input])

  /**
   * 요청 양식 변동 시.
   */
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
  ) => {
    const { value, name } = event.target

    'checked' in event.target && name === 'isIncludeRecord'
      ? setInput({ ...input, [name]: event.target.checked })
      : setInput({ ...input, [name]: value })
  }

  /**
   * [NEW] 신규 인증 진행.
   */
  const doAuth = (client: ClientType) => {
    getNewOAuthCode(
      firebasePref.oAuthClientId,
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/${client}/oauth`
        : `https://irfcm.vercel.app/${client}/oauth`,
    )
  }

  /**
   * [NEW] 액세스 토큰 갱신.
   */
  const refreshAccessToken = async (
    client: ClientType,
    refreshToken: string,
  ) => {
    printLog(TAG, `refreshAccessToken. client: ${client}`)

    const accessToken = await fetch(
      `/api/oauth?client=${client}&refresh_token=${refreshToken}`,
      { method: 'POST' },
    )
      .then((response) => response.json())
      .then((data) => data.access_token)
      .catch((error) => printErrorLog(TAG, error))

    return accessToken
  }

  /**
   * [NEW] 응답 성공 시.
   */
  const onSuccess = () => {
    showSuccessSnackbar(enqueueSnackbar, 'FCM 전송 성공')
    setTrigger(() => true)
  }

  /**
   * [NEW] 응답 실패 시.
   */
  const onFailure = () => {
    showErrorSnackbar(enqueueSnackbar, 'FCM 전송 실패')
  }

  /**
   * [NEW] "권한 없음(401)" 응답 시.
   */
  const onUnauthorized = async (client: ClientType) => {
    printLog(
      TAG,
      `onUnauthorized. client: ${client}, \n\n` +
        `♻️ (refreshToken): ${refreshToken}\n\n`,
    )
    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(client, refreshToken)
      setLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken)
      window?.location.reload()
    } else {
      showErrorSnackbar(enqueueSnackbar, 'OAuth 2.0 인증 필요')
      // doAuth(client)
    }
  }

  /**
   * [NEW] 응답 후 처리.
   */
  const onResponse = async (
    method: FcmMethod,
    response: IFcmResponse,
    client: ClientType,
  ) => {
    printLog(
      TAG,
      `onResponse. status: ${response?.status || response?.success}`,
    )
    if (method === FcmMethod.LEGACY) {
      if (response.success === 1) onSuccess()
      if (response.failure === 1) onFailure()
    }
    if (method === FcmMethod.HTTP_V1) {
      if (response.status === 200) onSuccess()
      if (response.status === 401) onUnauthorized(client)
    }
  }

  /**
   * [NEW] 메리츠 LEGACY 방식 요청.
   */
  const doMeritzProcess = async (client: ClientType) => {
    const userToken = await getUserToken(client, input.phoneNumber)

    const request: Request = {
      authorizationKey: firebasePref.authorizationKey,
      token: userToken,
      type: String(input.type),
      priority: 'high',
    }
    printLog(
      TAG,
      `doMeritzProcess.\n\n` +
        `📱 (userToken): ${userToken}\n\n` +
        `📄 type: ${MeritzFcmType[input.type]}(${input.type})\n\n`,
    )
    const response = await requestMeritzFcm(request)
    onResponse(FcmMethod.LEGACY, response, client)
  }

  /**
   * [NEW] LEGACY 방식 요청.
   */
  const doLegacyProcess = async (client: ClientType) => {
    const userToken = await getUserToken(client, input.phoneNumber)

    const request: Request = {
      authorizationKey: firebasePref.authorizationKey,
      token: userToken,
      date: input.date,
      type: Number(input.type),
      isIncludeRecord: input.isIncludeRecord,
      priority: 'high',
    }
    printLog(
      TAG,
      `doLegacyProcess.\n\n` +
        `📱 (userToken): ${userToken}\n\n` +
        `📄 date: ${input.date}, ` +
        `type: ${FcmType[input.type]}(${input.type}), ` +
        `isIncludeRecord: ${input.isIncludeRecord}\n\n`,
    )
    const response = await requestFcm(request)
    onResponse(FcmMethod.LEGACY, response, client)
  }

  /**
   * [NEW] HTTP v1 방식 요청.
   */
  const doHttpV1Process = async (client: ClientType) => {
    const userToken = await getUserToken(client, input.phoneNumber)

    const message: Message = {
      accessToken: accessToken,
      token: userToken,
      date: input.date,
      type: String(input.type),
      isIncludeRecord: input.isIncludeRecord,
      priority: 'high',
    }
    printLog(
      TAG,
      `doHttpV1Process.\n\n` +
        `🔐 (accessToken): ${accessToken}\n\n` +
        `📱 (userToken): ${userToken}\n\n` +
        `📄 date: ${input.date}, ` +
        `type: ${FcmType[input.type]}(${input.type}), ` +
        `isIncludeRecord: ${input.isIncludeRecord}\n\n`,
    )
    const response = await sendMessage(client, message)
    onResponse(FcmMethod.HTTP_V1, response, client)
  }

  /**
   * [NEW] 요청 양식 제출 시.
   */
  const onSubmit = (method: number = FcmMethod.LEGACY, client: ClientType) => {
    printLog(TAG, `onSubmit. method: ${FcmMethod[method]}, client: ${client}`)

    if (method === FcmMethod.LEGACY) {
      if (client === Client.MERITZ) {
        doMeritzProcess(client)
      } else {
        doLegacyProcess(client)
      }
    }
    if (method === FcmMethod.HTTP_V1) {
      doHttpV1Process(client)
    }
  }

  return {
    input,
    trigger,
    setTrigger,
    handleChange,
    onSubmit,
    doAuth,
  }
}

export default useFcmRequest

interface IFcmResponse {
  success?: number
  failure?: number
  status?: number
}
