import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import archiver from 'archiver'
import { printLog } from '@/utils/log'

const TAG = '/api/compress'

const directoryPath = 'D:\\directoryPath'
const outputDirectory = 'D:\\outputDirectory'
const filesPerZip = 350

/**
 * 디렉토리에서 AMR 파일 읽기.
 */
function getAmrFiles(dir: string) {
  printLog(TAG, `getAmrFiles. dir: ${dir}`)
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file).toLowerCase() === '.amr')
    .map((file) => path.join(dir, file))
}

/**
 * 파일 그룹화.
 */
function chunkArray(array: Array<any>, size: number) {
  printLog(TAG, `chunkArray. length: ${array.length}, filesPerZip: ${size}`)
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * ZIP 파일 생성.
 */
function createZip(files: Array<any>, index: number) {
  printLog(
    TAG,
    `createZip. files: ${files.length}, output: ${outputDirectory}\\output_${index}.zip`,
  )
  const output = fs.createWriteStream(`${outputDirectory}\\output_${index}.zip`)
  const archive = archiver('zip', { zlib: { level: 9 } })

  archive.pipe(output)
  files.forEach((file: any) => {
    archive.append(fs.createReadStream(file), { name: path.basename(file) })
  })
  archive.finalize()
}

/**
 * POST /api/compress 요청.
 */
export async function POST(request: NextRequest) {
  const amrFiles = getAmrFiles(directoryPath)
  const fileChunks = chunkArray(amrFiles, filesPerZip)

  fileChunks.forEach((chunk: any, index: number) => {
    createZip(chunk, index)
  })

  return NextResponse.json({ ok: true })
}
