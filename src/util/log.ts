import Error from 'next/error'

export default class LogUtil {
  /**
   * 로그.
   */
  static log(tag: string, message: string) {
    console.log(`[${tag}] ${message}`)
  }

  /**
   * 에러 로그.
   */
  static error(tag: string, error: Error) {
    console.log(`[${tag}] ${error}`)
  }
}
