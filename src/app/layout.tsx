'use client'

import '@/styles/globals.css'
import Dashboard from '@/components/dashboard'
import { SnackbarProvider } from 'notistack'
import { MorecxVariantsProvider } from '@/contexts/morecx-variants-context'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>IRFCM :: IRLINK Firebase Cloud Messaging Service</title>
        <link rel="icon" href="/icons/postman.svg" />
        <meta charSet="utf-8" />

        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body>
        <SnackbarProvider maxSnack={3}>
          <MorecxVariantsProvider>
            <Dashboard>{children}</Dashboard>
          </MorecxVariantsProvider>
        </SnackbarProvider>
      </body>
    </html>
  )
}

export default RootLayout
