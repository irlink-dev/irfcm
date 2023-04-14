import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';
import GlobalStyle from '@/style/GlobalStyle';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';

export default function ChubbPage() {

    const irFirebaseConfig = new IrFirebaseConfig();

    return (
        <>
            <h1 className={GlobalStyle.CLIENT_NAME}>처브 CDM</h1>

            <FcmRequestForm authorizationKey={process.env.CHUBB_AUTHORIZATION_KEY!}
                            firebaseConfig={irFirebaseConfig.CHUBB_FIREBASE_CONFIG} />
        </>
    );
}
