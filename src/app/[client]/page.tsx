import FcmBox from '@/components/fcm-box'
import useFirebaseConfig from '@/hooks/use-firebase-config'
import { getLegacyAuthKey } from '@/utils/auth'
import FirebasePreference from '@/interfaces/firebase-preference'
import { ClientType } from '@/enums/client'
import { getOAuthClientId, getOAuthClientSecret } from '@/utils/oauth'

const ClientPage = ({ params }: { params: { client: ClientType } }) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: getLegacyAuthKey(params.client)!,
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
