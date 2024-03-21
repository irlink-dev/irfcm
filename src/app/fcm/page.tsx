'use client'

import { useSetAtom } from 'jotai'
import { pageLoadingStatusAtom } from '@/atoms/global-state-atoms'
import clientList from '@/constants/client-list'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

const ClientsPage = () => {
  const setIsPageLoading = useSetAtom(pageLoadingStatusAtom)

  return (
    <Grid container spacing={3}>
      {clientList.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.route}>
          <Card
            sx={{ maxWidth: 345, marginTop: 2 }}
            onClick={() => {
              setIsPageLoading(true)
            }}
          >
            <CardActionArea href={item.route}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ClientsPage
