import IrFirebaseConfig from '@/util/IrFirebaseConfig'
import FirebaseManager from '@/manager/FirebaseManager'
import FcmRequestForm from '@/component/FcmRequestForm'

export default function ClientPage({ params }: any) {

    const irFirebaseConfig = new IrFirebaseConfig()
    const firebaseManager = new FirebaseManager()

    const clientKey = firebaseManager.getClientKeyFromPathname(params.client)
    const firebaseConfig = irFirebaseConfig.getFirebaseConfig(clientKey)
    const authorizationKey = firebaseManager.getAuthorizationKey(clientKey)

    type ClientName = {
        [key: string]: string
    }
    const clientName: ClientName = {
        CHUBB: '처브 CDM',
        DB_LIFE: 'DB 생명',
        HANA: '하나손해보험',
        KB_WIRELESS: 'KB 손해보험',
        LINA: '라이나 생명',
        SHINHAN_CARD: '신한카드',
        ZILINK: '지링크',
    }

    return (
        <>
            <h4>{clientName[clientKey]}</h4>

            <FcmRequestForm
                authorizationKey={authorizationKey!}
                firebaseConfig={firebaseConfig!} />
        </>
    )
}
