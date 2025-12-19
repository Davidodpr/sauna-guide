import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-sauna-steam/80 backdrop-blur-md border-b border-sauna-warm/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sauna-copper to-sauna-ember flex items-center justify-center
                            shadow-lg shadow-sauna-copper/30 group-hover:shadow-xl group-hover:shadow-sauna-copper/40
                            transition-all duration-300 group-hover:scale-105">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <span className="font-display text-2xl font-semibold text-sauna-dark">Sauna Guide</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/saunas" className="text-sauna-dark/70 hover:text-sauna-copper transition-colors font-medium">
              Directory
            </Link>
            <Link href="/guides" className="text-sauna-dark/70 hover:text-sauna-copper transition-colors font-medium">
              Guides
            </Link>
            <Link href="#newsletter" className="px-5 py-2.5 bg-sauna-dark text-white rounded-full font-medium
                                                 hover:bg-sauna-charcoal transition-all duration-300
                                                 shadow-lg shadow-sauna-dark/20 hover:shadow-xl hover:shadow-sauna-dark/30">
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sauna-charcoal via-sauna-dark to-sauna-wood" />

        {/* Steam/mist effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sauna-glow/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sauna-ember/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-sauna-honey/15 rounded-full blur-3xl animate-float-slow" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 border border-sauna-copper/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-sauna-glow/20 rounded-full animate-float" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-sauna-copper/20 border border-sauna-copper/30 rounded-full
                            text-sauna-glow text-sm font-medium mb-8 backdrop-blur-sm">
              The #1 Resource for Sauna Enthusiasts
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8
                        leading-[1.1] tracking-tight animate-fade-up"
              style={{ animationDelay: '0.1s' }}>
            Discover the{' '}
            <span className="relative">
              <span className="gradient-text">Art of Heat</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-sauna-copper/40" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
            {' '}& Wellness
          </h1>

          <p className="text-xl md:text-2xl text-sauna-birch/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up font-light"
             style={{ animationDelay: '0.2s' }}>
            Your complete guide to authentic sauna experiences. Explore world-class saunas,
            master traditional techniques, and transform your wellness journey.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <NewsletterSignup />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-sauna-steam py-8 border-y border-sauna-warm/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}
                       className="w-10 h-10 rounded-full bg-gradient-to-br from-sauna-warm to-sauna-copper
                                  border-2 border-white shadow-sm flex items-center justify-center
                                  text-white text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sauna-dark">
                <span className="font-semibold">10,000+</span>
                <span className="text-sauna-dark/60 ml-1">enthusiasts</span>
              </div>
            </div>

            <div className="h-8 w-px bg-sauna-warm/30 hidden md:block" />

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-sauna-honey" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sauna-dark ml-1">
                <span className="font-semibold">4.9</span>
                <span className="text-sauna-dark/60 ml-1">rating</span>
              </span>
            </div>

            <div className="h-8 w-px bg-sauna-warm/30 hidden md:block" />

            <div className="text-sauna-dark">
              <span className="font-semibold">Weekly</span>
              <span className="text-sauna-dark/60 ml-1">expert insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-sauna-steam via-white to-white" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-sauna-dark mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-sauna-dark/60 max-w-2xl mx-auto">
              From finding the perfect sauna to mastering authentic techniques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Sauna Directory"
              description="Discover authentic saunas worldwide. From traditional Finnish saunas to luxurious spa retreats, find your perfect heat sanctuary."
              href="/saunas"
              accent="from-sauna-copper to-sauna-ember"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="Expert Guides"
              description="Master contrast therapy, learn traditional techniques, and unlock the science-backed health benefits of regular sauna practice."
              href="/guides"
              accent="from-sauna-glow to-sauna-honey"
            />

            <FeatureCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Weekly Newsletter"
              description="Exclusive content, new discoveries, and expert tips delivered every week. Join 10,000+ wellness enthusiasts."
              href="#newsletter"
              accent="from-sauna-ember to-sauna-heat"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 bg-sauna-dark relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sauna-copper/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-sauna-copper/20 border border-sauna-copper/30 rounded-full
                              text-sauna-glow text-sm font-medium mb-6">
                Why Join?
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Level Up Your<br />
                <span className="gradient-text">Sauna Practice</span>
              </h2>
              <p className="text-xl text-sauna-birch/70 mb-10 leading-relaxed">
                Get science-backed protocols, exclusive deals, and insider knowledge
                that transforms your wellness routine.
              </p>

              <div className="space-y-6">
                <BenefitItem
                  icon="🔥"
                  title="Contrast Therapy Protocols"
                  description="Optimized hot-cold sequences backed by the latest research"
                />
                <BenefitItem
                  icon="📊"
                  title="Science-Based Benefits"
                  description="Deep dives into cardiovascular, longevity, and mental health benefits"
                />
                <BenefitItem
                  icon="🎁"
                  title="Exclusive Deals"
                  description="Member-only discounts on sauna equipment and accessories"
                />
                <BenefitItem
                  icon="🌍"
                  title="Global Discoveries"
                  description="First access to new sauna reviews and hidden gems"
                />
              </div>
            </div>

            <div className="relative">
              {/* Placeholder for image - geometric pattern */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-sauna-copper/20 via-sauna-ember/10 to-transparent
                              border border-sauna-copper/20 flex items-center justify-center relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute inset-8 border border-sauna-copper/20 rounded-full" />
                <div className="absolute inset-16 border border-sauna-glow/20 rounded-full" />
                <div className="absolute inset-24 border border-sauna-honey/20 rounded-full" />

                {/* Center icon */}
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-sauna-copper to-sauna-ember
                                flex items-center justify-center shadow-2xl shadow-sauna-ember/50 animate-float">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-sauna-glow/10 rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-sauna-copper/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="newsletter" className="py-24 md:py-32 bg-gradient-to-b from-sauna-steam to-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sauna-copper/30 to-transparent" />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-700 font-medium text-sm">Limited: Free Contrast Therapy Guide</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-sauna-dark mb-6 leading-tight">
            Start Your Sauna<br />Journey Today
          </h2>

          <p className="text-xl text-sauna-dark/60 mb-10 max-w-2xl mx-auto">
            Join 10,000+ sauna enthusiasts getting weekly insights, exclusive guides,
            and early access to new content. Plus, get our Contrast Therapy Starter Guide free.
          </p>

          <NewsletterSignup variant="inline" />

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-sauna-dark/50">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No spam, ever
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Unsubscribe anytime
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free starter guide
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sauna-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sauna-copper to-sauna-ember flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <span className="font-display text-2xl font-semibold">Sauna Guide</span>
              </div>
              <p className="text-sauna-mist/60 max-w-sm">
                Your complete guide to authentic sauna experiences. Discover, learn, and embrace the sauna lifestyle.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sauna-mist/60">
                <li><Link href="/saunas" className="hover:text-sauna-copper transition-colors">Sauna Directory</Link></li>
                <li><Link href="/guides" className="hover:text-sauna-copper transition-colors">Guides & Tips</Link></li>
                <li><Link href="/guides/contrast-therapy" className="hover:text-sauna-copper transition-colors">Contrast Therapy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sauna-mist/60">
                <li><Link href="/about" className="hover:text-sauna-copper transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-sauna-copper transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-sauna-copper transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sauna-mist/40 text-sm">
              &copy; {new Date().getFullYear()} Sauna Guide. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sauna-mist/40 hover:text-sauna-copper transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-sauna-mist/40 hover:text-sauna-copper transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  accent
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  accent: string
}) {
  return (
    <Link
      href={href}
      className="group block p-8 bg-white rounded-2xl border border-sauna-warm/10
                 card-hover relative overflow-hidden"
    >
      {/* Accent gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center
                      text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300
                      group-hover:scale-105 transform duration-300`}>
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-sauna-dark mb-3 group-hover:text-sauna-copper transition-colors">
        {title}
      </h3>

      <p className="text-sauna-dark/60 leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex items-center text-sauna-copper font-medium group-hover:gap-3 gap-2 transition-all">
        Learn more
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

function BenefitItem({
  icon,
  title,
  description
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-xl bg-sauna-copper/20 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{title}</h4>
        <p className="text-sauna-birch/60">{description}</p>
      </div>
    </div>
  )
}
