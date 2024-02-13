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
import { useContext, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import { MorecxVariants } from '@/enums/MorecxVariants'
import { MorecxVariantsContext } from '@/contexts/MorecxVariantsContext'
import MorecxVariantSelect from './MorecxVariantSelect'

const TopNav = ({ params }: { params: { client: ClientType } }) => {
  const router = useRouter()
  const pathname = usePathname()

  const SINGLE_URL = `/${params.client}`
  const BATCH_URL = `/${params.client}/batch`

  const { getLocalStorageData } = useLocalStorage()
  const { setVariant } = useContext(MorecxVariantsContext)

  useEffect(() => {
    const LOCAL_STORAGE_MORECX_BUILD_VARIANT_KEY = `irfcm:build_variant:morecx`
    const data = getLocalStorageData(LOCAL_STORAGE_MORECX_BUILD_VARIANT_KEY)
    const variant = data ? data : MorecxVariants.CLOUD
    setVariant(() => variant)
  }, [])

  return (
    <Grid container rowSpacing={2} columnSpacing={3} sx={{ pb: 1 }}>
      <Grid item xs={12} lg={6}>
        <ClientSelect params={params} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <MorecxVariantSelect params={params} />

        {/* <ButtonGroup
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
        </ButtonGroup> */}
      </Grid>
    </Grid>
  )
}

export default TopNav
