import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ManagerProvider from "@/context/ManagerContext";

const gmx = localFont({
  src: "./fonts/GMX-Regular.otf",
  variable: "--font-gmx",
  weight: "100 900",
})

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
          className={`${gmx.variable} bg-egg-900 antialiased`}
        >
          {children}
        </body>
      </ManagerProvider>
    </html>
  );
}
