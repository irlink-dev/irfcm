'use client'

import { printLog } from '@/utils/log'

const TAG = 'BatchMessagePage'

const BatchMessagePage = () => {
  const doBatchInsertMessageDb = async () => {
    printLog(TAG, `doBatchInsertMessageDb.`)
    const data = await fetch(`/api/message`, { method: 'POST' }).then(
      (response) => response.json(),
    )
    console.log(data)
  }

  const doBatchMessageValidation = async () => {
    printLog(TAG, `doBatchMessageValidation.`)
    const data = await fetch(`/api/message/validation`, {
      method: 'POST',
    }).then((response) => response.json())
    console.log(data)
  }

  return (
    <>
      <button onClick={doBatchInsertMessageDb}>/cdm/devMessage API</button>{' '}
      <button onClick={doBatchMessageValidation}>Validate messages</button>
    </>
  )
}

export default BatchMessagePage
