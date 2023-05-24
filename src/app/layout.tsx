import Dashboard from '@/component/dashboard/Dashboard'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="ko">
        <head>
            <title>IRFCM :: IRLINK Firebase Cloud Messaging Service</title>
            <link rel="icon" href="/icons/postman.svg" />
            <script src="https://cdn.tailwindcss.com" />
            {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/datepicker.min.js"></script>*/}
        </head>

        <body>
        <Dashboard>
            {children}
        </Dashboard>
        </body>
        </html>
    )
}

export default RootLayout
