import { Poppins } from "next/font/google";
import "./globals.css";

import { AnimatePresence } from "framer-motion";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} font-sans bg-[#21201E]`}>

        <ReactQueryProvider>
          <AnimatePresence mode="wait">
            <div>{children}</div>
          </AnimatePresence>
        </ReactQueryProvider>
      </body>
    </html>
  );
}