'use client'

import { Box, Button } from '@mui/material'

const BatchUploadPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        color="error"
        sx={{ fontWeight: 600 }}
        size="small"
        onClick={() => console.log('일괄 업로드')}
      >
        일괄 업로드
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          console.log('단일 업로드')
        }}
      >
        단일 업로드
      </Button>
    </Box>
  )
}

export default BatchUploadPage
