'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'
import { LoadingContext } from '@/components/context/LoadingContext'
import { FormControl, Grid, InputLabel, MenuItem } from '@mui/material'
import MuiSelect, {
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
} from '@mui/material/Select'

interface SelectProps extends MuiSelectProps {
  /* empty */
}

const Select = styled(MuiSelect)<SelectProps>(() => ({
  marginBottom: 16,
  backgroundColor: 'white',
  fontWeight: 600,
}))

interface ClientSelectProps {
  params: { client: string }
}

const ClientSelect = ({ params }: ClientSelectProps) => {
  const router = useRouter()
  const { showProgress } = useContext(LoadingContext)

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    showProgress()
    router.push(`/${event.target.value as string}`)
  }

  const menu = [
    ['lina', '라이나 생명'],
    ['lpoint', 'L 포인트'],
    ['chubb', '처브 CDM'],
    ['hana', '하나손해보험'],
    ['shinhan', '신한카드'],
    ['dblife', 'DB 생명'],
    ['kb', 'KB 손해보험'],
    ['morecx', '모렉스'],
  ]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <InputLabel id="client-select">요청 헤더</InputLabel>

          <Select
            id="client-select"
            label="요청 헤더"
            value={params.client}
            onChange={handleChange}
          >
            {menu.map((item) => (
              <MenuItem key={item[0]} value={item[0]}>
                {item[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ClientSelect
