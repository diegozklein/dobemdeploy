import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

const OpenSans = Open_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "DoBem",
  description: "Aplicação para doações para acabar com a fome no Brasil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning={true}
        className={OpenSans.className}
        id='root'
      >
        <Header
          onClick={() => {}}
          showLeftArrow={false}
        />
        {children}
      </body>
    </html>
  );
}
