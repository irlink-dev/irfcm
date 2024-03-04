import { NextRequest, NextResponse } from 'next/server'
import { batchDownload } from '@/utils/download'
import { printLog } from '@/utils/log'
import emptyArray from '@/constants/empty-array'

const TAG = '/api/download'

/**
 * URL 일괄 다운로드.
 */
function doBatchDownload() {
  printLog(TAG, 'doBatchDownload.')
  const urls = emptyArray // ! 실제 사용할 download URL 배열로 교체.
  batchDownload(urls)
}

/**
 * POST /api/download 요청.
 */
export async function POST(request: NextRequest) {
  doBatchDownload()
  return NextResponse.json({ ok: true })
}
