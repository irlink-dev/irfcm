'use client';

import GlobalStyle from '@/style/GlobalStyle';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProgressSpinner from '@/component/ProgressSpinner';

export default function HomePage() {

    const [client, setClient] = useState<string>('');

    function ClientListRow({ name, route }: any) {

        const router = useRouter();

        return (
            <button
                className="flex justify-between w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                onClick={() => {
                    router.push(route);
                    setClient(() => route);
                }}>{name}
                {client == route ? <ProgressSpinner /> : null}
            </button>
        );
    }

    return (
        <section className={GlobalStyle.CONTAINER}>
            <h1>IRFCM 홈.</h1>
            <br />

            <div
                className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                <ClientListRow name="라이나 생명" route="/lina" />
                <ClientListRow name="처브 CDM" route="/chubb" />
                <ClientListRow name="DB 생명" route="/dblife" />
            </div>
        </section>
    );
}

/**
 * TODO 1. 단일 로그 요청. 로그 파일 다운로드 링크 제공.
 * TODO 2. 법인폰 리스트. 사용 중 여부 체크. 단일 로그 요청 기능과 통합.
 * TODO 3. 주기적 로그 요청 자동화. 어제 것 분석. 앱 재시작, 통화 횟수 등 정보 자동 분석. 대시보드.
 *
 * TODO 4. app/[client]/page.tsx 형태로 통합 ?
 */
