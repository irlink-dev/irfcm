import Fcm from '@/components/fcm/Fcm'
import ClientSelect from '@/components/ClientSelect'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import useAuthorizationKey from '@/hooks/useAuthorizationKey'
import FirebasePreference from '@/types/FirebasePreference'
import Pathname from '@/types/Pathname'

interface ClientPageProps {
  params: {
    client: Pathname
  }
}

const ClientPage = ({ params }: ClientPageProps) => {
  const firebasePref: FirebasePreference = {
    authorizationKey: useAuthorizationKey(params.client)!,
    config: useFirebaseConfig(params.client)!,
  }

  return (
    <>
      <ClientSelect params={params} />
      <Fcm params={params} firebasePref={firebasePref} />
    </>
  )
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
