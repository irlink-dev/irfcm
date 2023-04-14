import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';
import GlobalStyle from '@/style/GlobalStyle';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';

export default function DBLifePage() {

    const irFirebaseConfig = new IrFirebaseConfig();

    return (
        <>
            <h1 className={GlobalStyle.CLIENT_NAME}>DB 생명</h1>

            <FcmRequestForm authorizationKey={process.env.DBLIFE_AUTHORIZATION_KEY!}
                            firebaseConfig={irFirebaseConfig.DB_LIFE_FIREBASE_CONFIG} />
        </>
    );
}
