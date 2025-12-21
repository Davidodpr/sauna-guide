import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import gadgetsData from '@/data/gadgets.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sauna Gear & Gadgets | The Best Accessories for 2025',
  description: 'Discover 100+ essential sauna accessories, from thermometers and buckets to cold plunges and red light therapy. Curated recommendations for every budget.',
  openGraph: {
    title: 'Sauna Gear & Gadgets | The Best Accessories for 2025',
    description: 'Discover 100+ essential sauna accessories, from thermometers and buckets to cold plunges and red light therapy.',
  },
}

export default function GearPage() {
  return (
    <main className="min-h-screen bg-sauna-paper">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-sauna-ink text-sauna-paper">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-sauna-sand mb-4">Gear Guide</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            The gear that matters
          </h1>
          <p className="text-xl text-sauna-paper/80 max-w-2xl mx-auto">
            {gadgetsData.totalProducts}+ products across {gadgetsData.categories.length} categories.
            Curated from Reddit, expert reviews, and real-world testing.
          </p>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-8 bg-sauna-cream border-b border-sauna-sand/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {gadgetsData.categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 bg-sauna-paper rounded-full text-sm font-medium text-sauna-ink
                         hover:bg-sauna-ink hover:text-sauna-paper transition-colors whitespace-nowrap
                         border border-sauna-sand/30"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Kits */}
      <section className="py-16 bg-sauna-paper">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-sauna-ink text-center mb-10">
            Quick Start Kits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <KitCard
              name={gadgetsData.starterKits.budget.name}
              total={gadgetsData.starterKits.budget.total}
              items={gadgetsData.starterKits.budget.items}
              variant="budget"
            />
            <KitCard
              name={gadgetsData.starterKits.enthusiast.name}
              total={gadgetsData.starterKits.enthusiast.total}
              items={gadgetsData.starterKits.enthusiast.items}
              variant="enthusiast"
            />
            <KitCard
              name={gadgetsData.starterKits.biohacker.name}
              total={gadgetsData.starterKits.biohacker.total}
              items={gadgetsData.starterKits.biohacker.items}
              variant="biohacker"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      {gadgetsData.categories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-16 ${index % 2 === 0 ? 'bg-sauna-cream' : 'bg-sauna-paper'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-medium text-sauna-ink mb-2">
                {category.name}
              </h2>
              <p className="text-sauna-slate">{category.description}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  description={product.description}
                  why={product.why}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-20 bg-sauna-ink text-sauna-paper">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
            Get gear picks in your inbox
          </h2>
          <p className="text-sauna-paper/70 mb-8">
            Every Thursday we share one gear recommendation that actually works.
          </p>
          <a
            href="/#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sauna-paper text-sauna-ink rounded-lg
                     font-medium hover:bg-sauna-linen transition-colors"
          >
            Step inside
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function KitCard({
  name,
  total,
  items,
  variant,
}: {
  name: string
  total: string
  items: string[]
  variant: 'budget' | 'enthusiast' | 'biohacker'
}) {
  const icons = {
    budget: '🌱',
    enthusiast: '🔥',
    biohacker: '🧬',
  }

  const colors = {
    budget: 'border-green-500/30 bg-green-50',
    enthusiast: 'border-orange-500/30 bg-orange-50',
    biohacker: 'border-purple-500/30 bg-purple-50',
  }

  return (
    <div className={`p-6 rounded-xl border-2 ${colors[variant]}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icons[variant]}</span>
        <div>
          <h3 className="font-medium text-sauna-ink">{name}</h3>
          <p className="text-sm text-sauna-slate">{total}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-sauna-slate flex items-start gap-2">
            <span className="text-sauna-oak mt-0.5">+</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProductCard({
  name,
  brand,
  price,
  description,
  why,
}: {
  name: string
  brand: string
  price: string
  description: string
  why: string
}) {
  return (
    <div className="bg-sauna-paper p-6 rounded-xl border border-sauna-sand/30 hover:border-sauna-oak/40 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-sauna-ink">{name}</h3>
          <p className="text-sm text-sauna-slate">{brand}</p>
        </div>
        <span className="text-sm font-medium text-sauna-oak bg-sauna-sand/20 px-2 py-1 rounded">
          {price}
        </span>
      </div>
      <p className="text-sm text-sauna-slate mb-3">{description}</p>
      <p className="text-sm text-sauna-bark">
        <span className="font-medium">Why:</span> {why}
      </p>
    </div>
  )
}
