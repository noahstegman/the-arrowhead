import Navigation from "@/components/Navigation";
import BusinessesSection from "@/components/BusinessesSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Local Businesses | The Arrowhead",
  description: "Independent shops, restaurants, and services in the Lake Arrowhead mountain community.",
};

export default function BusinessesPage() {
  return (
    <main>
      <Navigation />
      {/* Page header spacer for fixed nav */}
      <div className="pt-28 md:pt-36" />
      <BusinessesSection />
      <Footer />
    </main>
  );
}
