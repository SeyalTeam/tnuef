export interface TweetImage {
  id: string
  url: string
  alt: string
  link: string
}

export const getLatestTweetImages = async (): Promise<TweetImage[]> => {
  const token = process.env.TWITTER_BEARER_TOKEN

  // Helper to fetch valid image URL
  // In a real scenario, this would check if the image is actually available
  const getMockImages = () => [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?q=80&w=1000&auto=format&fit=crop', // Vertical colorful abstract
      alt: 'TNUEF Event 1',
      link: 'https://x.com/tnueforg',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000&auto=format&fit=crop', // Vertical food/abstract
      alt: 'TNUEF Update',
      link: 'https://x.com/tnueforg',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1000&auto=format&fit=crop', // Abstract gradient
      alt: 'Latest News',
      link: 'https://x.com/tnueforg',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
      alt: 'Community Meeting',
      link: 'https://x.com/tnueforg',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop',
      alt: 'Announcement',
      link: 'https://x.com/tnueforg',
    },
  ]

  if (!token) {
    console.warn('TWITTER_BEARER_TOKEN is not set. Returning mock data.')
    return getMockImages()
  }

  try {
    // Twitter API V2 Endpoint
    // Fetch latest tweets from the user, including media fields

    // 1. Get User ID
    const userRes = await fetch('https://api.twitter.com/2/users/by/username/tnueforg', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!userRes.ok) {
      throw new Error(`Twitter User Fetch Error: ${userRes.statusText}`)
    }

    const userData = await userRes.json()
    const userId = userData.data?.id

    if (!userId) throw new Error('Twitter User ID not found')

    // 2. Get Tweets with Media
    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=20&expansions=attachments.media_keys&media.fields=url,preview_image_url,type`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 1800 }, // Cache for 30 mins
      },
    )

    if (!tweetsRes.ok) {
      throw new Error(`Twitter Tweets Fetch Error: ${tweetsRes.statusText}`)
    }

    const tweetsData = await tweetsRes.json()

    if (!tweetsData.data) return []

    // 3. Map Media
    const mediaMap = new Map()
    if (tweetsData.includes?.media) {
      tweetsData.includes.media.forEach((m: any) => {
        if (m.type === 'photo') {
          mediaMap.set(m.media_key, m.url)
        }
      })
    }

    // 4. Transform to our interface
    const stories: TweetImage[] = []

    for (const tweet of tweetsData.data) {
      if (tweet.attachments?.media_keys) {
        for (const key of tweet.attachments.media_keys) {
          const imageUrl = mediaMap.get(key)
          if (imageUrl) {
            stories.push({
              id: tweet.id,
              url: imageUrl,
              alt: tweet.text || 'Twitter Story',
              link: `https://x.com/tnueforg/status/${tweet.id}`,
            })
          }
        }
      }
    }

    return stories
  } catch (error) {
    console.error('Error fetching tweets:', error)
    return getMockImages() // Fallback to mock on error
  }
}
