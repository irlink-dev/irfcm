import TestBox from '@/components/TestBox'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import useAuthorizationKey from '@/hooks/useAuthorizationKey'
import FirebasePreference from '@/interfaces/FirebasePreference'
import { ClientType } from '@/enums/Client'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'

const BatchDownloadPage = ({ params }: { params: { client: ClientType } }) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: useAuthorizationKey(params.client)!,
    oAuthClientId: getOAuthClientId(params.client),
    oAuthClientSecret: getOAuthClientSecret(params.client),
    config: useFirebaseConfig(params.client)!,
  }

  return <TestBox params={params} pref={firebasePref} />
}

export default BatchDownloadPage
