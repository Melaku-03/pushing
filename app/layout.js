import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "@/comps/Footer";

export const metadata = {
  title: "Phishing.",
  description: "phishing tracking page"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer theme='dark' />
        {children}
        <Footer />
      </body>
    </html>
  );
}
