"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import PieDePagina from "@/components/PieDePagina";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white m-0 p-0 w-full`}>
        <NavBar isActive={isActive}/>
        <main className="bg-white flex flex-col w-full">{children}</main>
        <PieDePagina />
      </body>
    </html>
  );
}
