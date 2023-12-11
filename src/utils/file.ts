import fs from 'fs'
import path from 'path'
import { printLog } from '@/utils/log'

const TAG = 'utils/file'

/**
 * 파일 읽기.
 */
export const readFiles = (directoryPath: string, extension: string = '') => {
  let files = fs
    .readdirSync(directoryPath)
    .map((file) => path.join(directoryPath, file))

  if (extension !== '') {
    const extensionPattern = new RegExp(`.${extension}$`, 'i')
    files = files.filter((file) => extensionPattern.test(file))
  }
  printLog(TAG, `readFiles. length: ${files.length}`)
  return files
}
