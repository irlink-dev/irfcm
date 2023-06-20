/**
 * 파이어베이스 환경설정.
 */
export interface FirebaseConfig {

    /**
     * API 키.
     */
    apiKey: string,

    /**
     * 인증 도메인.
     */
    authDomain: string,

    /**
     * DB 주소.
     */
    databaseURL?: string,

    /**
     * 프로젝트 아이디.
     */
    projectId: string,

    /**
     * 저장소 버킷.
     */
    storageBucket: string,

    /**
     * 메시지 센더 아이디.
     */
    messagingSenderId?: string,

    /**
     * 앱 아이디.
     */
    appId: string,

    /**
     * 고유 식별자.
     */
    measurementId?: string,

}

/**
 * FCM 요청 양식 Props
 */
export interface FcmRequestFormProps {

    /**
     * 인증 키.
     */
    authorizationKey: string

    /**
     * 파이어베이스 설정.
     */
    firebaseConfig: FirebaseConfig

}

export interface RequestValues {

    /**
     * 법인폰 번호.
     */
    phoneNumber: string

    /**
     * 날짜.
     */
    date: string

    /**
     * 요청 타입.
     */
    type: number

    /**
     * 녹취 포함 여부.
     */
    isIncludeRecord: boolean

}
