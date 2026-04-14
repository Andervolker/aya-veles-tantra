import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import About from "@/components/About";
import Formats from "@/components/Formats";
import Results from "@/components/Results";
import Schedule from "@/components/Schedule";
import Testimonials from "@/components/Testimonials";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import QuizContactForm from "@/components/QuizContactForm";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <>
      <Preloader />
      <WhatsAppButton />
      <CookieBanner />
      <SmoothScroll>
        <main>
          <Hero />
          <Problems />
          <About />
          <Formats />
          <Results />
          <Schedule />
          <Testimonials />
          <Team />
          <FAQ />
          <QuizContactForm />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
