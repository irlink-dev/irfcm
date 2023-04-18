import GlobalStyle from '@/style/GlobalStyle';

export default function HomePage() {
    return (
        <>
            <div className={GlobalStyle.CONTAINER}>IRFCM 홈.</div>
        </>
    );
}

/**
 * TODO 1. 단일 로그 요청. 로그 파일 다운로드 링크 제공.
 * TODO 2. 법인폰 리스트. 사용 중 여부 체크. 단일 로그 요청 기능과 통합.
 * TODO 3. 주기적 로그 요청 자동화. 어제 것 분석. 앱 재시작, 통화 횟수 등 정보 자동 분석. 대시보드.
 *
 * TODO 4. app/[client]/page.tsx 형태로 통합?
 */
