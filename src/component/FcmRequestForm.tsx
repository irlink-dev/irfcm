'use client';

import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { get, getDatabase, ref } from 'firebase/database';
import 'firebase/compat/storage';
import GlobalStyle from '@/style/GlobalStyle';
import FirebaseUtil from '@/util/FirebaseUtil';
import LogUtil from '@/util/LogUtil';
import FcmRequestType from '@/util/FcmRequestType';
import SendFcmUseCase from '@/domain/SendFcmUseCase';
import FormatUtil from '@/util/FormatUtil';

export default function FcmRequestForm({ authorizationKey, firebaseConfig }: Props) {

    const TAG: string = 'FcmRequestForm';

    const firebaseUtil = new FirebaseUtil();
    const sendFcmUseCase = new SendFcmUseCase();


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
        // priority: string,
    }

    /**
     * 사용자 입력값.
     */
    const [value, setValue] = useState<Request>({
        phoneNumber: '',
        date: '',
        requestType: FcmRequestType.UPLOAD_LOGS,
        isIncludeRecord: false,
        // priority: 'high'
    });

    /**
     * 파이어베이스 스토리지 버킷.
     */
    const [bucket, setBucket] = useState<any>();

    /**
     * 스토리지 파일 다운로드 링크.
     */
    const [urls, setUrls] = useState<Array<string>>([]);

    /**
     * 사용자 알림 메시지.
     */
    const [message, setMessage] = useState<string>('');


    useEffect(() => {
        const app = firebaseUtil.initFirebaseApp(firebaseConfig);
        const bucketName = firebaseConfig?.storageBucket;
        setBucket(() => app.storage().refFromURL(`gs://${bucketName}`));
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
            // priority                    // 중요도.
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
                    priority: 'high'
                };
                sendFcmUseCase.request(request, (response) => {
                    response.task({
                        onSuccess: () => {
                            LogUtil.d(TAG, response.message!);
                            setMessage(() => response.message!);
                            setTimeout(() => {
                                firebaseUtil.getLogDownloadLinks(phoneNumber, date, bucket)
                                    .then(urls => setUrls(urls));
                            }, 3000);   // 로그가 올라올 때까지 대기.
                        },
                        onFail: () => {
                            LogUtil.d(TAG, response.message!);
                            setMessage(() => response.message!);
                        }
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
            <div className="grid gap-6 mb-6 md:grid-cols-4">
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
                {/*<div>*/}
                {/*    <label htmlFor="priority"*/}
                {/*           className={GlobalStyle.LABEL}>중요도</label>*/}
                {/*    <select id="priority"*/}
                {/*            className={GlobalStyle.INPUT}*/}
                {/*            {...register('priority')}*/}
                {/*            defaultValue={value.priority}*/}
                {/*            onChange={event => setValue(prevState => ({*/}
                {/*                ...prevState,*/}
                {/*                priority: event.target.value,*/}
                {/*            }))}>*/}
                {/*        <option value={priority.HIGH}>높음</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
            </div>

            <div className="flex">
                <div className="inline-flex rounded-md shadow-sm mb-4 mr-4" role="group">
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

                {message.length == 0 ? '' : message.length < 16 ? (
                    <span className='text-green-600 font-semibold'>{message}</span>
                ) : (
                    <span className='text-red-500 font-semibold'>{message}</span>
                )}
            </div>


            <div className="bg-white py-5">
                {/*<dt className="text-sm font-medium text-gray-500">저장소 파일</dt>*/}
                {urls.length > 0 ? (
                    <dd className="mt-1 text-sm text-gray-900">
                        <ul
                            role="list"
                            className="divide-y divide-gray-200 rounded-md border border-gray-200"
                        >
                            {urls.map(url => (
                                <FileListRow key={url} url={url} />
                            ))}
                        </ul>
                    </dd>
                ) : null}
            </div>

        </form>
    );

}

function FileListRow({ url }: any) {

    const formatUtil = new FormatUtil();
    const fileName = formatUtil.extractFileNameFromUrl(url);

    return (
        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
            <div className="flex w-0 flex-1 items-center">
                <span className="ml-2 w-0 flex-1 truncate">{fileName}</span>
            </div>
            <div className="ml-4 flex-shrink-0">
                <a href={url}
                   className="font-medium text-indigo-600 hover:text-indigo-500">다운로드
                </a>
            </div>
        </li>
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
