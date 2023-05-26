import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PeopleIcon from '@mui/icons-material/People'
import ScienceIcon from '@mui/icons-material/Science'
import BarChartIcon from '@mui/icons-material/BarChart'
import LayersIcon from '@mui/icons-material/Layers'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Collapse } from '@mui/material'
import { ExpandLess, ExpandMore, StarBorder, AccountCircle } from '@mui/icons-material'
import List from '@mui/material/List'
import { green, lightBlue, blue } from '@mui/material/colors'

const NULL = 'state.open.NULL'
const CLIENT_LIST = 'state.open.CLIENT_LIST'
const LAB = 'state.open.LAB'

const TEST_LOG_URL = '/test/log'

export const MainListItems = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [selectedItem, setSelectedItem] = React.useState(NULL)

    const handleClick = (item: string) => {
        if (selectedItem === item) {
            setSelectedItem(NULL)
        } else {
            setSelectedItem(item)
        }
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={() => handleClick(CLIENT_LIST)}>
                <ListItemIcon>
                    {/* <AccountCircle /> */}
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="고객사 리스트" />
                {selectedItem === CLIENT_LIST ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={selectedItem === CLIENT_LIST} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => router.push('/lina')}
                        selected={pathname === '/lina'}>
                        <ListItemIcon>
                            <Avatar sx={{
                                width: 24,
                                height: 24,
                                fontSize: '13px',
                                fontWeight: 600,
                                bgcolor: blue[500]
                            }}>LN</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="라이나 생명" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => router.push('/chubb')}
                        selected={pathname === '/chubb'}>
                        <ListItemIcon>
                            <Avatar sx={{
                                width: 24,
                                height: 24,
                                fontSize: '13px',
                                fontWeight: 600,
                                bgcolor: '#666666'
                            }}>CH</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="처브 CDM" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => router.push('/hana')}
                        selected={pathname === '/hana'}>
                        <ListItemIcon>
                            <Avatar sx={{
                                width: 24,
                                height: 24,
                                fontSize: '13px',
                                fontWeight: 600,
                                bgcolor: '#2F9C90'
                            }}>HN</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="하나손해보험" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => router.push('/shinhan')}
                        selected={pathname === '/shinhan'}>
                        <ListItemIcon>
                            <Avatar
                                sx={{
                                    width: 24,
                                    height: 24,
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    bgcolor: lightBlue[500]
                                }}>SH</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="신한카드" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => router.push('/dblife')}
                        selected={pathname === '/dblife'}>
                        <ListItemIcon>
                            <Avatar sx={{
                                width: 24,
                                height: 24,
                                fontSize: '13px',
                                fontWeight: 600,
                                bgcolor: green[500]
                            }}>DB</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="DB 생명" />
                    </ListItemButton>
                    <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => router.push('/kb')}
                        selected={pathname === '/kb'}>
                        <ListItemIcon>
                            <Avatar sx={{
                                width: 24,
                                height: 24,
                                fontSize: '13px',
                                fontWeight: 600,
                                bgcolor: '#F0C861'
                            }}>KB</Avatar>
                        </ListItemIcon>
                        <ListItemText primary="KB 손해보험" />
                    </ListItemButton>
                </List>
            </Collapse>
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
                        onClick={() => router.push(TEST_LOG_URL)}
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
