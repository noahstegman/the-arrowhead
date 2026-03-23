import Navigation from "@/components/Navigation";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact | The Arrowhead",
  description: "Get in touch with The Arrowhead team.",
};

export default function ContactPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-28 md:pt-36" />

      <section className="relative z-10 bg-surface">
        <div className="mx-auto max-w-[1440px] px-8 md:px-16 lg:px-24 pt-8 pb-40 md:pt-12 md:pb-56">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">
            {/* Left: Header */}
            <ScrollReveal className="md:col-span-5" delay={0.05}>
              <p className="section-label mb-8">Get in touch</p>
              <h1 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light text-on-surface tracking-[-0.02em] leading-[1.08] mb-8">
                We would love
                <br />
                to hear from you
              </h1>
              <p className="font-sans text-on-surface-muted text-[0.9375rem] leading-[1.75] max-w-[44ch] font-light">
                Whether you run a local business, are planning an event, or
                just want to say hello &mdash; drop us a line.
              </p>
            </ScrollReveal>

            {/* Right: Contact form */}
            <ScrollReveal className="md:col-span-5 md:col-start-8 md:pt-8" delay={0.15}>
              <form className="flex flex-col gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="section-label block mb-3"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary py-3 text-on-surface font-sans text-[0.9375rem] font-light outline-none transition-colors duration-300 placeholder:text-on-surface-muted/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="section-label block mb-3"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary py-3 text-on-surface font-sans text-[0.9375rem] font-light outline-none transition-colors duration-300 placeholder:text-on-surface-muted/40"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="section-label block mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary py-3 text-on-surface font-sans text-[0.9375rem] font-light outline-none transition-colors duration-300 resize-none placeholder:text-on-surface-muted/40"
                    placeholder="What is on your mind?"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3.5 font-sans text-[0.8125rem] font-medium tracking-wide hover:bg-primary-light transition-colors duration-300 active:scale-[0.97]"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
