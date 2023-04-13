export default class GlobalStyle {

    /**
     * 사이트명. (제목)
     */
    static HEADING = 'p-4 text-2xl font-semibold leading-none tracking-tight text-gray-900';

    /**
     * Fcm 요청 양식.
     */
    fcmRequestForm = {
        LABEL: 'block mb-2 text-sm font-medium text-gray-900',
        INPUT: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
        SELECT: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
    };

    /**
     * 상단 네비게이션 바.
     */
    topFixedNavbar = {
        SVG: 'w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500',
        SITE: 'flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group',
        DROPDOWN_MENU: 'absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700',
    };

}

/**
 * TODO TopFixedNavbar 반응형 컨테이너를 FCMRequestForm 에도 적용.
 */
