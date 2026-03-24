import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HomeIntro from "@/components/HomeIntro";

import EventsPreview from "@/components/EventsPreview";
import ImageBreak from "@/components/ImageBreak";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import Weather from "@/components/Weather";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <HomeIntro />

      <EventsPreview />
      <ImageBreak />
      <FeaturedBusinesses />
      <Weather />
      <CallToAction />
      <Footer />
    </main>
  );
}
