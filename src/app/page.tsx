import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import About from "@/components/About";
import Podcast from "@/components/Podcast";
import Cases from "@/components/Cases";
import Testimonials from "@/components/Testimonials";
import Calculator from "@/components/Calculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Products />
      <About />
      <Podcast />
      <Cases />
      <Testimonials />
      <Calculator />
      <ContactForm />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
