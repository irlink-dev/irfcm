import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'

interface DrawerProps {
  open?: boolean
  drawer_width: number
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open, drawer_width }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawer_width,
    height: '100vh',
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      // transition: theme.transitions.create('width', {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
      width: 0,
      // width: theme.spacing(7),
      // [theme.breakpoints.up('sm')]: {
      //   width: theme.spacing(9),
      // },
    }),
  },
}))

export default Drawer
