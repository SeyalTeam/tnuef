import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST() {
  const payload = await getPayload({ config: configPromise })

  try {
    const settings = await payload.findGlobal({
      slug: 'site-settings' as any,
    })

    const newCount = ((settings as any).bookDownloadCount || 0) + 1

    const updatedSettings = await payload.updateGlobal({
      slug: 'site-settings' as any,
      data: {
        bookDownloadCount: newCount,
      } as any,
    })

    return NextResponse.json({ count: (updatedSettings as any).bookDownloadCount })
  } catch (error) {
    console.error('Error incrementing download count:', error)
    return NextResponse.json({ error: 'Failed to increment count' }, { status: 500 })
  }
}
