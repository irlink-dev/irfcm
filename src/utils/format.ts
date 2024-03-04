import { Client } from '@/enums/client'
import { MorecxVariants } from '@/enums/morecx-variants'
import { printLog } from '@/utils/log'

const TAG = 'utils/format'

/**
 * 전화번호 하이픈 형식.
 */
export const toHyphenNumber = (phoneNumber: string) => {
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
export const parseDownloadUrl = (
  url: string,
  client: string = '',
  variant: number = -1,
) => {
  const REGEX =
    /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/log%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/

  const REGEX_MORECX =
    variant === MorecxVariants.CLOUD
      ? /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/cloud%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
      : variant === MorecxVariants.BOHUM_DOTCOM
      ? /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/bohumdotcom%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
      : variant === MorecxVariants.WELCOME_BANK
      ? /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/welcomebank%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
      : variant === MorecxVariants.WELCOME_LOAN
      ? /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/welcomeloan%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
      : variant === MorecxVariants.WELCOME_LOAN_FOREIGN
      ? /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/welcomeloan_foreign%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
      : variant === MorecxVariants.WELCOME_CAPITAL
      ? /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/welcome_capital%2Flog%2F(?<phoneNumber>[^/]+)%2F(?<date>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/
      : ''

  const REGEX_MERITZ =
    /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/applogs%2F(?<phoneNumber>[^/]+)%2F(?<fileName>[^?]+)\?(?<params>[^#]+)/

  const regex =
    client === Client.MORECX
      ? REGEX_MORECX
      : client === Client.MERITZ
      ? REGEX_MERITZ
      : REGEX

  const match = url.match(regex)
  if (!match) {
    printLog(TAG, `parseDownloadUrl. match: ${match}. return null.`)
    return null
  }
  const { phoneNumber, date, fileName, params } = match.groups!

  const paramsMap = new URLSearchParams(params)
  const token = paramsMap.get('token')!
  const alt = paramsMap.get('alt')!

  return { phoneNumber, date, fileName, alt, token }
}
