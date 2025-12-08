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
    },
  ],
}
