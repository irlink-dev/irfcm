const RootPage = () => {
  return <></>
}

export default RootPage

/**
 * TODO LIST
 *
 * * FCM Request Type 에 따른 분기 처리.
 * > UPLOAD_LOGS, UPLOAD_FILE_LIST 는 POST 후 자동으로 다운로드 링크 GET.
 * > FORCE_CONVERT_FILE, ENABLE_BLOCK_WINDOW 등은 POST 만.
 *
 * * TEST CASE 만들기.
 * > 리팩토링 이후 기능들이 정상 동작하는지 쉽게 확인하도록 테스트 케이스, 테스트 번호 리스트 등 정리하기.
 * > 검증 페이지를 따로 만들어, 버튼 하나만 누르면 위 모든 동작을 자동으로 수행하는 페이지 만들기.
 */
