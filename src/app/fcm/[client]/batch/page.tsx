import BatchBox from '@/components/batch-box'
import useFirebaseConfig from '@/hooks/use-firebase-config'
import { getLegacyAuthKey } from '@/utils/auth'
import FirebasePreference from '@/interfaces/firebase-preference'
import { ClientType } from '@/enums/client'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'

const ClientBatchPage = ({ params }: { params: { client: ClientType } }) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: getLegacyAuthKey(params.client)!,
    oAuthClientId: getOAuthClientId(params.client),
    oAuthClientSecret: getOAuthClientSecret(params.client),
    config: useFirebaseConfig(params.client)!,
  }

  return <BatchBox params={params} firebasePref={firebasePref} />
}

export default ClientBatchPage
