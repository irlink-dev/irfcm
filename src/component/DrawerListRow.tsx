'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ListItemButton, ListItemText, ListItemAvatar } from '@mui/material'

interface DrawerListRowProps {
    name: string
    desc: string
    route: string
    image: string
}

const DrawerListRow = ({ name, desc, route, image }: DrawerListRowProps) => {
    const router = useRouter()
    const pathname = usePathname()
    return <ListItemButton divider selected={pathname === route} onClick={() => router.push(route)} sx={{ pl: 4 }}>
        <ListItemAvatar sx={{ mr: 2 }}>
            <Image src={image} alt={name} width={64} height={64} priority={true} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={desc} />
    </ListItemButton>
}

export default DrawerListRow
