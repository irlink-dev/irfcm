import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const REQUEST_URL = 'https://175.126.124.136/devCallEnd'

/**
 * 통화 이력 저장.
 * <중계 서버>
 */
async function insertCallInfoDb(request: object) {
  const response = await axios.post(REQUEST_URL, {
    number: '01012345678',
    filename: '{ record 객체 전체를 stringify 한 스트링 }',
    type: 'DevCallEnd',
    prevFailCode: '',
    option: 2,
  })
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ ok: true })
}
