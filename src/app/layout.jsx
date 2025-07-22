export const metadata = {
  title: "Watchzy - Stream Everything",
  description: "Your ultimate platform for movies and shows.",
  icons: {
    icon: "/favicon.ico",
  },
};

import "./globals.css";
import Header from "../components/section/Header"
import Footer from "@/components/section/Footer";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
