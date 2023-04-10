import * as process from 'process';
import FcmRequestForm from '@/component/FcmRequestForm';

export default function LinaPage() {
    return <FcmRequestForm authorizationKey={process.env.LINA_AUTHORIZATION_KEY!} />;
}

export async function getServerSideProps(): Promise<{ props: { authorizationKey: string } }> {
    const authorizationKey = process.env.LINA_AUTHORIZATION_KEY!;
    return { props: { authorizationKey } };
}
