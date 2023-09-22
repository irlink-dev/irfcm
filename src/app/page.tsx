'use client'

import DrawerListRow from '@/components/drawer/DrawerListRow'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
} from '@mui/material'
import Typography from '@mui/material/Typography'

const HomePage = () => {
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
          image: '',
        },
      ].map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ maxWidth: 345, marginTop: 2 }}>
            <CardActionArea href={item.route}>
              <CardMedia
                // component="img"
                // height="140"
                // image={item.image}
                // alt={item.name}
                style={{
                  height: 140,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${item.image})`,
                }}
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
 * FCM Request Type 에 따른 분기 처리.
 * > UPLOAD_LOGS, UPLOAD_FILE_LIST 는 POST 후 자동으로 다운로드 링크 GET.
 * > FORCE_CONVERT_FILE, ENABLE_BLOCK_WINDOW 등은 POST 만.
 *
 */
