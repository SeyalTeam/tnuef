import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

import { FormBlock } from '@/blocks/Form/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'

const beatSecretaries = [
  { id: 1, district: 'வட சென்னை', phone: '95514 48356' },
  { id: 2, district: 'தென் சென்னை', phone: '90030 59876' },
  { id: 3, district: 'மத்திய சென்னை', phone: '80720 15501' },
  { id: 4, district: 'திருவள்ளூர்', phone: '89401 11189' },
  { id: 5, district: 'செங்கல்பட்டு', phone: '90808 57086' },
  { id: 6, district: 'காஞ்சிபுரம்', phone: '98848 22022' },
  { id: 7, district: 'ராணிபேட்டை', phone: '99527 02270' },
  { id: 8, district: 'வேலூர் / திருப்பத்தூர்', phone: '94423 15088' },
  { id: 9, district: 'திருவண்ணாமலை', phone: '81225 19121' },
  { id: 10, district: 'விழுப்புரம்', phone: '99436 46286' },
  { id: 11, district: 'கள்ளக்குறிச்சி', phone: '98434 88608' },
  { id: 12, district: 'கடலூர்', phone: '99947 11974' },
  { id: 13, district: 'மயிலாடுதுறை', phone: '95854 49712' },
  { id: 14, district: 'நாகப்பட்டினம்', phone: '90471 96139' },
  { id: 15, district: 'திருவாரூர்', phone: '84896 97388' },
  { id: 16, district: 'தஞ்சாவூர்', phone: '99449 07580' },
  { id: 17, district: 'புதுக்கோட்டை', phone: '94434 20444' },
  { id: 18, district: 'திருச்சி மாநகர்', phone: '76038 16562' },
  { id: 19, district: 'திருச்சி புறநகர்', phone: '79048 69121' },
  { id: 20, district: 'அரியலூர்', phone: '63698 84924' },
  { id: 21, district: 'பெரம்பலூர்', phone: '83006 44103' },
  { id: 22, district: 'கிருஷ்ணகிரி', phone: '82489 92474' },
  { id: 23, district: 'தருமபுரி', phone: '97912 52681' },
  { id: 24, district: 'சேலம்', phone: '98426 03215' },
  { id: 25, district: 'ஈரோடு', phone: '98420 50936' },
  { id: 26, district: 'நீலகிரி', phone: '94871 14031' },
  { id: 27, district: 'கோவை', phone: '99408 06870' },
  { id: 28, district: 'திருப்பூர்', phone: '88834 59333' },
  { id: 29, district: 'நாமக்கல்', phone: '94427 72425' },
  { id: 30, district: 'கரூர்', phone: '96981 54394' },
  { id: 31, district: 'திண்டுக்கல்', phone: '90039 21323' },
  { id: 32, district: 'தேனி', phone: '88381 95232' },
  { id: 33, district: 'மதுரை மாநகர்', phone: '99407 66411' },
  { id: 34, district: 'மதுரை புறநகர்', phone: '97519 45763' },
  { id: 35, district: 'விருதுநகர்', phone: '94863 50013' },
  { id: 36, district: 'சிவகங்கை', phone: '94434 65517' },
  { id: 37, district: 'இராமநாதபுரம்', phone: '94427 57061' },
  { id: 38, district: 'தூத்துக்குடி', phone: '94865 13726' },
  { id: 39, district: 'தென்காசி', phone: '94423 07803' },
  { id: 40, district: 'திருநெல்வேலி', phone: '94886 69346' },
  { id: 41, district: 'கன்னியாகுமரி', phone: '63849 75898' },
]

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: 'contact',
      },
    },
  })

  const page = result.docs?.[0] || null

  if (!page) {
    return <PayloadRedirects url="/contact" />
  }

  // Find the form block in the layout
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formBlock = page.layout?.find((block: any) => block.blockType === 'formBlock') as any

  return (
    <article className="pt-16 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              தீண்டாமை ஒழிப்பு முன்னணி
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">தொடர்புக்கு</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">மின்னஞ்சல்</h3>
                      <a
                        href="mailto:mail@tnuef.com"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        mail@tnuef.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">மாநிலக்குழு அலுவலகம்</h3>
                      <address className="text-slate-600 not-italic leading-relaxed">
                        எண் 6, முதல் தளம், மசூதி சந்து,
                        <br />
                        மசூதி தெரு, சேப்பாக்கம்,
                        <br />
                        சென்னை - 600 005
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 mb-1">Phone</h3>
                      <a
                        href="tel:04447950391"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        04447950391
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Follow us</h2>
                <div className="flex gap-4">
                  {[
                    { Icon: Facebook, href: '#' },
                    { Icon: Twitter, href: '#' },
                    { Icon: Instagram, href: '#' },
                    { Icon: Linkedin, href: '#' },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      className="p-3 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              {formBlock ? (
                <div className="contact-form-wrapper">
                  <FormBlock
                    {...formBlock}
                    id={formBlock.id || undefined}
                    introContent={formBlock.introContent || undefined}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-slate-900 border-b pb-2">
                    தீண்டாமை ஒழிப்பு முன்னணி மாவட்டச் செயலாளர்கள்
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {beatSecretaries.map((secretary) => (
                      <div
                        key={secretary.id}
                        className="p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-slate-700 text-sm">
                            {secretary.district}
                          </span>
                          <a
                            href={`tel:${secretary.phone.replace(/\s/g, '')}`}
                            className="text-blue-600 font-medium text-sm hover:underline whitespace-nowrap"
                          >
                            {secretary.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'contact',
      },
    },
    limit: 1,
  })

  const page = result.docs?.[0]

  return {
    title: page?.meta?.title || 'Contact Us',
    description: page?.meta?.description || 'Get in touch with us.',
  }
}
