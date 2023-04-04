export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <head>
            <script src="https://cdn.tailwindcss.com"/>
        </head>

        <body>{children}</body>
        </html>
    );
}
