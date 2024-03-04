'use client'

import { useContext } from 'react'
import { LoadingContext } from '@/contexts/loading-context'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

const HomePage = () => {
  const { showProgress } = useContext(LoadingContext)

  // TODO: 고객사 리스트 -> 추후 DB화.
  return (
    <Grid container spacing={3}>
      {[
        {
          name: '라이나 생명',
          route: '/lina',
          desc: 'kr.co.irlink.lina',
          image: '/images/lina_app_icon.png',
        },
        {
          name: 'L 포인트',
          route: '/lpoint',
          desc: 'kr.co.irlink.lpoint',
          image: '/images/lpoint_app_icon.png',
        },
        {
          name: '처브 CDM',
          route: '/chubb',
          desc: 'kr.co.irlink.chubb',
          image: '/images/chubb_app_icon.png',
        },
        {
          name: '하나손해보험',
          route: '/hana',
          desc: 'kr.co.irlink.hana',
          image: '/images/hana_app_icon.png',
        },
        {
          name: '신한카드',
          route: '/shinhan',
          desc: 'kr.co.irlink.shinhan',
          image: '/images/shinhan_card_app_icon.png',
        },
        {
          name: 'DB 생명',
          route: '/dblife',
          desc: 'kr.co.irlink.dblife',
          image: '/images/db_life_app_icon.png',
        },
        {
          name: 'KB 손해보험',
          route: '/kb',
          desc: 'kr.co.irlink.kb',
          image: '/images/kb_wireless_app_icon.png',
        },
        {
          name: '모렉스',
          route: '/morecx',
          desc: 'kr.co.irlink.morecx',
          image: '/images/morecx_app_icon.png',
        },
        {
          name: '지링크',
          route: '/zilink',
          desc: 'kr.co.irlink.usbcontrol',
          image: '/images/zilink_app_icon.png',
        },
        {
          name: '메리츠 화재',
          route: '/meritz',
          desc: 'com.irlink.meritz',
          image: '/images/meritz_app_icon.png',
        },
        {
          name: 'GS 홈쇼핑',
          route: '/gsshopusb',
          desc: 'kr.co.irlink.gsshopusb',
          image: '/images/gs_shop_usb_app_icon.png',
        },
        {
          name: 'KT 커머스',
          route: '/ktcommerce',
          desc: 'kr.co.irlink.ktcommerce',
          image: '/images/kt_commerce_app_icon.png',
        },
      ].map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.route}>
          <Card
            sx={{ maxWidth: 345, marginTop: 2 }}
            onClick={() => showProgress()}
          >
            <CardActionArea href={item.route}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default HomePage

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
