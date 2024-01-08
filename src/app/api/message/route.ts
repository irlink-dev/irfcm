import testMessageList from '@/constants/testMessageList'
import { printLog } from '@/utils/log'
import axios from 'axios'
import https from 'https'
import { NextRequest, NextResponse } from 'next/server'

const TAG = '/api/message'
const REQUEST_URL = 'https://175.126.124.137/cdm/devMessage'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})



async function doBatchInsertMessageDb(message: string) {
  try {
    const response = await axios.post(
      REQUEST_URL,
      {
        szState: message,
        target: 'PC',
        type: 'DevMessageExt',
        prevFailCode: '',
      },
      { httpsAgent, timeout: 10000 },
    )
    console.log(`(${response.status})`)
    return response
  } catch (error: any) {
    console.error('Error in doBatchInsertMessageDb:', error)
  }
}

async function doInsertMessageProcess() {
  // ! 테스트 메시지 리스트 사용 중...
  for (const message of testMessageList) {
    const response = await doBatchInsertMessageDb(message)
    printLog(
      TAG,
      `POST. RESPONSE: (${response?.status})${response?.data?.message}\n` +
        `${response?.config.data}\n\n`,
    )
  }
}

export async function POST(request: NextRequest) {
  printLog(TAG, `POST. REQUEST_URL: ${REQUEST_URL}`)
  console.log(`\n\n===============  START  ===============\n\n`)

  doInsertMessageProcess().then(() =>
    console.log(`===============  FINISH  ===============\n\n`),
  )

  return NextResponse.json({ ok: true })
}
