export default function SelectHeaderDropdown(props: any) {

    const ITEM_STYLE = 'flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600';
    const INPUT_STYLE = 'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500';
    const LABEL_STYLE = 'w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300';


    /**
     * 사이트 종류 선택 시.
     */
    const onSelect = () => {
        props.setHeader();
    };

    /**
     * 드롭다운 항목.
     */
    const DropdownItem = (props: any) => {
        return (
            <li>
                <div className={ITEM_STYLE}>
                    <input id={`default-radio-${props.id}`} type="radio" value="" name="default-radio"
                           className={INPUT_STYLE} />
                    <label htmlFor={`default-radio-${props.id}`}
                           className={LABEL_STYLE}>{props.text}</label>
                </div>
            </li>
        );
    };

    /**
     * 드롭다운 화살표.
     */
    const DropdownArrow = () => {
        return (
            <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                 stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        );
    };


    return (
        <>
            <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">사이트 종류 <DropdownArrow /></button>

            <div id="dropdownRadioBgHover"
                 className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">

                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownRadioBgHoverButton">
                    <DropdownItem id={4} text="지링크" />
                    <DropdownItem id={5} text="라이나" />
                    <DropdownItem id={6} text="DB 생명" />
                </ul>
            </div>
        </>
    );
}
