import { Header } from "@/components/Header";

import "./globals.css";

export const metadata = {
  title: "Integración Brokers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full">
        <Header />
        {children}
        <footer className="text-xs p-2 text-center">
          <a href="https://github.com/3Data/broker-nextjs" target="_blank">
            See source code on GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}
