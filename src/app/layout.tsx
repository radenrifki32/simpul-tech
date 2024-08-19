import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/layout/siderbar";
import Header from "./components/layout/header";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato'
});

export const metadata: Metadata = {
  title: "Simpul Tech",
  description: "Skill Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lato.variable} `}>
        <div className="w-screen bg-background flex">
          <Sidebar/>
          <div className="w-full">
          <Header/>
          {children}
          </div>
        </div>
        </body>
    </html>
  );
}
