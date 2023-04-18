'use client';

import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { get, getDatabase, ref } from 'firebase/database';
import GlobalStyle from '@/style/GlobalStyle';
import FirebaseUtil from '@/util/FirebaseUtil';
import LogUtil from '@/util/LogUtil';
import FcmRequestType from '@/util/FcmRequestType';
import SendFcmUseCase from '@/domain/SendFcmUseCase';

export default function FcmRequestForm({ authorizationKey, firebaseConfig }: Props) {

    const TAG: string = 'FcmRequestForm';

    const firebaseUtil = new FirebaseUtil();
    const sendFcmUseCase = new SendFcmUseCase();


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
    interface Request {
        phoneNumber: string,
        date: string,
        requestType: number,
        isIncludeRecord: boolean,
        priority: string,
    }

    /**
     * 사용자 입력값.
     */
    const [value, setValue] = useState<Request>({
        phoneNumber: '01083184910',
        date: '2023-04-11',
        requestType: FcmRequestType.UPLOAD_LOGS,
        isIncludeRecord: false,
        priority: 'high'
    });

    useEffect(() => {
        firebaseUtil.initFirebaseApp(firebaseConfig);
    }, []);

    /**
     * React Hook Form.
     */
    const { register, handleSubmit, watch } = useForm();

    /**
     * 양식이 유효하면 실행.
     */
    function onValid(data: FieldValues, event: React.BaseSyntheticEvent | undefined) {
        // TODO phoneNumber input 정규식, 숫자 11자리만 사용.
        // TODO date input 정규식, 숫자 8자리만 가져와서 YYYY-MM-DD 형태로 변경.

        const {
            phoneNumber,                // 법인폰 번호.
            date,                       // 날짜.
            requestType,                // 요청 타입.
            isIncludeRecord,            // 녹취 포함 여부.
            priority                    // 중요도.
        } = data;                       // 사용자 입력 데이터.

        getFirebaseToken(phoneNumber)
            .then((token) => {
                LogUtil.d(TAG, `getFirebaseToken. token: ${token}`);

                const request = {
                    authorizationKey: authorizationKey,
                    token: token,
                    date: date,
                    requestType: requestType,
                    isIncludeRecord: isIncludeRecord,
                    priority: priority
                };
                sendFcmUseCase.request(request, (response) => {
                    response.task({
                        onSuccess: () => LogUtil.d(TAG, response.message!),
                        onFail: () => LogUtil.d(TAG, response.message!)
                    });
                });
            })
            .catch((error) => {
                LogUtil.exception(TAG, error);
            });
    }

    /**
     * 양식이 유효하지 않으면 실행.
     */
    function onInvalid(data: FieldValues, event: React.BaseSyntheticEvent | undefined) {
        // TODO onValid, onInvalid 함수 event param type undefined 삭제 가능 ?
        LogUtil.d(TAG, `onInvalid. data: ${data}, event: ${event}`);
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

    return (
        <form className={GlobalStyle.CONTAINER}
              onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label htmlFor="phone_number"
                           className={GlobalStyle.LABEL}>법인폰 번호</label>
                    <input type="tel" id="phone_number"
                           className={GlobalStyle.INPUT}
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
                           className={GlobalStyle.LABEL}>날짜</label>
                    <input type="text" id="date"
                           className={GlobalStyle.INPUT}
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
                    <label htmlFor="requestType"
                           className={GlobalStyle.LABEL}>요청 타입</label>
                    <select id="requestType"
                            className={GlobalStyle.INPUT}
                            {...register('requestType')}
                            defaultValue={value.requestType}
                            onChange={event => setValue(prevState => ({
                                ...prevState,
                                requestType: Number(event.target.value),
                            }))}>
                        <option value={FcmRequestType.UPLOAD_LOGS}>[1] 로그</option>
                        <option value={FcmRequestType.UPLOAD_FILE_LIST}>[2] 파일 리스트</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="is_include_record"
                           className={GlobalStyle.LABEL}>녹취 포함 여부</label>
                    <select id="is_include_record"
                            className={GlobalStyle.INPUT}
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
                           className={GlobalStyle.LABEL}>중요도</label>
                    <select id="priority"
                            className={GlobalStyle.INPUT}
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
                        onClick={() => {
                            console.log(watch());
                            // console.log(firebaseConfig);
                        }}>
                    테스트 버튼
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

interface Props {

    /**
     * 인증 키.
     */
    authorizationKey: string,

    /**
     * 파이어베이스 설정.
     */
    firebaseConfig: FirebaseConfig

}
