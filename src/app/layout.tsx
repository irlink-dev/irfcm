import TopFixedNavbar from '@/component/TopFixedNavbar';
import BottomFixedFooter from '@/component/BottomFixedFooter';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <head>
            <script src="https://cdn.tailwindcss.com" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js"></script>
        </head>

        <body>
        <TopFixedNavbar />
        {children}
        {/*<BottomFixedFooter />*/}
        </body>
        </html>
    );
}
