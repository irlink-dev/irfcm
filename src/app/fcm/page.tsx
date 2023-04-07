'use client';

import { FieldValues, useForm } from 'react-hook-form';
import * as process from 'process';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { get, getDatabase, ref } from 'firebase/database';

export default function Home() {

    /**
     * 요청 URL.
     */
    const FCM_REQUEST_URL = 'https://fcm.googleapis.com/fcm/send';

    /**
     * 스타일
     */
    const style = {
        LABEL_STYLE: 'block mb-2 text-sm font-medium text-gray-900',
        INPUT_STYLE: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
        SELECT_STYLE: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
        requestType: number,
        isIncludeRecord: boolean,
        priority: string,
    }

    /**
     * 사용자 입력값 상태 관리.
     */
    const [value, setValue] = useState<Request>({
        header: process.env.LINA_AUTHORIZATION_KEY,
        phoneNumber: '01068910357',
        date: '2023-03-22',
        requestType: requestType.UPLOAD_LOGS,
        isIncludeRecord: false,
        priority: 'high'
    });

    useEffect(() => {
        const LINA_FIREBASE_CONFIG = {
            apiKey: 'AIzaSyAIgiF-5eSILWW1p-7HkonqRo2_wT236Zc',
            authDomain: 'irlink-lina.firebaseapp.com',
            databaseURL: 'https://irlink-lina.firebaseio.com',
            projectId: 'irlink-lina',
            storageBucket: 'irlink-lina.appspot.com',
            messagingSenderId: '955679887554',
            appId: '1:955679887554:web:49da0d417e08fcd3201f25'
        };
        if (firebase.apps.length === 0) {
            firebase.initializeApp(LINA_FIREBASE_CONFIG);
        }
    }, [value.header]);

    /**
     * React Hook Form.
     */
    const { register, handleSubmit, watch } = useForm();

    /**
     * 양식이 유효하면 실행.
     */
    const onValid = (data: FieldValues, event: React.BaseSyntheticEvent | undefined) => {
        // TODO phoneNumber 대쉬(-) 제외하고 숫자 11자리만 사용하는 로직 추가.

        const { phoneNumber } = data;

        getFirebaseToken(phoneNumber)
            .then((token) => {
                request(data, token);
            })
            .catch((error) => {
                console.log('getFirebaseToken. error:', error);
            });
    };

    /**
     * 양식이 유효하지 않으면 실행.
     */
    const onInvalid = (data: FieldValues, event: React.BaseSyntheticEvent | undefined) => {
        // console.log(`onInvalid. data: ${data}, event: ${event}`);
    };

    const request = (request: FieldValues, token: string) => {
        const { header, date, requestType, isIncludeRecord, priority } = request;

        const promise = fetch(FCM_REQUEST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': String(header)
            },
            body: JSON.stringify({
                'to': String(token),
                'data': {
                    'type': Number(requestType),
                    'date': String(date),
                    'isIncludeRecord': Boolean(isIncludeRecord)
                },
                'priority': String(priority)
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == 1) {
                    onSuccess();
                }
                if (data.failure == 1) {
                    onFailure();
                }
            })
            .catch(error => console.error(error));
    };

    /**
     * FCM 정상 응답 시.
     */
    const onSuccess = () => {
        console.log('FCM 전송 성공.');
    };

    /**
     * FCM 응답 실패 시.
     */
    const onFailure = () => {
        console.log('잘못된 요청이거나, 앱이 실행 중이지 않습니다.');
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
                           placeholder="법인폰 번호를 입력하세요"
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
                            defaultValue={value.requestType}
                            onChange={event => setValue(prevState => ({
                                ...prevState,
                                requestType: Number(event.target.value),
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
                    <select id="priority"
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

            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-l-lg
                        hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                        onClick={() => console.log(watch())}>
                    요청값 조회
                </button>
                {/*<button type="button"*/}
                {/*        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200
                           hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">*/}
                {/*    Settings*/}
                {/*</button>*/}
                <button type="submit"
                        className="px-4 py-2 text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-r-md
                        hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                    FCM 요청
                </button>
            </div>

        </form>
    );

}

/**
 * 법인폰 번호로 파이어베이스 토큰 조회.
 * @param phoneNumber 법인폰 번호.
 */
async function getFirebaseToken(phoneNumber: string) {
    const database = getDatabase();
    const snapshot = await get(ref(database, `users/${phoneNumber}`));
    return snapshot.val();
}
