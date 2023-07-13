import 'firebase/compat/storage'

export default class FirebaseManager {

    /**
     * 고객사 키.
     */
    public clientKey: Record<string, string> = {
        CHUBB: 'CHUBB',
        DB_LIFE: 'DB_LIFE',
        HANA: 'HANA',
        KB_WIRELESS: 'KB_WIRELESS',
        LINA: 'LINA',
        SHINHAN_CARD: 'SHINHAN_CARD',
        ZILINK: 'ZILINK',
    }

}
