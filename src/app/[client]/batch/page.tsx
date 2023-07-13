import Batch from '@/components/Batch'
import IrFirebaseConfig from '@/util/IrFirebaseConfig'
import FirebaseManager from '@/manager/FirebaseManager'
import useAuthorizationKey from '@/hooks/useAuthorizationKey'
import useFirebaseConfig from '@/hooks/useFirebaseConfig'
import useClientName from '@/hooks/useClientName'
import FirebasePreference from '@/types/FirebasePreference'

const BatchPage = ({ params }: any) => {

    const firebasePref: FirebasePreference = {
        authorizationKey: useAuthorizationKey(params.client)!,
        config: useFirebaseConfig(params.client)!
    }

    return (
        <>
            <h4>{useClientName(params.client) + ' (batch)'}</h4>
            <Batch firebasePref={firebasePref} />
        </>
    )
}

export default BatchPage
