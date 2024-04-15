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
      </body>
    </html>
  );
}
