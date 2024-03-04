'use client'

import * as React from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { ListItemButton, ListItemText, ListItemAvatar } from '@mui/material'
import { LoadingContext } from '@/contexts/loading-context'

interface DrawerListRowProps {
  name: string
  desc: string
  route: string
  image: string
}

const DrawerListRow = ({ name, desc, route, image }: DrawerListRowProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const { showProgress } = React.useContext(LoadingContext)
  return (
    <ListItemButton
      sx={{ pl: 4 }}
      selected={pathname === route}
      onClick={() => {
        if (pathname !== route) {
          showProgress()
        }
        router.push(route)
      }}
    >
      <ListItemAvatar sx={{ mr: 2 }}>
        <Image src={image} alt={name} width={64} height={64} priority={true} />
      </ListItemAvatar>
      <ListItemText primary={name} secondary={desc} />
    </ListItemButton>
  )
}

export default DrawerListRow
