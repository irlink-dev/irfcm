'use client'

import Image from 'next/image'
import GlobalStyle from '@/style/GlobalStyle'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ProgressSpinner from '@/component/ProgressSpinner'

export default function HomePage() {

    const [client, setClient] = useState<string>('')

    function ClientListRow({ name, route, image }: any) {

        const router = useRouter()

        return (
            <button
                className="flex justify-between w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 hover:font-semibold focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                onClick={() => {
                    router.push(route)
                    setClient(() => route)
                }}>
                <Image src={image} alt={name} width={64} height={64} priority={true} />
                <div className="block text-right">
                    <div className="mb-3">{name}</div>
                    {client == route ? <ProgressSpinner size={7} /> : null}
                </div>
            </button>
        )
    }

    return (
        <section className={GlobalStyle.CONTAINER}>
            <h1>IRFCM 홈.</h1>
            <br />

            <div
                className="w-64 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                <ClientListRow name="라이나 생명" route="/lina"
                               image="/images/lina_app_icon.png" />
                <ClientListRow name="처브 CDM" route="/chubb"
                               image="/images/chubb_app_icon.png" />
                <ClientListRow name="하나손해보험" route="/hana"
                               image="/images/hana_app_icon.png" />
                <ClientListRow name="신한카드" route="/shinhan"
                               image="/images/shinhan_card_app_icon.png" />
                <ClientListRow name="DB 생명" route="/dblife"
                               image="/images/db_life_app_icon.png" />
                <ClientListRow name="KB 손해보험" route="/kb"
                               image="/images/kb_wireless_app_icon.png" />
                {/*<ClientListRow name="지링크" route="/zilink" />*/}
            </div>
        </section>
    )
}
