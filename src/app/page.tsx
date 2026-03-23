import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Weather from "@/components/Weather";
import EventsPreview from "@/components/EventsPreview";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Weather />
      <EventsPreview />
      <CallToAction />
      <Footer />
    </main>
  );
}
