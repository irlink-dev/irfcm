'use client'

import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { MainListItems, SecondaryListItems } from './listItems'
import Deposits from './Deposits'
import Orders from './Orders'
import Copyright from './Copyright'
import AppBar from './AppBar'
import Drawer from './Drawer'
import { useRouter } from 'next/navigation'

const DRAWER_WIDTH: number = 360

export default function Dashboard({ children }: any) {
    const router = useRouter()

    const [open, setOpen] = React.useState(true)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} drawer_width={DRAWER_WIDTH}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => router.push('/')}
                >
                    Firebase Cloud Messaging Service
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} drawer_width={DRAWER_WIDTH}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <MainListItems />
                <Divider sx={{ my: 1 }} />
                <SecondaryListItems />
            </List>
        </Drawer>
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >

            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    </Box>
}


/**
 * <Toolbar />
 * <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
 *     <Grid container spacing={3}>
 *         <Grid item xs={12} md={8} lg={9}>
 *             <Paper
 *                 sx={{
 *                     p: 2,
 *                     display: 'flex',
 *                     flexDirection: 'column',
 *                     height: 240,
 *                 }}
 *             >
 *                 <Chart />
 *             </Paper>
 *         </Grid>
 *         <Grid item xs={12} md={4} lg={3}>
 *             <Paper
 *                 sx={{
 *                     p: 2,
 *                     display: 'flex',
 *                     flexDirection: 'column',
 *                     height: 240,
 *                 }}
 *             >
 *                 <Deposits />
 *             </Paper>
 *         </Grid>
 *         <Grid item xs={12}>
 *             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
 *                 <Orders />
 *             </Paper>
 *         </Grid>
 *     </Grid>
 *     <Copyright sx={{ pt: 4 }} />
 * </Container>
 */
