import firebase from 'firebase/compat/app'
import { get, getDatabase, ref } from 'firebase/database'
import SendFcmUseCase from '@/domain/SendFcmUseCase'
import FirebaseConfig from '@/types/FirebaseConfig'
import useFormat from '@/hooks/useFormat'
import LogUtil from './log'

const TAG = 'utils/firebase'
const sendFcmUseCase = new SendFcmUseCase()

const { toHyphenNumber } = useFormat()

/**
 * 파이어베이스 초기화.
 */
const initFirebaseApp = async (firebaseConfig: FirebaseConfig) => {
  console.log(`initFirebaseApp. projectId: ${firebaseConfig.projectId}`)

  if (firebase.apps.length === 0) {
    await firebase.initializeApp(firebaseConfig) // 앱이 존재하지 않으면, 앱을 초기화.
  } else {
    await firebase
      .app()
      .delete()
      .then(() => firebase.initializeApp(firebaseConfig)) // 앱이 존재하면, 삭제하고 다시 초기화.
  }
  return firebase
}

/**
 * 법인폰 번호로 토큰 조회.
 */
const getFirebaseToken = async (phoneNumber: string, option: string = '') => {
  LogUtil.log(TAG, `getFirebaseToken. phoneNumber: ${phoneNumber}`)
  const database = getDatabase()

  let snapshot
  if (option === 'morecx') {
    // morecx cloud.
    snapshot = await get(
      ref(database, `cloud/users/${toHyphenNumber(phoneNumber)}/token`),
    )
  } else {
    // lina, chubb, hana, shinhan, dblife, kb.
    snapshot = await get(
      ref(database, `users/${phoneNumber.replace(/-/g, '')}`),
    )
  }
  return snapshot?.val()
}

/**
 * 파일 다운로드 링크 받기.
 */
const getFileDownloadLinks = async (
  filenames: Array<string>,
  bucket: firebase.storage.Reference,
) => {
  LogUtil.log(TAG, `getFileDownloadLinks. length: ${filenames.length}`)
  const urls: Array<string> = []

  for (const filename of filenames) {
    const fileRef = bucket.child(filename)
    const url = await fileRef.getDownloadURL()
    urls.push(url)
  }
  return urls
}

/**
 * 로그 다운로드 링크 받기.
 */
const getLogDownloadLinks = async (
  phoneNumber: string,
  date: string,
  bucket: firebase.storage.Reference,
) => {
  const phoneNumberWithHyphen = toHyphenNumber(phoneNumber)
  const dateWithoutHyphen = date.replace(/-/g, '')

  const filenames = [
    `log/${phoneNumberWithHyphen}/${date}/log_${dateWithoutHyphen}.txt`, // 앱 로그.
    `log/${phoneNumberWithHyphen}/${date}/IRRecorderLog_${dateWithoutHyphen}.txt`, // 레코더 로그.
  ]
  try {
    const urls = await getFileDownloadLinks(filenames, bucket)
    console.log(`getLogDownloadLinks. length: ${urls.length}`)
    return urls
  } catch (error) {
    console.log(`getLogDownloadLinks. return empty array.`)
    console.log(TAG, error)
    return []
  }
}

/**
 * 법인폰 토큰 전체 조회.
 */
const getAllTokens = async () => {
  const database = getDatabase()
  const snapshot = await get(ref(database, 'users'))
  return snapshot.val()
}

/**
 *  법인폰 전체에 FCM 요청.
 */
const sendFcmToAllTokens = async (key: string, date: string) => {
  const tokens = await getAllTokens()

  for (const token in tokens) {
    const request = {
      token: tokens[token],
      requestType: '1',
      date: date,
      isIncludeRecord: true,
      priority: 'high',
      authorizationKey: key,
    }
    sendFcmUseCase.request(request, () => {
      /* empty */
    })
  }
}

/**
 * 로그 폴더 내 모든 파일 가져오기.
 */
const getLogsInFolder = async (phoneNumber: string, date: string) => {
  const phoneNumberWithHyphen = toHyphenNumber(phoneNumber)
  const directoryPath = `log/${phoneNumberWithHyphen}/${date}`
  const directoryRef = firebase.storage().ref(directoryPath)

  const { items } = await directoryRef.listAll()
  const urls = await Promise.all(items.map((item) => item.getDownloadURL()))
  console.log(
    `getLogsInFolder. phoneNumber: ${phoneNumber}, urls: ${urls.length}`,
  )
  return urls
}

/**
 * 법인폰 번호 리스트 가져오기.
 */
const getPhoneNumberList = async (bucket: firebase.storage.Reference) => {
  const folderRef = bucket.child('log')
  const { prefixes } = await folderRef.listAll()
  return prefixes.map(({ name }) => name)
}

/**
 * 스토리지 파일 링크 가져오기.
 */
const getStorageFileUrls = async (
  phoneNumber: string,
  date: string,
  storageRef: firebase.storage.Reference,
  client: string,
) => {
  const phoneNumberWithHyphen = toHyphenNumber(phoneNumber)
  // const phoneNumberWithoutHyphen = phoneNumber.replace(/-/g, '')

  const directoryPath = `log/${phoneNumberWithHyphen}/${date}`
  const morecxDirectoryPath = `cloud/log/${phoneNumberWithHyphen}/${date}`

  let listRef
  if (client === 'morecx') {
    listRef = storageRef.child(morecxDirectoryPath)
  } else {
    listRef = storageRef.child(directoryPath)
  }
  const response = await listRef.listAll()

  LogUtil.log(TAG, `getStorageFileUrls. listRef: ${listRef}`)

  return await Promise.all(
    response.items.map(async (item) => await item.getDownloadURL()),
  )
}

export {
  initFirebaseApp,
  getFirebaseToken,
  getFileDownloadLinks,
  getLogDownloadLinks,
  getAllTokens,
  sendFcmToAllTokens,
  getLogsInFolder,
  getPhoneNumberList,
  getStorageFileUrls,
}
