'use client'

import Paper from '@mui/material/Paper'
import MuiButton from '@mui/material/Button'
import { styled } from '@mui/material/styles'
// import '@/style/tailwind.css'

const Button = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}))

const StyleTestPage = () => {
    return <Paper sx={{ p: 2 }}>
        <Button variant="contained">TEST</Button>
        <br />
        <button className="bg-[#1da1f2]">Tests</button>
    </Paper>
}

export default StyleTestPage


/**
 * const AppBar = styled(MuiAppBar, {
 *     shouldForwardProp: (prop) => prop !== 'open',
 * })<AppBarProps>(({ theme, open, drawer_width }) => ({
 *     zIndex: theme.zIndex.drawer + 1,
 *     transition: theme.transitions.create(['width', 'margin'], {
 *         easing: theme.transitions.easing.sharp,
 *         duration: theme.transitions.duration.leavingScreen,
 *     }),
 *     ...(open && {
 *         marginLeft: drawer_width,
 *         width: `calc(100% - ${drawer_width}px)`,
 *         transition: theme.transitions.create(['width', 'margin'], {
 *             easing: theme.transitions.easing.sharp,
 *             duration: theme.transitions.duration.enteringScreen,
 *         }),
 *     }),
 * }))
 */
