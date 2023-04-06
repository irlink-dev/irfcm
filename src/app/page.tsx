'use client';

import { FieldValues, useForm } from 'react-hook-form';
import * as process from 'process';
import React, { useState } from 'react';

export default function Home() {

    /**
     * 요청 URL.
     */
    const REQUEST_URL = 'https://fcm.googleapis.com/fcm/send';

    /**
     * 스타일
     */
    const style = {
        LABEL_STYLE: 'block mb-2 text-sm font-medium text-gray-900 dark:text-white',
        INPUT_STYLE: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
        BUTTON_STYLE: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        SELECT_STYLE: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    };

    /**
     * 요청 타입.
     */
    const requestType = {
        UPLOAD_LOGS: 1,
        UPLOAD_FILE_LIST: 2,
        FORCE_CONVERT_FILE: 3,
        ENABLE_BLOCK_WINDOW: 200,
        DISABLE_BLOCK_WINDOW: 201
    };

    /**
     * 요청 헤더.
     */
    const authorization = {
        CHUBB: process.env.CHUBB_AUTHORIZATION_KEY,
        DBLIFE: process.env.DBLIFE_AUTHORIZATION_KEY,
        HANA: process.env.HANA_AUTHORIZATION_KEY,
        KB: process.env.KB_AUTHORIZATION_KEY,
        LINA: process.env.LINA_AUTHORIZATION_KEY,
        SHINHAN: process.env.SHINHAN_AUTHORIZATION_KEY,
        ZILINK: process.env.ZILINK_AUTHORIZATION_KEY,
    };

    /**
     * 중요도.
     */
    const priority = {
        HIGH: 'high'
    };

    /**
     * 녹취 포함 여부.
     */
    const isIncludeRecord = {
        TRUE: 'true',
        FALSE: 'false'
    };

    /**
     * 요청 타입.
     */
    type Request = {
        header: string | undefined,
        phoneNumber: string,
        date: string,
        type: number,
        isIncludeRecord: boolean,
        priority: string,
    }

    /**
     * 사용자 입력값 상태 관리.
     */
    const [value, setValue] = useState<Request>({
        header: '',
        phoneNumber: 'c-r_h0-jT8C1wnEeJEbVu-:APA91bFVP0S54pTvolWyA9quGHVQNpG7KjC_1C2F7V5Ax2gi3ZysQSedLl9z9GipW66niC5Dx_hnMeLbRZjN-gQdsRjg-W7EmxUcPZHtCRQUph4DRm0TnSJmM0bCaPgJFKAofEzx4pBE',
        date: '2023-03-22',
        type: requestType.UPLOAD_LOGS,
        isIncludeRecord: false,
        priority: 'high'
    });

    /**
     * React Hook Form.
     */
    const { register, handleSubmit, watch } = useForm();

    /**
     * 양식이 유효하면 실행.
     */
    const onValid = (data: FieldValues, event: React.BaseSyntheticEvent | undefined) => {
        // console.log(`onValid. data: ${data}, event: ${event}`);
        request(value);  // Value, Request 타입은 동일함.
    };

    /**
     * 양식이 유효하지 않으면 실행.
     */
    const onInvalid = (data: FieldValues, event: React.BaseSyntheticEvent | undefined) => {
        // console.log(`onInvalid. data: ${data}, event: ${event}`);
    };

    const request = (request: Request) => {
        const { header, phoneNumber, date, type, isIncludeRecord, priority } = request;

        const url = REQUEST_URL;
        const promise = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(header)
            },
            body: JSON.stringify({
                'to': String(phoneNumber),
                'data': {
                    'type': Number(type),
                    'date': String(date),
                    'isIncludeRecord': Boolean(isIncludeRecord)
                },
                'priority': String(priority)
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };


    return (
        <form className="p-4 max-w-3xl"
              onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label htmlFor="header"
                           className={style.LABEL_STYLE}>요청 헤더</label>
                    <select id="header"
                            className={style.SELECT_STYLE}
                            {...register('header')}
                            defaultValue={value.header}
                            onChange={event => setValue(prevState => ({
                                ...prevState,
                                header: event.target.value,
                            }))}>
                        <option value={''}>헤더를 선택하세요</option>
                        <option value={authorization.CHUBB}>처브</option>
                        <option value={authorization.DBLIFE}>DB 생명</option>
                        <option value={authorization.HANA}>하나손보</option>
                        <option value={authorization.KB}>KB</option>
                        <option value={authorization.LINA}>라이나</option>
                        <option value={authorization.SHINHAN}>신한카드</option>
                        <option value={authorization.ZILINK}>지링크</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="phone_number"
                           className={style.LABEL_STYLE}>법인폰 번호</label>
                    <input type="tel" id="phone_number"
                           className={style.INPUT_STYLE}
                           placeholder="법인폰 번호 또는 토큰을 입력하세요"
                           {...register('phoneNumber')}
                           defaultValue={value.phoneNumber}
                           onChange={event => setValue(prevState => ({
                               ...prevState,
                               phoneNumber: event.target.value,
                           }))}
                           required /> {/* pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" */}
                </div>
                <div>
                    <label htmlFor="date"
                           className={style.LABEL_STYLE}>날짜</label>
                    <input type="text" id="date"
                           className={style.INPUT_STYLE}
                           placeholder="YYYY-MM-DD 형태로 날짜를 입력하세요"
                           {...register('date')}
                           defaultValue={value.date}
                           onChange={event => setValue(prevState => ({
                               ...prevState,
                               date: event.target.value,
                           }))}
                           required />
                </div>
                <div>
                    <label htmlFor="type"
                           className={style.LABEL_STYLE}>요청 타입</label>
                    <select id="type"
                            className={style.SELECT_STYLE}
                            {...register('type')}
                            defaultValue={value.type}
                            onChange={event => setValue(prevState => ({
                                ...prevState,
                                type: Number(event.target.value),
                            }))}>
                        <option value={requestType.UPLOAD_LOGS}>[1] 로그</option>
                        <option value={requestType.UPLOAD_FILE_LIST}>[2] 파일 리스트</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="is_include_record"
                           className={style.LABEL_STYLE}>녹취 포함 여부</label>
                    <select id="is_include_record"
                            className={style.SELECT_STYLE}
                            {...register('isIncludeRecord')}
                            defaultValue={value.isIncludeRecord ? isIncludeRecord.TRUE : isIncludeRecord.FALSE}
                            onChange={event => setValue(prevState => ({
                                ...prevState,
                                isIncludeRecord: event.target.value == isIncludeRecord.TRUE,
                            }))}>
                        <option value={isIncludeRecord.FALSE}>false</option>
                        <option value={isIncludeRecord.TRUE}>true</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="priority"
                           className={style.LABEL_STYLE}>중요도</label>
                    <select id="type"
                            className={style.SELECT_STYLE}
                            {...register('priority')}
                            defaultValue={value.priority}
                            onChange={event => setValue(prevState => ({
                                ...prevState,
                                priority: event.target.value,
                            }))}>
                        <option value={priority.HIGH}>높음</option>
                    </select>
                </div>
            </div>

            <button type="submit"
                    className={style.BUTTON_STYLE}>FCM 요청
            </button>

            <br />
            <br />

            <button onClick={event => {
                event.preventDefault();
                console.log(value);
            }}
                    className={style.BUTTON_STYLE}>VALUE 조회
            </button>
        </form>
    );

}
