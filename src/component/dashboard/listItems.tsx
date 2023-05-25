import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import BarChartIcon from '@mui/icons-material/BarChart'
import LayersIcon from '@mui/icons-material/Layers'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DrawerListRow from '@/component/DrawerListRow'
import { usePathname, useRouter } from 'next/navigation'
import { Collapse } from '@mui/material'
import { ExpandLess, ExpandMore, StarBorder, AccountCircle } from '@mui/icons-material'
import List from '@mui/material/List'

export const MainListItems = () => {
    const [open, setOpen] = React.useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {/* <AccountCircle /> */}
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="고객사 리스트" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <DrawerListRow
                        name="라이나 생명" route="/lina" desc="kr.co.irlink.lina"
                        image="/images/lina_app_icon.png" />
                    <DrawerListRow
                        name="처브 CDM" route="/chubb" desc="kr.co.irlink.chubb"
                        image="/images/chubb_app_icon.png" />
                    <DrawerListRow
                        name="하나손해보험" route="/hana" desc="kr.co.irlink.hana"
                        image="/images/hana_app_icon.png" />
                    <DrawerListRow
                        name="신한카드" route="/shinhan" desc="kr.co.irlink.shinhan"
                        image="/images/shinhan_card_app_icon.png" />
                    <DrawerListRow
                        name="DB 생명" route="/dblife" desc="kr.co.irlink.dblife"
                        image="/images/db_life_app_icon.png" />
                    <DrawerListRow
                        name="KB 손해보험" route="/kb" desc="kr.co.irlink.kb"
                        image="/images/kb_wireless_app_icon.png" />
                </List>
            </Collapse>
        </React.Fragment>
    )
}

export const SecondaryListItems = () => {
    const TEST_LOG_URL = '/test/log'
    const router = useRouter()
    const pathname = usePathname()
    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                Experimental Function (Lab.)
            </ListSubheader>
            <ListItemButton
                onClick={() => router.push(TEST_LOG_URL)}
                selected={pathname === TEST_LOG_URL}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="전체 로그 수집" />
            </ListItemButton>
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
