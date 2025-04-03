'use client'

import { useRouter } from 'next/navigation'
import { styled } from '@mui/material/styles'
import { FormControl, Grid, InputLabel, MenuItem } from '@mui/material'
import MuiSelect, {
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
} from '@mui/material/Select'
import { Client } from '@/enums/client'
import { useSetAtom } from 'jotai'
import { pageLoadingStatusAtom } from '@/states/global-state'

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
  const setIsPageLoading = useSetAtom(pageLoadingStatusAtom)

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setIsPageLoading(true)
    router.push(`/fcm/${event.target.value as string}`)
  }

  // TODO: 추후 DB화.
  const menu = [
    [Client.BC_CARD_LINA, 'BC카드(라이나)'],
    [Client.CHUBB, '처브 CDM'],
    [Client.CJ_O_SHOPPING, 'CJO 쇼핑'],
    [Client.DB_LIFE, 'DB 생명'],
    [Client.GS_SHOP, 'GS 홈쇼핑(라이나)'],
    [Client.GS_SHOP_USB, 'GS 홈쇼핑'],
    [Client.HANA, '하나손해보험'],
    [Client.HEUNGKUK_LIFE, '흥국생명'],
    [Client.HYUNDAI, '현대해상'],
    [Client.HYUNDAI_SHOP, '현대 홈쇼핑'],
    [Client.HYUNDAI_SHOP_LINA, '현대 홈쇼핑(라이나)'],
    [Client.JOB_KOREA, '잡코리아'],
    [Client.KB_CARD_LINA, 'KB카드(라이나)'],
    [Client.KB_WIRELESS, 'KB 손해보험'],
    [Client.KT_COMMERCE, 'KT 커머스'],
    [Client.LINA, '라이나 생명'],
    [Client.LOTTE_CARD, '롯데카드'],
    [Client.LOTTE_HOMESHOPPING_LINA, '롯데 홈쇼핑(라이나)'],
    [Client.L_POINT, 'L 포인트'],
    [Client.MERITZ, '메리츠 화재'],
    [Client.MORECX, '모렉스'],
    [Client.NS_SHOP, 'NS 홈쇼핑'],
    [Client.SHINHAN_CARD, '신한카드'],
    [Client.SHINHAN_CARD_LINA, '신한카드(라이나)'],
    [Client.SK_MNSERVICE, 'SK엠엔서비스'],
    [Client.ZILINK, '지링크'],
  ]

  // TODO: 단순 dropdown이 아닌, 검색 가능한 dropdown으로.
  return (
    <FormControl fullWidth>
      <InputLabel id='client-select'>요청 헤더</InputLabel>

      <Select
        id='client-select'
        label='요청 헤더'
        value={params.client}
        onChange={handleChange}
        sx={{
          // width: '200px',
          mb: 0,
        }}
        // size="small"
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
