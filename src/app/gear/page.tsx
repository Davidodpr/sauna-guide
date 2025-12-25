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
      <div className="aspect-[4/3] bg-gradient-to-br from-sauna-linen to-sauna-ash/20 relative overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-sauna-oak/10 flex items-center justify-center mb-3">
              <span className="text-2xl font-display text-sauna-oak/60">{brand.charAt(0)}</span>
            </div>
            <span className="text-sm text-sauna-stone/60 font-medium line-clamp-2">{name}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-sauna-ink shadow-sm">
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