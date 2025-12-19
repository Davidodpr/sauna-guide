export interface Sauna {
  id: string
  name: string
  location: {
    city: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  type: 'public' | 'private' | 'hotel' | 'spa'
  features: string[]
  priceRange: '$' | '$$' | '$$$'
  website?: string
  description: string
  images: string[]
  rating?: number
}

export interface Guide {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  content: string
}

export interface NewsletterSubscription {
  email: string
  subscribedAt: string
}
