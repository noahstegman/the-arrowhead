import Navigation from "@/components/Navigation";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About This Site | The Arrowhead",
  description: "About The Arrowhead project — a community-driven guide to mountain life.",
};

export default function AboutSitePage() {
  return (
    <main>
      <Navigation />
      <div className="pt-28 md:pt-36" />

      <section className="relative z-10 bg-surface">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-8 pb-40 md:pt-12 md:pb-56">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-0">
            <ScrollReveal className="md:col-span-5" delay={0.05}>
              <p className="section-label mb-8">About this site</p>
              <h1 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08]">
                A community
                <br />
                project
              </h1>
            </ScrollReveal>

            <ScrollReveal className="md:col-span-5 md:col-start-8 md:pt-20" delay={0.2}>
              <p className="font-sans text-on-surface-muted text-[0.9375rem] md:text-base leading-[1.75] max-w-[52ch] font-light">
                The Arrowhead is a community-driven platform built to
                connect visitors with the mountain village they are about to
                fall in love with. We showcase local businesses, surface
                upcoming events, and share the stories that make this place
                more than a pin on a map.
              </p>
              <p className="font-sans text-on-surface-muted text-[0.9375rem] md:text-base leading-[1.75] max-w-[52ch] mt-7 font-light">
                This site is independently operated and not affiliated with the
                Lake Arrowhead Communities or Arrowhead Lake Association. It
                exists because someone who lives here thought the mountain
                deserved a better front door.
              </p>
              <p className="font-sans text-on-surface-muted text-[0.9375rem] md:text-base leading-[1.75] max-w-[52ch] mt-7 font-light">
                If you own a business in the Lake Arrowhead area and would like
                to be featured, or if you have an event coming up, get in touch
                through our contact page.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
