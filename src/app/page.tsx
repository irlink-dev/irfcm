'use client';

import GlobalStyle from '@/style/GlobalStyle';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
                {client == route ? <Spinner /> : null}
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


function Spinner() {

    return (
        <div role="status">
            <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

/**
 * TODO 1. 단일 로그 요청. 로그 파일 다운로드 링크 제공.
 * TODO 2. 법인폰 리스트. 사용 중 여부 체크. 단일 로그 요청 기능과 통합.
 * TODO 3. 주기적 로그 요청 자동화. 어제 것 분석. 앱 재시작, 통화 횟수 등 정보 자동 분석. 대시보드.
 *
 * TODO 4. app/[client]/page.tsx 형태로 통합 ?
 */
