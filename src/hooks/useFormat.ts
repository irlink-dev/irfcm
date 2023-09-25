import LogUtil from '@/utils/log'

const useFormat = () => {
  const TAG = 'useFormat'

  /**
   * 전화번호 하이픈 형식.
   */
  const toHyphenNumber = (phoneNumber: string) => {
    const match = phoneNumber.match(/^(\d{3})(\d{4})(\d{4})$/)

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`
    } else {
      return phoneNumber
    }
  }

  /**
   * 다운로드 URL 파싱.
   */
  const parseUrl = (url: string, client: string = '') => {
    const REGEX =
      /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/log%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/

    const REGEX_MORECX =
      /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/cloud%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/

    const regex = client === 'morecx' ? REGEX_MORECX : REGEX
    const match = url.match(regex)
    if (!match) {
      LogUtil.log(TAG, `parseUrl. match: ${match}. return null.`)
      return null
    }
    const { phoneNumber, date, fileName, params } = match.groups!

    const paramsMap = new URLSearchParams(params)
    const token = paramsMap.get('token')!
    const alt = paramsMap.get('alt')!

    return { phoneNumber, date, fileName, alt, token }
  }

  return {
    toHyphenNumber,
    parseUrl,
  }
}

export default useFormat
