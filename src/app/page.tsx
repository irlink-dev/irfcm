'use client'

import List from '@mui/material/List'
import DrawerListRow from '@/component/DrawerListRow.client'

const HomePage = () => {
    return <List sx={{ width: '100%', maxWidth: 360 }}>
        <DrawerListRow
            name="라이나 생명" route="/lina" desc="kr.co.irlink.lina"
            image="/images/lina_app_icon.png" />
        <DrawerListRow
            name="처브 CDM" route="/chubb" desc="kr.co.irlink.chubb"
            image="/images/chubb_app_icon.png" />
        <DrawerListRow
            name="하나손해보험" route="/hana" desc="kr.co.irlink.hana"
            image="/images/hana_app_icon.png" />
        <DrawerListRow
            name="신한카드" route="/shinhan" desc="kr.co.irlink.shinhan"
            image="/images/shinhan_card_app_icon.png" />
        <DrawerListRow
            name="DB 생명" route="/dblife" desc="kr.co.irlink.dblife"
            image="/images/db_life_app_icon.png" />
        <DrawerListRow
            name="KB 손해보험" route="/kb" desc="kr.co.irlink.kb"
            image="/images/kb_wireless_app_icon.png" />
    </List>
}

export default HomePage
