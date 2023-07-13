import FirebaseManager from '@/manager/FirebaseManager'
import Fcm from '@/components/fcm/Fcm'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import useAuthorizationKey from '@/hooks/useAuthorizationKey'
import FirebasePreference from '@/types/FirebasePreference'
import useClientName from '@/hooks/useClientName'

const ClientPage = ({ params }: any) => {

    const firebasePref: FirebasePreference = {
        authorizationKey: useAuthorizationKey(params.client)!,
        config: useFirebaseConfig(params.client)!
    }

    return (
        <>
            <h4>{useClientName(params.client)}</h4>
            <Fcm firebasePref={firebasePref} />
        </>
    )
}

export default ClientPage
