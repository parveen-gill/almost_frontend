
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
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

          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
           
            <Navbar/>
        {children}
        <Footer/>

          </GoogleOAuthProvider>
       
      </body>
    </html>
  );
}
