import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { printLog } from '@/utils/log'
import { Transform, pipeline as streamPipeline } from 'stream'
import util from 'util'

const TAG = '/api/search'

const directoryPath = 'E:\\irfcm_logs' // TXT 파일들이 위치한 디렉토리
const keyword = 'tryUploadCount' // 검색할 키워드
const outputPath = 'E:\\irfcm_output\\1_tryUploadCount.txt' // 결과를 저장할 파일의 경로

const pipeline = util.promisify(streamPipeline)

/**
 * 키워드로 검색.
 */
// function searchByKeyword(keyword: string) {
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       console.log('Error getting directory information.')
//       return
//     }

//     files.forEach((file) => {
//       if (path.extname(file) === '.txt') {
//         const readStream = fs.createReadStream(
//           path.join(directoryPath, file),
//           'utf8',
//         )
//         const writeStream = fs.createWriteStream(outputPath, { flags: 'a' })

//         const transformStream = new Transform({
//           transform(chunk, encoding, callback) {
//             const lines = chunk.toString().split('\n')
//             lines.forEach((line: any) => {
//               if (line.includes(keyword)) {
//                 this.push(`[${file}] ${line}\n`)
//               }
//             })
//             callback()
//           },
//         })

//         readStream
//           .pipe(transformStream)
//           .pipe(writeStream)
//           .on('finish', () => {
//             printLog(TAG, `Completed processing file: ${file}`)
//           })
//       }
//     })
//   })
// }

async function processFile(file: any) {
  const readStream = fs.createReadStream(path.join(directoryPath, file), 'utf8')
  const writeStream = fs.createWriteStream(outputPath, { flags: 'a' })

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split('\n')
      lines.forEach((line: string) => {
        if (line.includes(keyword)) {
          this.push(`[${file}] ${line}\n`)
        }
      })
      callback()
    },
  })

  await pipeline(readStream, transformStream, writeStream)
  printLog(TAG, `Completed processing file: ${file}`)
}

async function searchByKeyword(keyword: string) {
  try {
    const files = fs.readdirSync(directoryPath)
    for (const file of files) {
      if (path.extname(file) === '.txt') {
        await processFile(file)
      }
    }
  } catch (err) {
    console.log('Error:', err)
  }
}

/**
 * IDLE -> CONNECTED 비정상 이벤트 검색.
 */
async function searchUnusualBehavior() {
  const filePath = 'E:\\unusual_behavior.txt'
  const fileLines = fs.readFileSync(filePath, 'utf8').split('\n')
  console.log(`searchUnusualBehavior. filePath: ${filePath}`)

  for (let i = 0; i < fileLines.length - 1; i++) {
    if (i % 1000 === 0) {
      console.log(i)
    }
    const currentLine = fileLines[i]
    const nextLine = fileLines[i + 1]

    if (
      // currentLine.includes('[CallStateListener]: onCallStateChanged.IDLE') &&
      // nextLine.includes('[CallStateListener]: onCallStateChanged.CONNECTED')
      currentLine.includes('IDLE') &&
      nextLine.includes('CONNECTED')
    ) {
      console.log(currentLine)
      console.log(nextLine)
    }
  }
}

/**
 * POST /api/search 요청.
 */
export async function POST(request: NextRequest) {
  // searchByKeyword(keyword)
  searchUnusualBehavior()
  return NextResponse.json({ ok: true })
}
