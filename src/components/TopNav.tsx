'use client'

import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import ClientSelect from './ClientSelect'
import { usePathname, useRouter } from 'next/navigation'
import { ClientType } from '@/enums/Client'

const TopNav = ({ params }: { params: { client: ClientType } }) => {
  const router = useRouter()
  const pathname = usePathname()

  const SINGLE_URL = `/${params.client}`
  const BATCH_URL = `/${params.client}/batch`

  return (
    <Grid container rowSpacing={2} columnSpacing={3} sx={{ pb: 1 }}>
      <Grid item xs={12} lg={6}>
        <ClientSelect params={params} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ButtonGroup
          variant="outlined"
          sx={{
            width: '100%',
            height: '56px',
            backgroundColor: 'white',
          }}
        >
          <Button
            onClick={() => router.push(`/${params.client}`)}
            variant={pathname === SINGLE_URL ? 'contained' : 'outlined'}
            sx={{ width: '100%', boxShadow: 'none' }}
          >
            단일 요청
          </Button>
          <Button
            onClick={() => router.push(`/${params.client}/batch`)}
            variant={pathname === BATCH_URL ? 'contained' : 'outlined'}
            sx={{ width: '100%', boxShadow: 'none' }}
          >
            일괄 요청
          </Button>
        </ButtonGroup>
        {/* <FormControl>
          <RadioGroup
            row
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              value="single"
              control={<Radio />}
              label="단일 요청"
            />
            <FormControlLabel
              value="batch"
              control={<Radio />}
              label="일괄 요청"
            />
          </RadioGroup>
        </FormControl> */}
      </Grid>
    </Grid>
  )
}

export default TopNav
