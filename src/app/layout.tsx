'use client'

import Dashboard from '@/component/dashboard/Dashboard'
import { SnackbarProvider } from 'notistack'
import { LoadingProvider } from '@/components/context/LoadingContext'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="ko">
        <head>
            <title>IRFCM :: IRLINK Firebase Cloud Messaging Service</title>
            <link rel="icon" href="/icons/postman.svg" />
            <meta charSet="utf-8" />

            {/* tailwind 사용 시 material ui 와 충돌. */}
            {/* <script src="https://cdn.tailwindcss.com" /> */}

            {/* flowbite datepicker plugin */}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js"></script> */}
        </head>

        <body>
        <LoadingProvider>
            <SnackbarProvider maxSnack={3}>
                <Dashboard>{children}</Dashboard>
            </SnackbarProvider>
        </LoadingProvider>
        </body>
        </html>
    )
}

export default RootLayout
