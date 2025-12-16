import type { CollectionConfig } from 'payload'

export const Posters: CollectionConfig = {
  slug: 'posters',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'order', 'updatedAt'],
  },
  access: {
    read: () => true, // Public access for reading
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title for the poster image (for admin reference)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload poster image',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show/hide this image in posters',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'External link for the poster (e.g. Twitter post)',
      },
    },
  ],
}
