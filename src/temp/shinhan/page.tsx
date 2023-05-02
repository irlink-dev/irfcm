import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';
import GlobalStyle from '@/style/GlobalStyle';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';

export default function ShinhanPage() {

    const irFirebaseConfig = new IrFirebaseConfig();

    return (
        <>
            <h1 className={GlobalStyle.CLIENT_NAME}>신한카드</h1>

            <FcmRequestForm authorizationKey={process.env.SHINHAN_AUTHORIZATION_KEY!}
                            firebaseConfig={irFirebaseConfig.SHINHAN_CARD_FIREBASE_CONFIG} />
        </>
    );
}
