'use client'

import { useRouter } from 'next/navigation'
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { ROUTE_FCM } from '@/constants/routes'

const RootPage = () => {
  const router = useRouter()

  return (
    <>
      <Container maxWidth="md">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to IRFCM
          </Typography>
          <Typography variant="body1" paragraph>
            IRFCM(IR-LINK Firebase Cloud Messaging Service)은 FCM(Firebase Cloud
            Messaging) 요청 전송 프로세스를 단순화하는 편리한 웹
            인터페이스입니다. 기존 Legacy FCM 요청 방법이 2023년 6월에 지원
            중단되고 HTTP v1 방식으로 전환됨에 따라, IRFCM은 OAuth 2.0 인증 및
            HTTP v1 요청을 위한 사용하기 쉬운 솔루션을 제공합니다.
          </Typography>
          <Typography variant="body1" paragraph>
            IR-LINK 관리자 계정(irlink2800@gmail.com)으로 OAuth 2.0 인증을
            수행하고, HTTP v1 방식으로 FCM 요청을 진행할 수 있습니다. 이를 위해
            관리자는 별도의 GCP(Google Cloud Platform) 설정이 필요합니다.
          </Typography>

          <Box my={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '100px' }}
              onClick={() => router.push(ROUTE_FCM)}
            >
              시작하기
            </Button>
          </Box>
        </Box>

        {/*<Paper*/}
        {/*  elevation={3}*/}
        {/*  sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}*/}
        {/*>*/}
        {/*  <Grid container spacing={2}>*/}
        {/*    <Grid item xs={12} sm container>*/}
        {/*      <Grid item xs container direction="column" spacing={2}>*/}
        {/*        <Grid item xs>*/}
        {/*          <Typography gutterBottom variant="subtitle1">*/}
        {/*            Main Features*/}
        {/*          </Typography>*/}
        {/*          <Typography variant="body2" gutterBottom>*/}
        {/*            - Easy-to-use FCM request builder*/}
        {/*          </Typography>*/}
        {/*          <Typography variant="body2" gutterBottom>*/}
        {/*            - Support for the latest HTTP v1 API*/}
        {/*          </Typography>*/}
        {/*          <Typography variant="body2" gutterBottom>*/}
        {/*            - Schedule notifications*/}
        {/*          </Typography>*/}
        {/*          <Typography variant="body2" gutterBottom>*/}
        {/*            - Template management for frequent messages*/}
        {/*          </Typography>*/}
        {/*        </Grid>*/}
        {/*      </Grid>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Paper>*/}
      </Container>
    </>
  )
}

export default RootPage

/**
 * TODO LIST
 *
 * * FCM Request Type 에 따른 분기 처리.
 * > UPLOAD_LOGS, UPLOAD_FILE_LIST 는 POST 후 자동으로 다운로드 링크 GET.
 * > FORCE_CONVERT_FILE, ENABLE_BLOCK_WINDOW 등은 POST 만.
 *
 * * TEST CASE 만들기.
 * > 리팩토링 이후 기능들이 정상 동작하는지 쉽게 확인하도록 테스트 케이스, 테스트 번호 리스트 등 정리하기.
 * > 검증 페이지를 따로 만들어, 버튼 하나만 누르면 위 모든 동작을 자동으로 수행하는 페이지 만들기.
 */
