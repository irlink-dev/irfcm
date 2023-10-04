import Batch from '@/components/Batch'
import useAuthorizationKey from '@/hooks/useAuthorizationKey'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import useClientName from '@/hooks/useClientName'
import FirebasePreference from '@/types/FirebasePreference'
import Pathname from '@/types/Pathname'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'

interface BatchPageProps {
  params: {
    client: Pathname
  }
}

const BatchPage = ({ params }: BatchPageProps) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: useAuthorizationKey(params.client),
    oAuthClientId: getOAuthClientId(params.client),
    oAuthClientSecret: getOAuthClientSecret(params.client),
    config: useFirebaseConfig(params.client)!,
  }

  return (
    <>
      <h4>{useClientName(params.client) + ' (batch)'}</h4>
      <Batch firebasePref={firebasePref} />
    </>
  )
}

export default BatchPage
