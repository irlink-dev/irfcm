import {
  ROUTE_CHUBB,
  ROUTE_DB_LIFE,
  ROUTE_GS_SHOP_USB,
  ROUTE_HANA,
  ROUTE_HYUNDAI,
  ROUTE_KB_WIRELESS,
  ROUTE_KT_COMMERCE,
  ROUTE_LINA,
  ROUTE_L_POINT,
  ROUTE_MERITZ,
  ROUTE_MORECX,
  ROUTE_SHINHAN_CARD,
  ROUTE_ZILINK,
  ROUTE_HYUNDAI_SHOP,
  ROUTE_NS_SHOP,
  ROUTE_SK_MNSERVICE,
  ROUTE_LOTTE_CARD,
  ROUTE_CJ_O_SHOPPING,
} from './routes'

/**
 * 고객사 리스트.
 * TODO: 추후 DB화.
 */
const clientList = [
  {
    name: '라이나 생명',
    route: ROUTE_LINA,
    desc: 'kr.co.irlink.lina',
    image: '/images/lina_app_icon.png',
  },
  {
    name: 'L 포인트',
    route: ROUTE_L_POINT,
    desc: 'kr.co.irlink.lpoint',
    image: '/images/lpoint_app_icon.png',
  },
  {
    name: '처브 CDM',
    route: ROUTE_CHUBB,
    desc: 'kr.co.irlink.chubb',
    image: '/images/chubb_app_icon.png',
  },
  {
    name: '하나손해보험',
    route: ROUTE_HANA,
    desc: 'kr.co.irlink.hana',
    image: '/images/hana_app_icon.png',
  },
  {
    name: '신한카드',
    route: ROUTE_SHINHAN_CARD,
    desc: 'kr.co.irlink.shinhan',
    image: '/images/shinhan_card_app_icon.png',
  },
  {
    name: 'DB 생명',
    route: ROUTE_DB_LIFE,
    desc: 'kr.co.irlink.dblife',
    image: '/images/db_life_app_icon.png',
  },
  {
    name: 'KB 손해보험',
    route: ROUTE_KB_WIRELESS,
    desc: 'kr.co.irlink.kb',
    image: '/images/kb_wireless_app_icon.png',
  },
  {
    name: '모렉스',
    route: ROUTE_MORECX,
    desc: 'kr.co.irlink.morecx',
    image: '/images/morecx_app_icon.png',
  },
  {
    name: '지링크',
    route: ROUTE_ZILINK,
    desc: 'kr.co.irlink.usbcontrol',
    image: '/images/zilink_app_icon.png',
  },
  {
    name: '메리츠 화재',
    route: ROUTE_MERITZ,
    desc: 'com.irlink.meritz',
    image: '/images/meritz_app_icon.png',
  },
  {
    name: 'GS 홈쇼핑',
    route: ROUTE_GS_SHOP_USB,
    desc: 'kr.co.irlink.gsshopusb',
    image: '/images/gs_shop_usb_app_icon.png',
  },
  {
    name: 'KT 커머스',
    route: ROUTE_KT_COMMERCE,
    desc: 'kr.co.irlink.ktcommerce',
    image: '/images/kt_commerce_app_icon.png',
  },
  {
    name: '현대해상',
    route: ROUTE_HYUNDAI,
    desc: 'kr.co.irlink.usbcontrol',
    image: '/images/hyundai_app_icon.png',
  },
  {
    name: '현대 홈쇼핑',
    route: ROUTE_HYUNDAI_SHOP,
    desc: 'kr.co.irlink.hyundaishopusb',
    image: '/images/hyundai_shop_app_icon.webp',
  },
  {
    name: 'NS 홈쇼핑',
    route: ROUTE_NS_SHOP,
    desc: 'kr.co.irlink.nsshopusb',
    image: '/images/ns_shop_app_icon.png',
  },
  {
    name: 'SK엠엔서비스',
    route: ROUTE_SK_MNSERVICE,
    desc: 'kr.co.irlink.skmnservice',
    image: '/images/skmns_app_icon.png',
  },
  {
    name: '롯데카드',
    route: ROUTE_LOTTE_CARD,
    desc: 'kr.co.irlink.lottecard',
    image: '/images/lottecard_app_icon.png',
  },
  {
    name: 'CJO 쇼핑',
    route: ROUTE_CJ_O_SHOPPING,
    desc: 'kr.co.irlink.cjoshopping',
    image: '/images/cjo_shopping_app_icon.webp',
  },
]

export default clientList
