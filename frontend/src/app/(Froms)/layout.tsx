"use client"
import { Inter } from 'next/font/google'

import { Providers } from '@/reducers/provider'
import ThemeProvider from '@/mui/provider/themeProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </Providers>
                <ToastContainer />
            </body>
        </html>
    )
}
