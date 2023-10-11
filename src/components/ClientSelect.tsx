'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'
import { LoadingContext } from '@/contexts/LoadingContext'
import { FormControl, Grid, InputLabel, MenuItem } from '@mui/material'
import MuiSelect, {
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
} from '@mui/material/Select'
import { Client } from '@/enums/Client'

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
    [Client.LINA, '라이나 생명'],
    [Client.L_POINT, 'L 포인트'],
    [Client.CHUBB, '처브 CDM'],
    [Client.HANA, '하나손해보험'],
    [Client.SHINHAN_CARD, '신한카드'],
    [Client.DB_LIFE, 'DB 생명'],
    [Client.KB_WIRELESS, 'KB 손해보험'],
    [Client.MORECX, '모렉스'],
    [Client.ZILINK, '지링크'],
  ]

  return (
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
  )
}

export default ClientSelect
