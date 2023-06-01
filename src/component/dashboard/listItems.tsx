import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import PeopleIcon from '@mui/icons-material/People'
import ScienceIcon from '@mui/icons-material/Science'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Collapse } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import List from '@mui/material/List'
import { green, lightBlue, blue } from '@mui/material/colors'
import { LoadingContext } from '@/components/context/LoadingContext'

const NULL = 'state.open.NULL'
const CLIENT_LIST = 'state.open.CLIENT_LIST'
const LAB = 'state.open.LAB'

const TEST_LOG_URL = '/test/log'

interface ListItemProps {
    href: string
    text: string
    alias: string
    color: any
}

const ClientListItem = (
    { href, text, alias, color }: ListItemProps
) => {
    const router = useRouter()
    const pathname = usePathname()
    const { showProgress } = React.useContext(LoadingContext)
    return (
        <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
                showProgress()
                router.push(href)
            }}
            selected={pathname === href}>
            <ListItemIcon><Avatar sx={{
                width: 24,
                height: 24,
                fontSize: '13px',
                fontWeight: 600,
                bgcolor: color
            }}>{alias}</Avatar></ListItemIcon>
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

            {/* 고객사 리스트 */}
            <ListItemButton onClick={() => handleClick(CLIENT_LIST)}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="고객사 리스트" />
                {selectedItem === CLIENT_LIST ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={selectedItem === CLIENT_LIST} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ClientListItem href="/lina" text="라이나 생명" alias="LN" color={blue[500]} />
                    <ClientListItem href="/chubb" text="처브 CDM" alias="CH" color="#666666" />
                    <ClientListItem href="/hana" text="하나손해보험" alias="HN" color="#2F9C90" />
                    <ClientListItem href="/shinhan" text="신한카드" alias="SH" color={lightBlue[500]} />
                    <ClientListItem href="/dblife" text="DB 생명" alias="DB" color={green[500]} />
                    <ClientListItem href="/kb" text="KB 손해보험" alias="KB" color="#F0C861" />
                </List>
            </Collapse>

            {/* 실험실 */}
            <ListItemButton onClick={() => handleClick(LAB)}>
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
                            showProgress()
                            router.push(TEST_LOG_URL)
                        }}
                        selected={pathname === TEST_LOG_URL}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="전체 로그 수집" />
                    </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export const SecondaryListItems = () => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                {/* Experimental Function (Lab.) */}
            </ListSubheader>
            {/*<ListItemButton*/}
            {/*    onClick={() => router.push(TEST_LOG_URL)}*/}
            {/*    selected={pathname === TEST_LOG_URL}>*/}
            {/*    <ListItemIcon>*/}
            {/*        <AssignmentIcon />*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="전체 로그 수집" />*/}
            {/*</ListItemButton>*/}
            {/*<ListItemButton>*/}
            {/*    <ListItemIcon>*/}
            {/*        <AssignmentIcon />*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Last quarter" />*/}
            {/*</ListItemButton>*/}
            {/*<ListItemButton>*/}
            {/*    <ListItemIcon>*/}
            {/*        <AssignmentIcon />*/}
            {/*    </ListItemIcon>*/}
            {/*    <ListItemText primary="Year-end sale" />*/}
            {/*</ListItemButton>*/}
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
