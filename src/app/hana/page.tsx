import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';
import GlobalStyle from '@/style/GlobalStyle';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';

export default function HanaPage() {

    const irFirebaseConfig = new IrFirebaseConfig();

    return (
        <>
            <h1 className={GlobalStyle.CLIENT_NAME}>하나손해보험</h1>

            <FcmRequestForm authorizationKey={process.env.HANA_AUTHORIZATION_KEY!}
                            firebaseConfig={irFirebaseConfig.HANA_FIREBASE_CONFIG} />
        </>
    );
}
