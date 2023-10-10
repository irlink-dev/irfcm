/**
 * 고객사.
 */
export enum Client {
  /**
   * 처브 CDM.
   */
  CHUBB = 'chubb',

  /**
   * DB 생명.
   */
  DB_LIFE = 'dblife',

  /**
   * 하나손해보험.
   */
  HANA = 'hana',

  /**
   * KB 손보.
   */
  KB_WIRELESS = 'kb',

  /**
   * 라이나 생명.
   */
  LINA = 'lina',

  /**
   * L 포인트.
   */
  L_POINT = 'lpoint',

  /**
   * 모렉스.
   */
  MORECX = 'morecx',

  /**
   * 신한 카드.
   */
  SHINHAN_CARD = 'shinhan',

  /**
   * 지링크.
   */
  ZILINK = 'zilink',
}

/**
 * type ClientType = | Client.CHUBB | Client.DB_LIFE ...
 */
export type ClientType = (typeof Client)[keyof typeof Client]
