import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import GoldChatWidget from "@/app/components/GoldChatWidget";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Solução de tecnologia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/ynnothivix.jpg" type="image/jpg" />
      </head>
      <body className="relative">
        <Header />
        {children}
        <Footer />
        <GoldChatWidget />
      </body>
    </html>
  );
}