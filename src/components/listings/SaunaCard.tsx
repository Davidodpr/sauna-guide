import type { Sauna } from '@/lib/types'

interface SaunaCardProps {
  sauna: Sauna
}

export function SaunaCard({ sauna }: SaunaCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {sauna.images[0] && (
        <div className="aspect-video bg-sauna-steam">
          <img
            src={`/images/saunas/${sauna.images[0]}`}
            alt={sauna.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-sauna-dark">{sauna.name}</h3>
          {sauna.rating && (
            <span className="text-sm bg-sauna-warm px-2 py-1 rounded">
              ★ {sauna.rating}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          {sauna.location.city}, {sauna.location.country}
        </p>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {sauna.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {sauna.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-xs bg-sauna-steam text-sauna-dark px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sauna-wood font-medium">{sauna.priceRange}</span>
          <a
            href={`/saunas/${sauna.id}`}
            className="text-sauna-heat hover:underline text-sm font-medium"
          >
            View Details →
          </a>
        </div>
      </div>
    </article>
  )
}
