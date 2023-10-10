'use client'

import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { MainListItems, SecondaryListItems } from './listItems'
import Copyright from './Copyright'
import AppBar from './AppBar'
import Drawer from './Drawer'
import { usePathname, useRouter } from 'next/navigation'
import { Badge, LinearProgress } from '@mui/material'
import { LoadingContext } from '@/contexts/LoadingContext'

const DRAWER_WIDTH: number = 260

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const packageJson = require('/package.json')

  const [open, setOpen] = React.useState(true) // Drawer 열림 여부.

  const { isLoading, showProgress, dismissProgress } =
    React.useContext(LoadingContext)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  React.useEffect(() => {
    dismissProgress()
  }, [pathname])

  return (
    <Box sx={{ display: 'flex' }}>
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
            onClick={() => {
              if (pathname !== '/') {
                showProgress()
              }
              router.push('/')
            }}
          >
            Firebase Cloud Messaging Service
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>

        {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
            color="primary"
          />
        )}
      </AppBar>
      <Drawer variant="permanent" open={open} drawer_width={DRAWER_WIDTH}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: [1],
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, pl: 1 }}>
            <Typography
              sx={{ fontSize: 24, fontWeight: 600, color: '#333333' }}
            >
              {packageJson.name}
            </Typography>
            <Typography sx={{ color: '#888888' }}>
              v{packageJson.version}
            </Typography>
          </Box>
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
  )
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
