
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/authcontext";
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
           <AuthProvider>
            <Navbar/>
        {children}
        <Footer/>
        </AuthProvider>
          </GoogleOAuthProvider>
       
      </body>
    </html>
  );
}
