'use client'

import { Client, ClientType } from '@/enums/client'
import { MorecxVariants } from '@/enums/morecx-variants'
// import FirebasePreference from '@/interfaces/FirebasePreference'
import { FormControl, InputLabel, MenuItem, styled } from '@mui/material'

import MuiSelect, {
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
} from '@mui/material/Select'
import useLocalStorage from '@/hooks/use-local-storage'
import { useAtom } from 'jotai'
import { morecxVariantsAtom } from '@/atoms/global-state-atoms'

interface SelectProps extends MuiSelectProps {
  /* empty */
}

const Select = styled(MuiSelect)<SelectProps>(() => ({
  marginBottom: 16,
  backgroundColor: 'white',
  fontWeight: 600,
}))

const MorecxVariantSelect = ({
  // firebasePref,
  params,
}: {
  // firebasePref: FirebasePreference
  params: { client: ClientType }
}) => {
  const IS_SHOW = params.client === Client.MORECX
  const LOCAL_STORAGE_MORECX_BUILD_VARIANT_KEY = `irfcm:build_variant:morecx`

  const [morecxVariant, setMorecxVariant] = useAtom(morecxVariantsAtom)
  const { setLocalStorageData } = useLocalStorage()

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = Number(event.target.value) as MorecxVariants
    setMorecxVariant(() => value)
    setLocalStorageData(LOCAL_STORAGE_MORECX_BUILD_VARIANT_KEY, value)
  }

  const menu = [
    [MorecxVariants.CLOUD, '클라우드'],
    [MorecxVariants.BOHUM_DOTCOM, '보험닷컴'],
    [MorecxVariants.WELCOME_BANK, '웰컴저축은행'],
    [MorecxVariants.WELCOME_LOAN, '웰컴금융그룹(국내)'],
    [MorecxVariants.WELCOME_LOAN_FOREIGN, '웰컴금융그룹(해외)'],
    [MorecxVariants.WELCOME_CAPITAL, '웰컴캐피탈'],
  ]

  return (
    <>
      {IS_SHOW && (
        <FormControl fullWidth>
          <InputLabel id="morecx-variants">Build Variants</InputLabel>

          <Select
            id="morecx-variants"
            label="Build Variants"
            value={morecxVariant}
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
      )}
    </>
  )
}

export default MorecxVariantSelect
