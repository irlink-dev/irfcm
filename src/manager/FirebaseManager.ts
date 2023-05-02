import 'firebase/compat/storage'
import * as process from 'process'
import IrFirebaseConfig from '@/util/IrFirebaseConfig'


export default class FirebaseManager {

    irFirebaseConfig = new IrFirebaseConfig()

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

    /**
     * 인증 키 반환.
     */
    getAuthorizationKey(clientKey: string) {
        type AuthorizationKey = {
            [key: string]: string
        }
        const authorizationKey: AuthorizationKey = {
            'CHUBB': process.env.CHUBB_AUTHORIZATION_KEY!,
            'DB_LIFE': process.env.DBLIFE_AUTHORIZATION_KEY!,
            'HANA': process.env.HANA_AUTHORIZATION_KEY!,
            'KB_WIRELESS': process.env.KB_AUTHORIZATION_KEY!,
            'LINA': process.env.LINA_AUTHORIZATION_KEY!,
            'SHINHAN_CARD': process.env.SHINHAN_AUTHORIZATION_KEY!,
            'ZILINK': process.env.ZILINK_AUTHORIZATION_KEY!
        }
        return authorizationKey[clientKey]
    }

}
