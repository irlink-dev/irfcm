import TestBox from '@/components/test-box'
import useFirebaseConfig from '@/hooks/use-firebase-config'
import { getLegacyAuthKey } from '@/utils/auth'
import FirebasePreference from '@/interfaces/firebase-preference'
import { ClientType } from '@/enums/client'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'

const BatchDownloadPage = ({ params }: { params: { client: ClientType } }) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: getLegacyAuthKey(params.client)!,
    oAuthClientId: getOAuthClientId(params.client),
    oAuthClientSecret: getOAuthClientSecret(params.client),
    config: useFirebaseConfig(params.client)!,
  }

  return <TestBox params={params} pref={firebasePref} />
}

export default BatchDownloadPage
