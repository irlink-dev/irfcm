import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';
import GlobalStyle from '@/style/GlobalStyle';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';

export default function KBPage() {

    const irFirebaseConfig = new IrFirebaseConfig();

    return (
        <>
            <h1 className={GlobalStyle.CLIENT_NAME}>KB 손해보험</h1>

            <FcmRequestForm authorizationKey={process.env.KB_AUTHORIZATION_KEY!}
                            firebaseConfig={irFirebaseConfig.KB_WIRELESS_FIREBASE_CONFIG} />
        </>
    );
}
