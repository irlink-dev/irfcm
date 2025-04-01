import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box } from '@mui/material'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'

import {
  ROUTE_BC_CARD_LINA,
  ROUTE_CHUBB,
  ROUTE_CJ_O_SHOPPING,
  ROUTE_DB_LIFE,
  ROUTE_FCM,
  ROUTE_GS_SHOP,
  ROUTE_GS_SHOP_USB,
  ROUTE_HANA,
  ROUTE_HEUNGKUK_LIFE,
  ROUTE_HYUNDAI,
  ROUTE_HYUNDAI_SHOP,
  ROUTE_HYUNDAI_SHOP_LINA,
  ROUTE_JOB_KOREA,
  ROUTE_KB_CARD_LINA,
  ROUTE_KB_WIRELESS,
  ROUTE_KT_COMMERCE,
  ROUTE_L_POINT,
  ROUTE_LINA,
  ROUTE_LOTTE_CARD,
  ROUTE_LOTTE_HOMESHOPPING_LINA,
  ROUTE_MERITZ,
  ROUTE_MORECX,
  ROUTE_NS_SHOP,
  ROUTE_SHINAN_LIFE,
  ROUTE_SHINHAN_CARD,
  ROUTE_SHINHAN_CARD_LINA,
  ROUTE_SK_MNSERVICE,
  ROUTE_ZILINK,
} from '@/constants/routes'

const SINGLE_REQUEST_ROUTES = [
  ROUTE_FCM,
  ROUTE_BC_CARD_LINA,
  ROUTE_CHUBB,
  ROUTE_CJ_O_SHOPPING,
  ROUTE_DB_LIFE,
  ROUTE_GS_SHOP,
  ROUTE_GS_SHOP_USB,
  ROUTE_HANA,
  ROUTE_HEUNGKUK_LIFE,
  ROUTE_HYUNDAI,
  ROUTE_HYUNDAI_SHOP,
  ROUTE_HYUNDAI_SHOP_LINA,
  ROUTE_JOB_KOREA,
  ROUTE_KB_CARD_LINA,
  ROUTE_KB_WIRELESS,
  ROUTE_KT_COMMERCE,
  ROUTE_LINA,
  ROUTE_LOTTE_CARD,
  ROUTE_LOTTE_HOMESHOPPING_LINA,
  ROUTE_L_POINT,
  ROUTE_MERITZ,
  ROUTE_MORECX,
  ROUTE_NS_SHOP,
  ROUTE_SHINHAN_CARD,
  ROUTE_SHINHAN_CARD_LINA,
  ROUTE_SHINAN_LIFE,
  ROUTE_SK_MNSERVICE,
  ROUTE_ZILINK,
]

const ListItem = ({ route, text, icon, isSelected }: {
  route: string
  text: string
  icon: React.ReactNode
  isSelected: any
}) => {
  const router = useRouter()

  return (
    <Box sx={{ px: '4px' }}>
      <ListItemButton
        dense
        sx={{
          borderRadius: '100px',
          ...(isSelected && {
            backgroundColor: '#d5e5f3',
          }),
        }}
        onClick={() => router.push(route)}
      >
        <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>
        <ListItemText primary={text} sx={{ color: '#222222' }} />
      </ListItemButton>
    </Box>
  )
}

export const MainListItems = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <>
      <ListItem
        route={ROUTE_FCM}
        text='클라우드 메시징'
        icon={<SendIcon sx={{ width: 20, height: 20 }} />}
        isSelected={SINGLE_REQUEST_ROUTES.includes(pathname)}
      />

      {/* <ListItemButton onClick={() => handleClick(CLIENT_LIST)}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="단일 요청" />
        {selectedItem === CLIENT_LIST ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={selectedItem === CLIENT_LIST} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ClientListItem
            href="/lina"
            text="LEGACY v0"
            alias="v0"
            color="#666666"
          />
          <ClientListItem
            href="#"
            text="HTTP v1"
            alias="v1"
            color={blue[500]}
          />
        </List>
      </Collapse> */}

      {/* <ListItemButton onClick={() => handleClick(LAB)}>
        <ListItemIcon>
          <ScienceIcon />
        </ListItemIcon>
        <ListItemText primary="실험실" />
        {selectedItem === LAB ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={selectedItem === LAB} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              if (pathname !== TEST_LOG_URL) {
                showProgress()
              }
              router.push(TEST_LOG_URL)
            }}
            selected={pathname === TEST_LOG_URL}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="전체 로그 수집" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </>
  )
}

export const SecondaryListItems = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
      {/* <ListSubheader component="div" inset>
        Function List
      </ListSubheader>
      <ListItemButton onClick={() => router.push('/lina')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="단일 요청" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push('/lina/batch')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="일괄 요청 (Batch)" />
      </ListItemButton> */}
    </>
  )
}
