import Error from 'next/error'

/**
 * 로그 출력.
 */
export const printLog = (tag: string, message: unknown) => {
  console.log(`[${tag}] ${message}`)
}

/**
 * 에러 로그 출력.
 */
export const printErrorLog = (tag: string, error: Error) => {
  console.log(`[${tag}] ${error}`)
}

