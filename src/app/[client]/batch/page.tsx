import BatchBox from '@/components/BatchBox'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import { getLegacyAuthKey } from '@/utils/auth'
import FirebasePreference from '@/interfaces/FirebasePreference'
import { ClientType } from '@/enums/Client'
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
