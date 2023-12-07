import { NextRequest, NextResponse } from 'next/server'
import { batchDownload } from '@/utils/download'
import Logger from '@/utils/log'

const TAG = '/api/download'

/**
 * URL 일괄 다운로드.
 */
function doBatchDownload() {
  Logger.log(TAG, 'doBatchDownload.')
  const urls = [''] // 실제 사용할 download URL 배열로 교체.
  batchDownload(urls)
}

/**
 * POST /api/download 요청.
 */
export async function POST(request: NextRequest) {
  doBatchDownload()
  return NextResponse.json({ ok: true })
}
