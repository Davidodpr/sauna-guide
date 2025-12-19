const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2'

interface BeehiivSubscriber {
  email: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referring_site?: string
  custom_fields?: Record<string, string>
}

interface BeehiivResponse {
  data?: {
    id: string
    email: string
    status: string
  }
  errors?: Array<{
    message: string
  }>
}

export async function subscribeToNewsletter(subscriber: BeehiivSubscriber): Promise<BeehiivResponse> {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    throw new Error('Beehiiv API key or publication ID not configured')
  }

  const response = await fetch(
    `${BEEHIIV_API_URL}/publications/${publicationId}/subscriptions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: subscriber.email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: subscriber.utm_source || 'website',
        utm_medium: subscriber.utm_medium || 'organic',
        custom_fields: subscriber.custom_fields,
      }),
    }
  )

  return response.json()
}

export async function getSubscriberCount(): Promise<number> {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    return 0
  }

  try {
    const response = await fetch(
      `${BEEHIIV_API_URL}/publications/${publicationId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    )

    const data = await response.json()
    return data.data?.subscriber_count || 0
  } catch {
    return 0
  }
}
