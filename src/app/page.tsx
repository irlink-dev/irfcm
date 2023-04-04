'use client';

import { useForm } from 'react-hook-form';
import * as process from 'process';

export default function Home() {

    const REQUEST_URL = 'https://fcm.googleapis.com/fcm/send';

    const LABEL_STYLE = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white';
    const INPUT_STYLE = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
    const BUTTON_STYLE = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

    const authorization = {
        chubb: process.env.CHUBB_AUTHORIZATION_KEY,
        dblife: process.env.DBLIFE_AUTHORIZATION_KEY,
        hana: process.env.HANA_AUTHORIZATION_KEY,
        kb: process.env.KB_AUTHORIZATION_KEY,
        lina: process.env.LINA_AUTHORIZATION_KEY,
        shinhan: process.env.SHINHAN_AUTHORIZATION_KEY,
        zilink: process.env.ZILINK_AUTHORIZATION_KEY,
    };

    const { register, handleSubmit, watch } = useForm();
    console.log(watch());

    /**
     * 양식이 유효하면 실행.
     */
    const onValid = (data: any, event: any) => {
        const { phoneNumber, type, date, isIncludeRecord, priority, header } = data;
        console.log(phoneNumber, type, date, isIncludeRecord, priority, header);

        request();
    };

    /**
     * 양식이 유효하지 않으면 실행.
     */
    const onInvalid = (data: any, event: any) => {
        console.log(`onInvalid. data: ${data}, event: ${event}`);
    };

    const request = () => {
        const url = REQUEST_URL;
        const promise = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAA3oL10MI:APA91bEkdcwiOspk8hE8wog0yPHD-R4EABywrygMMjJ6Ul0F9pqQZVG7ZAl7U8l4H8oHpft-SyFf-DFuaU-BOSTzRoUXXLftI7aGy_HKQdD0TIFj7TuPi8-vgwpXXemVPb2_0IkT9Xxm'  // LINA_KEY
            },
            body: JSON.stringify({
                'to': 'c-r_h0-jT8C1wnEeJEbVu-:APA91bFVP0S54pTvolWyA9quGHVQNpG7KjC_1C2F7V5Ax2gi3ZysQSedLl9z9GipW66niC5Dx_hnMeLbRZjN-gQdsRjg-W7EmxUcPZHtCRQUph4DRm0TnSJmM0bCaPgJFKAofEzx4pBE',
                'data': {
                    'type': 1,
                    'date': '2023-03-22',
                    'isIncludeRecord': false
                },
                'priority': 'high'
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };


    return (
        <form className="p-4"
              onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="phone_number"
                           className={LABEL_STYLE}>법인폰 번호</label>
                    <input type="tel" id="phone_number"
                           className={INPUT_STYLE}
                           placeholder="법인폰 번호 또는 토큰을 입력하세요"
                           {...register('phoneNumber')}
                           required/> {/* pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" */}
                </div>
                <div>
                    <label htmlFor="type"
                           className={LABEL_STYLE}>요청 타입</label>
                    <input type="number" id="type"
                           className={INPUT_STYLE}
                           placeholder="1"
                           {...register('type')}
                           required/>
                </div>
                <div>
                    <label htmlFor="date"
                           className={LABEL_STYLE}>날짜</label>
                    <input type="text" id="date"
                           className={INPUT_STYLE}
                           placeholder="2023-01-01"
                           {...register('date')}
                           required/>
                </div>
                <div>
                    <label htmlFor="is_include_record"
                           className={LABEL_STYLE}>녹취 포함 여부</label>
                    <input type="text" id="is_include_record"
                           className={INPUT_STYLE}
                           placeholder="false"
                           {...register('isIncludeRecord')}
                           required/>
                </div>
                <div>
                    <label htmlFor="priority"
                           className={LABEL_STYLE}>중요도</label>
                    <input type="text" id="priority"
                           className={INPUT_STYLE}
                           placeholder="high"
                           {...register('priority')}
                           required/>
                </div>
                <div>
                    <label htmlFor="header"
                           className={LABEL_STYLE}>요청 헤더</label>
                    <input type="text" id="header"
                           className={INPUT_STYLE}
                           placeholder=""
                           {...register('header')}
                           required/>
                </div>
            </div>

            <button type="submit"
                    className={BUTTON_STYLE}>FCM 요청
            </button>
        </form>
    );

}
