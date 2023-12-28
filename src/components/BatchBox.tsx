'use client'

import 'firebase/compat/storage'
import FirebasePreference from '@/interfaces/FirebasePreference'
import { ClientType } from '@/enums/Client'
import TopNav from './TopNav'
import { Box, Grid } from '@mui/material'
import OAuthButton from '@/components/OAuthButton'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFirebase from '@/hooks/useFirebase'
import useFcmRequest from '@/hooks/useFcmRequest'
import RequestForm from './RequestForm'

const BatchBox = ({
  params,
  firebasePref,
}: {
  params: { client: ClientType }
  firebasePref: FirebasePreference
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { initialize, storageRef } = useFirebase(firebasePref)
  
  const {
    input,
    trigger,
    setTrigger,
    handleChange,
    onSubmit,
    doAuth,
    showInputValues,
  } = useFcmRequest(firebasePref)

  useEffect(() => {
    initialize().then(() => setIsLoading(false))
  }, [])

  return (
    <>
      <TopNav params={params} />

      <Box sx={{ display: 'flex', justifyContent: 'end', pb: 1 }}>
        <OAuthButton params={params} firebasePref={firebasePref} />
      </Box>

      <Grid container rowSpacing={2} columnSpacing={3}>
        {!isLoading && (
          <>
            <Grid item xs={12} lg={6}>
              <RequestForm
                params={params}
                input={input}
                handleChange={handleChange}
                onSubmit={onSubmit}
                showInputValues={showInputValues}
                isBatch={true}
              />
            </Grid>
            {/* <Grid item xs={12} lg={6}>
              <StorageFiles
                params={params}
                input={input}
                trigger={trigger}
                setTrigger={setTrigger}
                firebasePref={firebasePref}
                storageRef={storageRef!}
              />
            </Grid> */}
          </>
        )}
      </Grid>
    </>
  )
}

export default BatchBox
