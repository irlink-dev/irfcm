import process from 'process'
import Pathname from '@/types/Pathname'
import { Client, ClientType } from '@/utils/constant'

const useFirebaseConfig = (client: ClientType) => {
  /**
   * AIA 생명.
   */
  const AIA_LIFE_FIREBASE_CONFIG = {
    apiKey: process.env.AIA_LIFE_API_KEY!,
    authDomain: 'aia-life-7d127.firebaseapp.com',
    databaseURL: 'https://aia-life-7d127-default-rtdb.firebaseio.com',
    projectId: 'aia-life-7d127',
    storageBucket: 'aia-life-7d127.appspot.com',
    appId: process.env.AIA_LIFE_APP_ID!,
  }

  /**
   * 셀러링.
   */
  const CELERING_FIREBASE_CONFIG = {}

  /**
   * 셀러링 라이나.
   */
  const CELERING_LINA_FIREBASE_CONFIG = {}

  /**
   * 처브 CDM.
   */
  const CHUBB_FIREBASE_CONFIG = {
    apiKey: process.env.CHUBB_API_KEY!,
    authDomain: 'irlink-chubb.firebaseapp.com',
    projectId: 'irlink-chubb',
    storageBucket: 'irlink-chubb.appspot.com',
    messagingSenderId: process.env.CHUBB_MESSAGING_SENDER_ID!,
    appId: process.env.CHUBB_APP_ID!,
    measurementId: process.env.CHUBB_MEASUREMENT_ID!,
  }

  /**
   * CJ O 쇼핑.
   */
  const CJ_O_SHOPPING_FIREBASE_CONFIG = {
    apiKey: process.env.CJ_O_SHOPPING_API_KEY!,
    authDomain: 'cjo-shopping.firebaseapp.com',
    databaseURL: 'https://cjo-shopping-default-rtdb.firebaseio.com',
    projectId: 'cjo-shopping',
    storageBucket: 'cjo-shopping.appspot.com',
    messagingSenderId: process.env.CJ_O_SHOPPING_MESSAGING_SENDER_ID!,
    appId: process.env.CJ_O_SHOPPING_APP_ID!,
    measurementId: process.env.CJ_O_SHOPPING_MEASUREMENT_ID!,
  }

  /**
   * DB 생명.
   */
  const DB_LIFE_FIREBASE_CONFIG = {
    apiKey: process.env.DB_LIFE_API_KEY!,
    authDomain: 'db-life.firebaseapp.com',
    databaseURL: 'https://db-life.firebaseio.com',
    projectId: 'db-life',
    storageBucket: 'db-life.appspot.com',
    messagingSenderId: process.env.DB_LIFE_MESSAGING_SENDER_ID!,
    appId: process.env.DB_LIFE_APP_ID!,
  }

  /**
   * GS 샵.
   */
  const GS_SHOP_FIREBASE_CONFIG = {
    apiKey: process.env.GS_SHOP_API_KEY!,
    authDomain: 'gs-shop-9b944.firebaseapp.com',
    databaseURL: 'https://gs-shop-9b944-default-rtdb.firebaseio.com',
    projectId: 'gs-shop-9b944',
    storageBucket: 'gs-shop-9b944.appspot.com',
    messagingSenderId: process.env.GS_SHOP_MEASUREMENT_ID!,
    appId: process.env.GS_SHOP_APP_ID!,
  }

  /**
   * 하나손해보험.
   */
  const HANA_FIREBASE_CONFIG = {
    apiKey: process.env.HANA_API_KEY!,
    authDomain: 'hana-6d9ee.firebaseapp.com',
    projectId: 'hana-6d9ee',
    storageBucket: 'hana-6d9ee.appspot.com',
    messagingSenderId: process.env.HANA_MESSAGING_SENDER_ID!,
    appId: process.env.HANA_APP_ID!,
  }

  /**
   * 현대해상.
   */
  const HYUNDAI_FIREBASE_CONFIG = {
    apiKey: process.env.HYUNDAI_API_KEY!,
    authDomain: 'hyundai-8df86.firebaseapp.com',
    databaseURL: 'https://hyundai-8df86-default-rtdb.firebaseio.com',
    projectId: 'hyundai-8df86',
    storageBucket: 'hyundai-8df86.appspot.com',
    messagingSenderId: process.env.HYUNDAI_MESSAGING_SENDER_ID!,
    appId: process.env.HYUNDAI_APP_ID!,
    measurementId: process.env.HYUNDAI_MEASUREMENT_ID!,
  }

  /**
   * KB 손보.
   */
  const KB_WIRELESS_FIREBASE_CONFIG = {
    apiKey: process.env.KB_WIRELESS_API_KEY!,
    authDomain: 'irlink-kb.firebaseapp.com',
    databaseURL: 'https://irlink-kb.firebaseio.com',
    projectId: 'irlink-kb',
    storageBucket: 'irlink-kb.appspot.com',
    messagingSenderId: process.env.KB_WIRELESS_MESSAGING_SENDER_ID!,
    appId: process.env.KB_WIRELESS_APP_ID!,
    measurementId: process.env.KB_WIRELESS_MEASUREMENT_ID!,
  }

  /**
   * 라이나 생명.
   */
  const LINA_FIREBASE_CONFIG = {
    apiKey: process.env.LINA_API_KEY!,
    authDomain: 'irlink-lina.firebaseapp.com',
    databaseURL: 'https://irlink-lina.firebaseio.com',
    projectId: 'irlink-lina',
    storageBucket: 'irlink-lina.appspot.com',
    messagingSenderId: process.env.LINA_MESSAGING_SENDER_ID!,
    appId: process.env.LINA_APP_ID!,
  }

  /**
   * 롯데 홈쇼핑.
   */
  const LOTTE_HOME_SHOPPING_FIREBASE_CONFIG = {
    apiKey: process.env.LOTTE_HOME_SHOPPING_API_KEY!,
    authDomain: 'lotte-homeshopping.firebaseapp.com',
    databaseURL: 'https://lotte-homeshopping-default-rtdb.firebaseio.com',
    projectId: 'lotte-homeshopping',
    storageBucket: 'lotte-homeshopping.appspot.com',
    messagingSenderId: process.env.LOTTE_HOME_SHOPPING_MESSAGING_SENDER_ID!,
    appId: process.env.LOTTE_HOME_SHOPPING_APP_ID!,
  }

  /**
   * 엘 포인트.
   */
  const L_POINT_FIREBASE_CONFIG = {
    apiKey: process.env.L_POINT_API_KEY!,
    authDomain: 'l-point.firebaseapp.com',
    databaseURL: 'https://l-point-default-rtdb.firebaseio.com',
    projectId: 'l-point',
    storageBucket: 'l-point.appspot.com',
    messagingSenderId: process.env.L_POINT_MESSAGING_SENDER_ID!,
    appId: process.env.L_POINT_APP_ID!,
  }

  /**
   * 메리츠 화재.
   */
  const MERITZ_FIREBASE_CONFIG = {
    apiKey: process.env.MERITZ_API_KEY!,
    authDomain: 'irlink-meritz.firebaseapp.com',
    databaseURL: 'https://irlink-meritz.firebaseio.com',
    projectId: 'irlink-meritz',
    storageBucket: 'irlink-meritz.appspot.com',
    messagingSenderId: process.env.MERITZ_MESSAGING_SENDER_ID!,
    appId: process.env.MERITZ_APP_ID!,
    measurementId: process.env.MERITZ_MEASUREMENT_ID!,
  }

  /**
   * 모렉스.
   */
  const MORECX_FIREBASE_CONFIG = {
    apiKey: process.env.MORECX_API_KEY!,
    authDomain: 'irlink-morecx.firebaseapp.com',
    databaseURL: 'https://irlink-morecx.firebaseio.com',
    projectId: 'irlink-morecx',
    storageBucket: 'irlink-morecx.appspot.com',
    messagingSenderId: process.env.MORECX_MESSAGING_SENDER_ID!,
    appId: process.env.MORECX_APP_ID!,
    measurementId: process.env.MORECX_MEASUREMENT_ID!,
  }

  /**
   * 신한 카드.
   */
  const SHINHAN_CARD_FIREBASE_CONFIG = {
    apiKey: process.env.SHINHAN_CARD_API_KEY!,
    authDomain: 'shinhan-card.firebaseapp.com',
    databaseURL: 'https://shinhan-card-default-rtdb.firebaseio.com',
    projectId: 'shinhan-card',
    storageBucket: 'shinhan-card.appspot.com',
    messagingSenderId: process.env.SHINHAN_CARD_MESSAGING_SENDER_ID!,
    appId: process.env.SHINHAN_CARD_APP_ID!,
  }

  /**
   * SK 엠엔 서비스.
   */
  const SK_MN_SERVICE_FIREBASE_CONFIG = {
    apiKey: process.env.SK_MN_SERVICE_API_KEY!,
    authDomain: 'sk-mnservice-a07c5.firebaseapp.com',
    databaseURL: 'https://sk-mnservice-a07c5-default-rtdb.firebaseio.com',
    projectId: 'sk-mnservice-a07c5',
    storageBucket: 'sk-mnservice-a07c5.appspot.com',
    messagingSenderId: process.env.SK_MN_SERVICE_MESSAGING_SENDER_ID!,
    appId: process.env.SK_MN_SERVICE_APP_ID!,
    measurementId: process.env.SK_MN_SERVICE_MEASUREMENT_ID!,
  }

  /**
   * 지링크.
   */
  const ZILINK_FIREBASE_CONFIG = {
    apiKey: process.env.ZILINK_API_KEY!,
    authDomain: 'irlink-zilink.firebaseapp.com',
    databaseURL: 'https://irlink-zilink.firebaseio.com',
    projectId: 'irlink-zilink',
    storageBucket: 'irlink-zilink.appspot.com',
    messagingSenderId: process.env.ZILINK_MESSAGING_SENDER_ID!,
    appId: process.env.ZILINK_APP_ID!,
    measurementId: process.env.ZILINK_MEASUREMENT_ID!,
  }

  /**
   * Config 가져오기.
   */
  const getConfig = (client: ClientType) => {
    if (client === Client.CHUBB) return CHUBB_FIREBASE_CONFIG
    if (client === Client.DB_LIFE) return DB_LIFE_FIREBASE_CONFIG
    if (client === Client.HANA) return HANA_FIREBASE_CONFIG
    if (client === Client.KB_WIRELESS) return KB_WIRELESS_FIREBASE_CONFIG
    if (client === Client.LINA) return LINA_FIREBASE_CONFIG
    if (client === Client.L_POINT) return L_POINT_FIREBASE_CONFIG
    if (client === Client.MORECX) return MORECX_FIREBASE_CONFIG
    if (client === Client.SHINHAN_CARD) return SHINHAN_CARD_FIREBASE_CONFIG
    if (client === Client.ZILINK) return ZILINK_FIREBASE_CONFIG
  }

  return getConfig(client)
}

export default useFirebaseConfig
