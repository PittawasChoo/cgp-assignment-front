import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "context/authContext";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "CGP Thailand Assignment: A Board",
    description: "A Board website created with NextJS",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} w-full min-h-screen`}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
