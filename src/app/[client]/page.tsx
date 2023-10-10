import FcmBox from '@/components/FcmBox'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import useAuthorizationKey from '@/hooks/useAuthorizationKey'
import FirebasePreference from '@/interfaces/FirebasePreference'
import { ClientType } from '@/enums/Client'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'

const ClientPage = ({ params }: { params: { client: ClientType } }) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: useAuthorizationKey(params.client)!,
    oAuthClientId: getOAuthClientId(params.client),
    oAuthClientSecret: getOAuthClientSecret(params.client),
    config: useFirebaseConfig(params.client)!,
  }

  return <FcmBox params={params} firebasePref={firebasePref} />
}

export default ClientPage

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { client: 'lina' } },
//       { params: { client: 'chubb' } },
//       { params: { client: 'hana' } },
//       { params: { client: 'shinhan' } },
//       { params: { client: 'dblife' } },
//       { params: { client: 'kb' } },
//     ],
//     fallback: false,
//   }
// }
