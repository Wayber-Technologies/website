import ContactForm from "../components/ContactForm";
import FAQSection from "../components/FAQSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Wayber Agency",
  description: "Get in touch with Wayber Agency. We love to hear from you and discuss your project ideas.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <ContactForm />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
