import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: () => true, // Allow updates for now, might want to restrict in production
  },
  fields: [
    {
      name: 'bookDownloadCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'enableTwitterFeed',
      type: 'checkbox',
      label: 'Enable Twitter Feed Display',
      defaultValue: true,
    },
  ],
}
