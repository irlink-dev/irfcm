'use client'

import { printLog } from '@/utils/log'
import { Box, Button } from '@mui/material'

const ArchiveBox = () => {
  const TAG = 'ArchiveBox'

  const doBatchRename = async () => {
    printLog(TAG, `doBatchRename.`)
    const data = await fetch(`/api/rename`, { method: 'POST' }).then(
      (response) => response.json(),
    )
    console.log(data)
  }

  const doBatchCompress = async () => {
    printLog(TAG, `doBatchCompress.`)
    const data = await fetch(`/api/compress`, { method: 'POST' }).then(
      (response) => response.json(),
    )
    console.log(data)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        color="error"
        sx={{ fontWeight: 600 }}
        onClick={doBatchRename}
      >
        파일명 변경
      </Button>

      <Button variant="contained" onClick={doBatchCompress}>
        ZIP 파일 생성
      </Button>
    </Box>
  )
}

export default ArchiveBox
