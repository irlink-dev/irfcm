import { NextRequest, NextResponse } from 'next/server'
import { upload } from '@/utils/upload'
import Logger from '@/utils/log'
import { readFiles } from '@/utils/file'

const TAG = '/api/upload'

/**
 * 파일 일괄 업로드.
 */
async function doBatchDownload(files: Array<any>) {
  const uploadHost = 'https://175.126.124.136/upload'
  const uploadPath = '/chubb_reupload'

  for (const file of files) {
    upload(file, uploadHost, uploadPath, (response) => {
      Logger.log(TAG, response)
    })
  }
}

/**
 * POST /api/upload 요청.
 */
export async function POST(request: NextRequest) {
  const directoryPath = ''
  const files = readFiles(directoryPath, 'amr')
  doBatchDownload(files)

  return NextResponse.json({ ok: true })
}
