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
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { SettingsProvider } from "@/lib/SettingsContext";
import { getServices, getProducts, getCases, getTestimonials, getAllSettings } from "@/lib/data";

export default async function Home() {
  let services, products, cases, testimonials, settings;

  try {
    [services, products, cases, testimonials, settings] = await Promise.all([
      getServices(),
      getProducts(),
      getCases(),
      getTestimonials(),
      getAllSettings(),
    ]);
  } catch {
    // Fallback to defaults if Supabase is not configured
    services = undefined;
    products = undefined;
    cases = undefined;
    testimonials = undefined;
    settings = undefined;
  }

  const settingsMap = settings || {};

  return (
    <SettingsProvider settings={settingsMap as Record<string, string> & { contact_phone: string; contact_phone_display: string; contact_email: string; contact_address: string; contact_telegram: string; contact_youtube: string; podcast_title: string; podcast_description: string; podcast_video_id: string; podcast_youtube_url: string }}>
      <main className="min-h-screen">
        <Header />
        <Hero settings={settingsMap} />
        <Services services={services && services.length > 0 ? services : undefined} />
        <Products products={products && products.length > 0 ? products : undefined} />
        <About settings={settingsMap} />
        <Podcast settings={settingsMap} />
        <Cases cases={cases && cases.length > 0 ? cases : undefined} />
        <Testimonials testimonials={testimonials && testimonials.length > 0 ? testimonials : undefined} />
        <Calculator />
        <ContactForm settings={settingsMap} />
        <Footer settings={settingsMap} />
        <FloatingButtons />
        <AnalyticsTracker />
      </main>
    </SettingsProvider>
  );
}
