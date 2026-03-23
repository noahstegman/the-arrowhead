import Navigation from "@/components/Navigation";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Events | The Arrowhead",
  description: "Upcoming events, markets, and gatherings in the Lake Arrowhead mountain community.",
};

export default function EventsPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-28 md:pt-36" />
      <EventsSection />
      <Footer />
    </main>
  );
}
