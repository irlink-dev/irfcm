import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';
import GlobalStyle from '@/style/GlobalStyle';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';

export default function LinaPage() {

    const irFirebaseConfig = new IrFirebaseConfig();

    return (
        <>
            <h1 className={GlobalStyle.CLIENT_NAME}>라이나 생명</h1>

            <FcmRequestForm authorizationKey={process.env.LINA_AUTHORIZATION_KEY!}
                            firebaseConfig={irFirebaseConfig.LINA_FIREBASE_CONFIG} />
        </>
    );
}
