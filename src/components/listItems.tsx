import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ScienceIcon from '@mui/icons-material/Science'
import SendIcon from '@mui/icons-material/Send'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Collapse, ListSubheader } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import List from '@mui/material/List'
import { green, lightBlue, blue } from '@mui/material/colors'
import { LoadingContext } from '@/contexts/LoadingContext'

const NULL = 'state.open.NULL'
const CLIENT_LIST = 'state.open.CLIENT_LIST'
const LAB = 'state.open.LAB'

const TEST_LOG_URL = '/test/log'

interface ListItemProps {
  href: string
  text: string
  alias: string
  color: string
}

const ClientListItem = ({ href, text, alias, color }: ListItemProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { showProgress } = React.useContext(LoadingContext)
  return (
    <ListItemButton
      sx={{ pl: 4 }}
      onClick={() => {
        if (pathname !== href) {
          showProgress()
        }
        router.push(href)
      }}
      selected={pathname === href}
    >
      <ListItemIcon>
        <Avatar
          sx={{
            width: 24,
            height: 24,
            fontSize: '13px',
            fontWeight: 600,
            bgcolor: color,
          }}
        >
          {alias}
        </Avatar>
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  )
}

export const MainListItems = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [selectedItem, setSelectedItem] = React.useState(NULL)

  const { showProgress } = React.useContext(LoadingContext)

  /**
   * 메뉴 드롭다운 클릭 시.
   */
  const handleClick = (item: string) => {
    if (selectedItem === item) {
      setSelectedItem(NULL)
    } else {
      setSelectedItem(item)
    }
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export const SecondaryListItems = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <React.Fragment>
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
    </React.Fragment>
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
