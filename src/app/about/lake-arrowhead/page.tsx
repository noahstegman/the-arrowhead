import Navigation from "@/components/Navigation";
import LakeHistory from "@/components/LakeHistory";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Lake Arrowhead | The Arrowhead",
  description:
    "The history of Lake Arrowhead — from the Yuhaaviatam people to the 1922 dam, Hollywood retreats, and the quiet mountain community it remains today.",
};

export default function AboutLakePage() {
  return (
    <main>
      <Navigation />
      <div className="pt-28 md:pt-36" />
      <LakeHistory />
      <CallToAction />
      <Footer />
    </main>
  );
}
