import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import FirebaseUtil from '@/util/FirebaseUtil';
import * as process from 'process';
import IrFirebaseConfig from '@/util/IrFirebaseConfig';


export default class FirebaseManager {

    static TAG: string = 'FirebaseManager';

    firebaseApp: any;
    firebaseStorageBucket: any;
    authorizationKey: string = '';

    firebaseUtil = new FirebaseUtil();
    irFirebaseConfig = new IrFirebaseConfig();

    initFirebaseStorageBucket() {

    }

    public clientKey = {
        CHUBB: 'CHUBB',
        DB_LIFE: 'DB_LIFE',
        HANA: 'HANA',
        KB_WIRELESS: 'KB_WIRELESS',
        LINA: 'LINA',
        SHINHAN_CARD: 'SHINHAN_CARD',
        ZILINK: 'ZILINK'
    };

    setAuthorizationKey(key: string) {
        if (key == '') {
            this.authorizationKey = '';

        } else if (key == this.clientKey.CHUBB) {
            this.authorizationKey = process.env.CHUBB_AUTHORIZATION_KEY!;

        } else if (key == this.clientKey.DB_LIFE) {
            this.authorizationKey = process.env.DBLIFE_AUTHORIZATION_KEY!;

        } else if (key == this.clientKey.HANA) {
            this.authorizationKey = process.env.HANA_AUTHORIZATION_KEY!;

        } else if (key == this.clientKey.KB_WIRELESS) {
            this.authorizationKey = process.env.KB_AUTHORIZATION_KEY!;

        } else if (key == this.clientKey.LINA) {
            this.authorizationKey = process.env.LINA_AUTHORIZATION_KEY!;

        } else if (key == this.clientKey.SHINHAN_CARD) {
            this.authorizationKey = process.env.SHINHAN_AUTHORIZATION_KEY!;

        } else if (key == this.clientKey.ZILINK) {
            this.authorizationKey = process.env.ZILINK_AUTHORIZATION_KEY!;

        } else {
            this.authorizationKey = '';
        }
    }


}
