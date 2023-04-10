import firebase from 'firebase/compat/app';

export default class FirebaseUtil {

    TAG: string = 'FirebaseUtil';

    /**
     * 파이어베이스 초기화.
     */
    initFirebaseApp = (firebaseConfig: FirebaseConfig) => {
        console.log(this.TAG, `initFirebaseConfig. projectId: ${firebaseConfig.projectId}`);

        if (firebase.apps.length == 0) {
            firebase.initializeApp(firebaseConfig);                                         // 앱이 존재하지 않으면, 앱을 초기화.
        } else {
            firebase.app().delete().then(() => firebase.initializeApp(firebaseConfig));     // 앱이 존재하면, 삭제하고 다시 초기화.
        }
    };

}

