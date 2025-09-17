
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Almostus.in",
  description: "Reconnect with the moments that almost slipped away.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
