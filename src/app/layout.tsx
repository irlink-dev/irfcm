'use client'

import Dashboard from '@/components/Dashboard'
import { SnackbarProvider } from 'notistack'
import { LoadingProvider } from '@/contexts/LoadingContext'
import { MorecxVariantsProvider } from '@/contexts/MorecxVariantsContext'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>IRFCM :: IRLINK Firebase Cloud Messaging Service</title>
        <link rel="icon" href="/icons/postman.svg" />
        <meta charSet="utf-8" />
      </head>

      <body>
        <LoadingProvider>
          <SnackbarProvider maxSnack={3}>
            <MorecxVariantsProvider>
              <Dashboard>{children}</Dashboard>
            </MorecxVariantsProvider>
          </SnackbarProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}

export default RootLayout
