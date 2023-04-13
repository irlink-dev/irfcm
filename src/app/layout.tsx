import TopFixedNavbar from '@/component/TopFixedNavbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <head>
            <script src="https://cdn.tailwindcss.com" />
        </head>

        <body>
        <TopFixedNavbar />
        {children}
        </body>
        </html>
    );
}
