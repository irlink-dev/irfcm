import TopFixedNavbar from '@/component/TopFixedNavbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <head>
            <title>IRFCM :: IRLINK Firebase Cloud Messaging Service</title>
            <link rel="icon" href="/icons/postman.svg" />
            <script src="https://cdn.tailwindcss.com" />
        </head>

        <body>
        <TopFixedNavbar />
        {children}
        </body>
        </html>
    );
}
