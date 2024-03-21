import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Box } from '@mui/material'

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SendIcon from '@mui/icons-material/Send'

import {
  ROUTE_CHUBB,
  ROUTE_FCM,
  ROUTE_DB_LIFE,
  ROUTE_GS_SHOP_USB,
  ROUTE_HANA,
  ROUTE_HYUNDAI,
  ROUTE_KB_WIRELESS,
  ROUTE_KT_COMMERCE,
  ROUTE_LINA,
  ROUTE_L_POINT,
  ROUTE_MERITZ,
  ROUTE_MORECX,
  ROUTE_SHINHAN_CARD,
  ROUTE_ZILINK,
} from '@/constants/routes'

// import ScienceIcon from '@mui/icons-material/Science'
// import AssignmentIcon from '@mui/icons-material/Assignment'
// import { Avatar, Collapse, ListSubheader } from '@mui/material'
// import { ExpandLess, ExpandMore } from '@mui/icons-material'
// import List from '@mui/material/List'
// import { green, lightBlue, blue } from '@mui/material/colors'
// import { useSetAtom } from 'jotai'
// import { pageLoadingStatusAtom } from '@/atoms/global-state-atoms'

const SINGLE_REQUEST_ROUTES = [
  ROUTE_FCM,
  ROUTE_CHUBB,
  ROUTE_DB_LIFE,
  ROUTE_GS_SHOP_USB,
  ROUTE_HANA,
  ROUTE_HYUNDAI,
  ROUTE_KB_WIRELESS,
  ROUTE_KT_COMMERCE,
  ROUTE_LINA,
  ROUTE_L_POINT,
  ROUTE_MERITZ,
  ROUTE_MORECX,
  ROUTE_SHINHAN_CARD,
  ROUTE_ZILINK,
]

const ListItem = ({
  route,
  text,
  icon,
  isSelected,
}: {
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
        text="클라우드 메시징"
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

/**
 * mainListItems
 *
 * <ListItemButton>
 *     <ListItemIcon>
 *         <DashboardIcon />
 *     </ListItemIcon>
 *     <ListItemText primary="Dashboard" />
 * </ListItemButton>
 * <ListItemButton>
 *     <ListItemIcon>
 *         <ShoppingCartIcon />
 *     </ListItemIcon>
 *     <ListItemText primary="Orders" />
 * </ListItemButton>
 * <ListItemButton>
 *     <ListItemIcon>
 *         <PeopleIcon />
 *     </ListItemIcon>
 *     <ListItemText primary="Customers" />
 * </ListItemButton>
 * <ListItemButton>
 *     <ListItemIcon>
 *         <BarChartIcon />
 *     </ListItemIcon>
 *     <ListItemText primary="Reports" />
 * </ListItemButton>
 * <ListItemButton>
 *     <ListItemIcon>
 *         <LayersIcon />
 *     </ListItemIcon>
 *     <ListItemText primary="Integrations" />
 * </ListItemButton>
 */

{
  /* <ListItemButton onClick={() => handleClick(CLIENT_LIST)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="고객사 리스트" />
        {selectedItem === CLIENT_LIST ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={selectedItem === CLIENT_LIST} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ClientListItem
            href="/lina"
            text="라이나 생명"
            alias="LN"
            color={blue[500]}
          />
          <ClientListItem
            href="/chubb"
            text="처브 CDM"
            alias="CH"
            color="#666666"
          />
          <ClientListItem
            href="/hana"
            text="하나손해보험"
            alias="HN"
            color="#2F9C90"
          />
          <ClientListItem
            href="/shinhan"
            text="신한카드"
            alias="SH"
            color={lightBlue[500]}
          />
          <ClientListItem
            href="/dblife"
            text="DB 생명"
            alias="DB"
            color={green[500]}
          />
          <ClientListItem
            href="/kb"
            text="KB 손해보험"
            alias="KB"
            color="#F0C861"
          />
        </List>
      </Collapse> */
}

// interface ListItemProps {
//   href: string
//   text: string
//   alias: string
//   color: string
// }
// const ClientListItem = ({ href, text, alias, color }: ListItemProps) => {
//   const router = useRouter()
//   const pathname = usePathname()

//   const setIsPageLoading = useSetAtom(pageLoadingStatusAtom)

//   return (
//     <ListItemButton
//       sx={{ pl: 4 }}
//       onClick={() => {
//         if (pathname !== href) {
//           setIsPageLoading(true)
//         }
//         router.push(href)
//       }}
//       selected={pathname === href}
//     >
//       <ListItemIcon>
//         <Avatar
//           sx={{
//             width: 24,
//             height: 24,
//             fontSize: '13px',
//             fontWeight: 600,
//             bgcolor: color,
//           }}
//         >
//           {alias}
//         </Avatar>
//       </ListItemIcon>
//       <ListItemText primary={text} />
//     </ListItemButton>
//   )
// }
