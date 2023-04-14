export default class GlobalStyle {

    /**
     * 반응형 컨테이너.
     */
    static CONTAINER = 'max-w-screen-xl mx-auto p-4';

    /**
     * 제목.
     */
    static HEADING = 'text-2xl font-semibold leading-none tracking-tight text-gray-900';

    /**
     * 고객사명.
     */
    static CLIENT_NAME = `${GlobalStyle.CONTAINER} ${GlobalStyle.HEADING}`;

    /**
     * 라벨.
     */
    static LABEL = 'block mb-2 text-sm font-medium text-gray-900';

    /**
     * 인풋.
     */
    static INPUT = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5';

    /**
     * SVG 아이콘.
     */
    static SVG = 'w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-600';

    /**
     * 네비게이션 항목.
     */
    static NAV_ITEM = 'flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 group';

    /**
     * 네비게이션 메뉴.
     */
    static NAV_MENU = 'absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700';

}

/**
 * TODO TopFixedNavbar 반응형 컨테이너를 FCMRequestForm 에도 적용.
 */
