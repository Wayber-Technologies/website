import ContactForm from "../components/ContactForm";
import FAQSection from "../components/FAQSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Wayber Technologies - Get Your Project Started Today",
  description: "Contact Wayber Technologies for web development, mobile app development, UI/UX design, and digital marketing services. Get a free consultation for your project.",
  keywords: "contact wayber technologies, web development consultation, mobile app development quote, UI/UX design services, digital marketing agency contact",
  openGraph: {
    title: "Contact Wayber Technologies - Digital Agency Services",
    description: "Get in touch with our team of experts for web development, mobile apps, and digital marketing solutions.",
    url: "https://waybertechnologies.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Wayber Technologies - Digital Agency Services",
    description: "Get in touch with our team of experts for web development, mobile apps, and digital marketing solutions.",
  },
  alternates: {
    canonical: "https://waybertechnologies.com/contact",
  },
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
