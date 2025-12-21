import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import gadgetsData from '@/data/gear-merged.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Sauna Gear & Accessories 2026 | Reviews & Guide',
  description: 'Discover top-rated sauna accessories, from authentic Finnish buckets and ladles to infrared blankets and cold plunges. Expert reviews, specs, and buying guide.',
  keywords: ['sauna gear', 'sauna accessories', 'best sauna thermometer', 'sauna hat', 'cold plunge', 'infrared sauna blanket', 'sauna heater', 'finnish sauna'],
  openGraph: {
    title: 'Best Sauna Gear & Accessories 2026 | Reviews & Guide',
    description: 'Discover top-rated sauna accessories, from authentic Finnish buckets and ladles to infrared blankets and cold plunges. Expert reviews, specs, and buying guide.',
    type: 'website',
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
              {category.products.map((product: any) => (
                <ProductCard
                  key={product.name}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  description={product.description}
                  why={product.why}
                  image={product.image}
                  link={product.link}
                  specs={product.specs || undefined}
                  redditSentiment={product.redditSentiment || undefined}
                  rating={product.rating}
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
  image,
  link,
  specs,
  redditSentiment,
  rating
}: {
  name: string
  brand: string
  price: string
  description: string
  why: string
  image?: string
  link?: string
  specs?: Record<string, string>
  redditSentiment?: string
  rating?: number
}) {
  return (
    <div className="group bg-sauna-paper rounded-2xl border border-sauna-ash/50 overflow-hidden
                    hover:border-sauna-oak/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Image Area */}
      <div className="aspect-video bg-sauna-linen relative overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sauna-stone/20">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-sauna-ink shadow-sm">
          {price}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-sauna-oak uppercase tracking-wider">{brand}</span>
            {rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-xs text-sauna-slate font-medium">{rating}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-medium text-sauna-ink group-hover:text-sauna-walnut transition-colors">
            {name}
          </h3>
        </div>

        <p className="text-sm text-sauna-slate leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Specs & Sentiment */}
        {(specs || redditSentiment) && (
          <div className="mb-4 space-y-3">
            {specs?.material && (
              <div className="text-xs text-sauna-stone bg-sauna-linen/50 px-3 py-2 rounded">
                <span className="font-medium text-sauna-ink">Material:</span> {specs.material}
              </div>
            )}
            {redditSentiment && (
              <div className="text-xs text-sauna-stone bg-blue-50/50 px-3 py-2 rounded border border-blue-100/50">
                <span className="font-medium text-blue-900">Reddit Verdict:</span> {redditSentiment}
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-sauna-ash/30 mt-auto">
          <div className="mb-4">
             <p className="text-sm text-sauna-bark">
              <span className="font-medium">Why:</span> {why}
            </p>
          </div>
          
          {link && (
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 px-4 bg-sauna-ink text-white text-sm font-medium rounded-lg
                       hover:bg-sauna-obsidian transition-colors active:transform active:scale-95"
            >
              View Product
            </a>
          )}
        </div>
      </div>
    </div>
  )
}