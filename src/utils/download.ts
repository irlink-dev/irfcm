import axios from 'axios'
import axiosRetry from 'axios-retry'
import fs from 'fs'
import useFormat from '@/hooks/useFormat'
import Logger from '@/utils/log'

const TAG = 'utils/download'
const DOWNLOAD_CONCURRENCY_LIMIT = 100

const { parseUrl } = useFormat()

/**
 * axios 재시도 설정.
 */
axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => {
    // ECONNRESET 발생 시 3회까지 재시도.
    return error.code === 'ECONNRESET'
  },
})

/**
 * URL 다운로드.
 */
export const download = (url: string) => {
  const parsingValues = parseUrl(url)
  if (!parsingValues) {
    Logger.log(TAG, 'URL 파싱 실패.')
    return
  }
  const decodedFileName = decodeURIComponent(parsingValues?.fileName)
  const localFilePath = `E:\\irfcm_download\\${decodedFileName}`

  axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  })
    .then((response) => {
      response.data.pipe(fs.createWriteStream(localFilePath))
      response.data.on('end', () => {
        Logger.log(TAG, `download. localFilePath: ${localFilePath}`)
      })
    })
    .catch((error: any) => {
      Logger.error(TAG, error)
    })
}

/**
 * URL 일괄 다운로드.
 */
export const batchDownload = async (urls: string[]) => {
  Logger.log(
    TAG,
    `batchDownload. length: ${urls.length}, concurrency: ${DOWNLOAD_CONCURRENCY_LIMIT}`,
  )
  for (let i = 0; i < urls.length; i += DOWNLOAD_CONCURRENCY_LIMIT) {
    const chunk = urls.slice(i, i + DOWNLOAD_CONCURRENCY_LIMIT)
    await Promise.all(chunk.map((url) => download(url)))
  }
}
