import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { printLog } from '@/utils/log'

const TAG = '/api/rename'

const directoryPath = 'E:\\directoryPath'

/**
 * 파일명 변경.
 */
function renameFiles(dir: string) {
  printLog(TAG, `renameFiles. dir: ${dir}`)

  fs.readdirSync(dir).forEach((file) => {
    if (path.extname(file).toLowerCase() === '.amr') {
      const newFilename = file.split('^').pop()
      const oldPath = path.join(dir, file)
      const newPath = path.join(dir, newFilename!)

      fs.renameSync(oldPath, newPath)
      console.log(`Renamed: ${file} -> ${newFilename}`)
    }
  })
}

/**
 * POST /api/rename 요청.
 */
export async function POST(request: NextRequest) {
  renameFiles(directoryPath)

  return NextResponse.json({ ok: true })
}
