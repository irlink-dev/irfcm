import { printLog } from '@/utils/log'
import { NextRequest, NextResponse } from 'next/server'
import emptyArray from '@/constants/emptyArray'

const TAG = '/api/message/validation'
const SEPARATOR = '60uNd@ry'

function validateMessage(base64EncodedString: string) {
  try {
    const decodedString = Buffer.from(base64EncodedString, 'base64').toString(
      'utf-8',
    )
    const parts = decodedString.split(SEPARATOR)

    printLog(
      TAG,
      `validateMessage. parts: ` +
        `${parts[0]}_${parts[1]}_${parts[2]}_(생략)_${parts[4]}_${parts[5]}_ ` +
        `...(${parts.length === 10})`,
    )
    return parts.length === 10
  } catch (error) {
    printLog(TAG, `validateMessage. VALIDATION FAILED! (ERROR CATCHED)`)
    return false
  }
}

function filterValidMessage(messageList: string[]) {
  return messageList.filter(validateMessage)
}

export async function POST(request: NextRequest) {
  const validMessageList = filterValidMessage(emptyArray)
  return NextResponse.json({ validMessageList })
}
