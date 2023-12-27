import Error from 'next/error'

/**
 * 로그 출력.
 */
export const printLog = (tag: string, message: unknown) => {
  console.log(`[${tag}] ${message}`)
}

/**
 * 경고 로그 출력.
 */
export const printWarningLog = (tag: string, message: unknown) => {
  console.warn(`[${tag}] ${message}`)
}

/**
 * 에러 로그 출력.
 */
export const printErrorLog = (tag: string, error: Error) => {
  console.error(`[${tag}] ${error}`)
}
