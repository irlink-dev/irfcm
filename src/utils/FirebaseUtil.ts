import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { get, getDatabase, ref } from 'firebase/database'
import useFormat from '@/hooks/useFormat'

const { toHyphenNumber } = useFormat()

export default class FirebaseUtil {
  TAG: string = 'FirebaseUtil'

  /**
   * 파일 다운로드 링크 받기.
   */
  async getFileDownloadLinks(
    filenames: Array<string>,
    bucket: firebase.storage.Reference,
  ) {
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
  async getLogDownloadLinks(
    phoneNumber: string,
    date: string,
    bucket: firebase.storage.Reference,
  ) {
    const phoneNumberWithHyphen = toHyphenNumber(phoneNumber)
    const dateWithoutHyphen = date.replace(/-/g, '')

    const filenames = [
      `log/${phoneNumberWithHyphen}/${date}/log_${dateWithoutHyphen}.txt`, // 앱 로그.
      `log/${phoneNumberWithHyphen}/${date}/IRRecorderLog_${dateWithoutHyphen}.txt`, // 레코더 로그.
    ]
    try {
      const urls = await this.getFileDownloadLinks(filenames, bucket)
      console.log(this.TAG, `getLogDownloadLinks. length: ${urls.length}`)
      return urls
    } catch (error) {
      console.log(this.TAG, `getLogDownloadLinks. return empty array.`)
      console.log(this.TAG, error)
      return []
    }
  }

  /**
   * 법인폰 토큰 전체 조회.
   */
  async getAllTokens() {
    // FirebaseError: Firebase: Need to provide options, when not being deployed to hosting via source. (app/no-options).
    // TODO Firebase App 삭제 런타임 오류 발생 예상 지점.
    const database = getDatabase()

    const snapshot = await get(ref(database, 'users'))
    return snapshot.val()
  }

  /**
   *  법인폰 전체에 FCM 요청.
   */
  async sendFcmToAllTokens(key: string, date: string) {
    const tokens = await this.getAllTokens()

    for (const token in tokens) {
      const request = {
        token: tokens[token],
        requestType: '1',
        date: date,
        isIncludeRecord: true,
        priority: 'high',
        authorizationKey: key,
      }
      // this.sendFcmUseCase.request(request, () => {
      //   /* empty */
      // })
    }
  }

  /**
   * 로그 폴더 내 모든 파일 가져오기.
   */
  async getLogsInFolder(phoneNumber: string, date: string) {
    const phoneNumberWithHyphen = toHyphenNumber(phoneNumber)
    const directoryPath = `log/${phoneNumberWithHyphen}/${date}`
    const directoryRef = firebase.storage().ref(directoryPath)

    const { items } = await directoryRef.listAll()
    const urls = await Promise.all(items.map((item) => item.getDownloadURL()))
    console.log(
      this.TAG,
      `getLogsInFolder. phoneNumber: ${phoneNumber}, urls: ${urls.length}`,
    )
    return urls
  }

  /**
   * 법인폰 번호 리스트 가져오기.
   */
  async getPhoneNumberList(bucket: firebase.storage.Reference) {
    const folderRef = bucket.child('log')
    const { prefixes } = await folderRef.listAll()
    return prefixes.map(({ name }) => name)
  }
}
