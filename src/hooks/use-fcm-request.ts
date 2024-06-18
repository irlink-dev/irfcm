import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { getNewOAuthCode, getUserToken } from '@/utils/firebase'
import Request from '@/interfaces/request'
import { requestFcm, requestMeritzFcm, sendMessage } from '@/utils/fcm'
import FirebasePreference from '@/interfaces/firebase-preference'
import Input from '@/interfaces/input'
import useLocalStorage from './use-local-storage'
import { printErrorLog, printLog } from '@/utils/log'
import { FcmMethod } from '@/enums/fcm-method'
import { Client, ClientType } from '@/enums/client'
import Message from '@/interfaces/message'
import { FcmType } from '@/enums/fcm-type'
import { MeritzFcmType } from '@/enums/meritz-fcm-type'
import { MorecxVariants } from '@/enums/morecx-variants'
import useToast from './use-toast'
import { useSetAtom } from 'jotai'
import { fcmRequestLoadingStatusAtom } from '@/states/global-state'

const useFcmRequest = (firebasePref: FirebasePreference) => {
  const TAG = 'useFcmRequest'

  const projectId = firebasePref.config?.projectId

  // prettier-ignore
  const client =
    projectId === 'irlink-chubb'
      ? Client.CHUBB
      : projectId === 'db-life'
      ? Client.DB_LIFE
      : projectId === 'gs-shop-irusb'
      ? Client.GS_SHOP_USB
      : projectId === 'hana-6d9ee'
      ? Client.HANA
      : projectId === 'hyundai-8df86'
      ? Client.HYUNDAI
      : projectId === 'hyundai-shop-irusb'
      ? Client.HYUNDAI_SHOP
      : projectId === 'irlink-kb'
      ? Client.KB_WIRELESS
      : projectId === 'irlink-kt-commerce'
      ? Client.KT_COMMERCE
      : projectId === 'irlink-lina'
      ? Client.LINA
      : projectId === 'l-point'
      ? Client.L_POINT
      : projectId === 'irlink-meritz'
      ? Client.MERITZ
      : projectId === 'irlink-morecx'
      ? Client.MORECX
      : projectId === 'ns-shop-irusb'
      ? Client.NS_SHOP
      : projectId === 'shinhan-card'
      ? Client.SHINHAN_CARD
      : projectId === 'sk-mnservice-a07c5'
      ? Client.SK_MNSERVICE
      : projectId === 'irlink-zilink'
      ? Client.ZILINK
      : null

  const LOCAL_STORAGE_VALUES_KEY = `irfcm:input:${firebasePref.config?.projectId}`
  const LOCAL_STORAGE_ACCESS_TOKEN_KEY = `irfcm:access_token:${client}`
  const LOCAL_STORAGE_REFRESH_TOKEN_KEY = `irfcm:refresh_token:${client}`

  const { getLocalStorageData, setLocalStorageData } = useLocalStorage()
  const { showSuccessToast, showErrorToast } = useToast()

  const accessToken = getLocalStorageData(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  const refreshToken = getLocalStorageData(LOCAL_STORAGE_REFRESH_TOKEN_KEY)

  const setIsFcmRequestLoading = useSetAtom(fcmRequestLoadingStatusAtom)

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
    showSuccessToast('FCM 전송 성공')
    setTrigger(() => true)
  }

  /**
   * [NEW] 응답 실패 시.
   */
  const onFailure = () => {
    showErrorToast('FCM 전송 실패')
  }

  /**
   * [NEW] "잘못된 요청(400)" 응답 시.
   */
  const onBadRequest = () => {
    showErrorToast('잘못된 요청입니다. 요청 양식을 수정해주세요.')
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
      showErrorToast('OAuth 2.0 인증을 진행해주세요.')
      // doAuth(client)
    }
  }

  /**
   * [NEW] "접근 거부(403)"
   */
  const onAccessDenied = async () => {
    showErrorToast('권한이 없는 계정입니다. 다른 계정으로 로그인하세요.')
  }

  /**
   * [NEW] "찾을 수 없음(404)" 응답 시.
   *
   * https://firebase.google.com/docs/cloud-messaging/manage-tokens?hl=ko#detect-invalid-token-responses-from-the-fcm-backend
   */
  const onNotFound = async () => {
    showErrorToast('클라이언트 토큰이 만료되었습니다.')
  }

  /**
   * [NEW] 응답 후 처리.
   */
  const onResponse = async (
    method: FcmMethod,
    response: IFcmResponse,
    client: ClientType,
  ) => {
    setIsFcmRequestLoading(false)
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
      if (response.status === 400) onBadRequest()
      if (response.status === 401) onUnauthorized(client)
      if (response.status === 403) onAccessDenied()
      if (response.status === 404) onNotFound()
    }
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
      amrFileName: input.amrFileName,
      m4aFileName: input.m4aFileName,
      callId: input.callId,
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
  const onSubmit = (
    method: number = FcmMethod.LEGACY,
    client: ClientType,
    variant: number,
  ) => {
    printLog(
      TAG,
      `onSubmit. method: ${FcmMethod[method]}, client: ${client}, morecxVariant: ${MorecxVariants[variant]}`,
    )
    doHttpV1Process(client)
  }

  /**
   * 사용자 입력 값 조회.
   */
  const showInputValues = (isBatch: boolean) => {
    const text = isBatch
      ? '⚠️ (경고) 프로젝트 내 모든 법인폰에 FCM 요청을 수행합니다. \n\n'
      : `📱 (phoneNumber): ${input.phoneNumber}\n\n`

    printLog(
      TAG,
      `showInputValues. \n\n` +
        text +
        `📄 date: ${input.date}, ` +
        `type: ${FcmType[input.type]}(${input.type}), ` +
        `isIncludeRecord: ${input.isIncludeRecord}\n\n`,
    )
  }

  return {
    input,
    trigger,
    setTrigger,
    handleChange,
    onSubmit,
    doAuth,
    showInputValues,
  }
}

export default useFcmRequest

interface IFcmResponse {
  success?: number
  failure?: number
  status?: number
}
