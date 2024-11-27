/**
 * 고객사.
 */
export enum Client {
  /**
   * 처브 CDM.
   */
  CHUBB = 'chubb',

  /**
   * CJO 쇼핑.
   */
  CJ_O_SHOPPING = 'cjoshopping',

  /**
   * DB 생명.
   */
  DB_LIFE = 'dblife',

  /**
   * GS 홈쇼핑 (IR-USB).
   */
  GS_SHOP_USB = 'gsshopusb',

  /**
   * 하나손해보험.
   */
  HANA = 'hana',

  /**
   * 흥국생명.
   */
  HEUNGKUK_LIFE = 'heungkuklife',

  /**
   * 현대해상.
   */
  HYUNDAI = 'hyundai',

  /**
   * 현대 홈쇼핑 (IR-USB).
   */
  HYUNDAI_SHOP = 'hyundaishop',

  /**
   * KB 손보.
   */
  KB_WIRELESS = 'kb',

  /**
   * KT 커머스.
   */
  KT_COMMERCE = 'ktcommerce',

  /**
   * 라이나 생명.
   */
  LINA = 'lina',

  /**
   * 롯데카드.
   */
  LOTTE_CARD = 'lottecard',

  /**
   * L 포인트.
   */
  L_POINT = 'lpoint',

  /**
   * 메리츠 화재.
   */
  MERITZ = 'meritz',

  /**
   * 모렉스.
   */
  MORECX = 'morecx',

  /**
   * NS 홈쇼핑. (IR-USB)
   */
  NS_SHOP = 'nsshop',

  /**
   * 신한 카드.
   */
  SHINHAN_CARD = 'shinhan',

  /**
   * 신한 카드. (라이나 제휴)
   */
  SHINHAN_CARD_LINA = 'shinhanlina',

  /**
   * SK엠엔서비스
   */
  SK_MNSERVICE = 'skmns',

  /**
   * 지링크.
   */
  ZILINK = 'zilink',
}

/**
 * type ClientType = | Client.CHUBB | Client.DB_LIFE ...
 */
export type ClientType = (typeof Client)[keyof typeof Client]
