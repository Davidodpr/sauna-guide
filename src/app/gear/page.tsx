import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import gadgetsData from '@/data/gadgets.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sauna Gear & Accessories | Essential Equipment Guide',
  description: 'A curated collection of essential sauna accessories. From traditional buckets to modern recovery tools.',
  openGraph: {
    title: 'Sauna Gear & Accessories | Essential Equipment Guide',
    description: 'A curated collection of essential sauna accessories. From traditional buckets to modern recovery tools.',
  },
}

export default function GearPage() {
  return (
    <div className="min-h-screen bg-sauna-paper flex flex-col">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-32 flex-grow">
        <header className="mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-sauna-ink mb-4">
            Gear Guide
          </h1>
          <p className="text-xl text-sauna-slate max-w-2xl leading-relaxed">
            A curated collection of {gadgetsData.totalProducts}+ essential accessories.
            From traditional rituals to modern recovery.
          </p>
        </header>

        {/* Quick Nav */}
        <nav className="mb-16 pb-8 border-b border-sauna-ash/30">
          <div className="flex flex-wrap gap-2">
            {gadgetsData.categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-4 py-2 text-sm font-medium text-sauna-slate
                         hover:text-sauna-ink hover:bg-sauna-linen rounded-lg transition-colors"
              >
                {category.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Starter Kits */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-medium text-sauna-ink mb-8">
            Quick Start Kits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <KitCard
              name={gadgetsData.starterKits.budget.name}
              total={gadgetsData.starterKits.budget.total}
              items={gadgetsData.starterKits.budget.items}
              tier="Essential"
            />
            <KitCard
              name={gadgetsData.starterKits.enthusiast.name}
              total={gadgetsData.starterKits.enthusiast.total}
              items={gadgetsData.starterKits.enthusiast.items}
              tier="Enthusiast"
            />
            <KitCard
              name={gadgetsData.starterKits.biohacker.name}
              total={gadgetsData.starterKits.biohacker.total}
              items={gadgetsData.starterKits.biohacker.items}
              tier="Premium"
            />
          </div>
        </section>

        {/* Categories */}
        {gadgetsData.categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="mb-20"
          >
            <div className="mb-8">
              <h2 className="font-display text-2xl font-medium text-sauna-ink mb-2">
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
          </section>
        ))}
      </main>

      <Footer />
    </div>
  )
}

function KitCard({
  name,
  total,
  items,
  tier,
}: {
  name: string
  total: string
  items: string[]
  tier: string
}) {
  return (
    <div className="group bg-sauna-paper rounded-2xl border border-sauna-ash/50 p-6
                    hover:border-sauna-oak/30 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 text-xs font-medium text-sauna-oak uppercase tracking-wider mb-3">
        <span>{tier}</span>
        <span>•</span>
        <span>{total}</span>
      </div>
      <h3 className="text-lg font-medium text-sauna-ink mb-4">{name}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-sauna-slate flex items-start gap-2">
            <svg className="w-4 h-4 text-sauna-oak mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
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
    <div className="group bg-sauna-paper rounded-2xl border border-sauna-ash/50 p-6
                    hover:border-sauna-oak/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-sauna-oak uppercase tracking-wider mb-2">
          <span>{brand}</span>
          <span>•</span>
          <span>{price}</span>
        </div>
        <h3 className="text-lg font-medium text-sauna-ink group-hover:text-sauna-walnut transition-colors">
          {name}
        </h3>
      </div>

      <p className="text-sm text-sauna-slate leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      <div className="pt-4 border-t border-sauna-ash/30">
        <p className="text-sm text-sauna-bark">
          <span className="font-medium">Why:</span> {why}
        </p>
      </div>
    </div>
  )
}
