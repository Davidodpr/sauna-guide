import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to Sauna Guide',
  description: 'You\'re in. Check your inbox for your first letter.',
  robots: 'noindex, nofollow',
}

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-sauna-paper">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-2xl mx-auto px-6 text-center">

          {/* Confirmation */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sauna-ink/10 mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-sauna-ink mb-4">
              You&apos;re in.
            </h1>
            <p className="text-lg text-sauna-slate">
              Welcome to Sauna Guide. Your first letter arrives Thursday.
            </p>
          </div>

          {/* Safelist Box */}
          <div className="bg-sauna-ink text-sauna-paper rounded-lg p-6 md:p-8 text-left mb-10">
            <h2 className="font-display text-xl md:text-2xl font-medium mb-4">
              One small favor
            </h2>
            <p className="text-sauna-paper/80 mb-4 text-sm">
              So our letters actually reach you:
            </p>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-sauna-sand font-medium">1.</span>
                <span>
                  <strong className="text-sauna-paper">Add us to contacts:</strong>{' '}
                  <span className="text-sauna-paper/70">saunaguide@mail.beehiiv.com</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-sauna-sand font-medium">2.</span>
                <span>
                  <strong className="text-sauna-paper">Check your inbox</strong>{' '}
                  <span className="text-sauna-paper/70">(and Promotions if it&apos;s not there)</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-sauna-sand font-medium">3.</span>
                <span>
                  <strong className="text-sauna-paper">Reply with one word:</strong>{' '}
                  <span className="inline-block bg-sauna-sand/20 text-sauna-sand px-2 py-0.5 rounded text-xs font-medium">
                    Löyly
                  </span>
                  <br />
                  <span className="text-sauna-paper/60 text-xs">
                    It helps our emails reach you — and it&apos;s Finnish for the steam that rises from hot stones.
                  </span>
                </span>
              </li>
            </ol>
          </div>

          {/* Quote */}
          <blockquote className="border-l-2 border-sauna-sand pl-4 text-left mb-10">
            <p className="text-sauna-slate italic">
              &quot;In the sauna, one must conduct himself as one would in church.&quot;
            </p>
            <cite className="text-sm text-sauna-slate/70 not-italic">— Finnish proverb</cite>
          </blockquote>

        </div>
      </section>

      {/* What to Explore Section */}
      <section className="py-16 md:py-20 bg-sauna-cream border-t border-sauna-sand/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-sauna-ink text-center mb-10">
            While you wait for Thursday
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/guides/sauna-health-benefits"
              className="group bg-sauna-paper p-6 rounded-lg border border-sauna-sand/20 hover:border-sauna-sand/40 transition-colors"
            >
              <div className="text-2xl mb-3">🔬</div>
              <h3 className="font-medium text-sauna-ink mb-2 group-hover:text-sauna-bark transition-colors">
                The Science of Heat
              </h3>
              <p className="text-sm text-sauna-slate">
                What 20 minutes at 80°C does to your body.
              </p>
            </Link>

            <Link
              href="/saunas"
              className="group bg-sauna-paper p-6 rounded-lg border border-sauna-sand/20 hover:border-sauna-sand/40 transition-colors"
            >
              <div className="text-2xl mb-3">🗺️</div>
              <h3 className="font-medium text-sauna-ink mb-2 group-hover:text-sauna-bark transition-colors">
                World&apos;s Best Saunas
              </h3>
              <p className="text-sm text-sauna-slate">
                40+ places worth the journey.
              </p>
            </Link>

            <Link
              href="/guides/sauna-cultures-around-the-world"
              className="group bg-sauna-paper p-6 rounded-lg border border-sauna-sand/20 hover:border-sauna-sand/40 transition-colors"
            >
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="font-medium text-sauna-ink mb-2 group-hover:text-sauna-bark transition-colors">
                Sauna Cultures
              </h3>
              <p className="text-sm text-sauna-slate">
                From Finland to Japan — how the world sweats.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 md:py-20 bg-sauna-paper">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-lg text-sauna-slate mb-6">
            See you Thursday.
          </p>
          <p className="text-sauna-slate/70 text-sm">
            — The Sauna Guide team
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
