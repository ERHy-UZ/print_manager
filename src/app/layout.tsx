import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ManagerProvider from "@/context/ManagerContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PRINT MANAGER",
  description: "Aplicacion que permite administrar las impresiones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ManagerProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-egg-900 antialiased`}
        >
          {children}
        </body>
      </ManagerProvider>
    </html>
  );
}
