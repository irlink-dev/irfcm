import 'firebase/compat/storage'
import * as process from 'process'
import IrFirebaseConfig from '@/util/IrFirebaseConfig'


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

    /**
     * 경로를 고객사 키로 변환.
     */
    getClientKeyFromPathname(pathname: 'chubb' | 'dblife' | 'hana' | 'kb' | 'lina' | 'shinhan' | 'zilink') {
        const clientKey = {
            'chubb': this.clientKey.CHUBB,
            'dblife': this.clientKey.DB_LIFE,
            'hana': this.clientKey.HANA,
            'kb': this.clientKey.KB_WIRELESS,
            'lina': this.clientKey.LINA,
            'shinhan': this.clientKey.SHINHAN_CARD,
            'zilink': this.clientKey.ZILINK
        }
        return clientKey[pathname]
    }

}
