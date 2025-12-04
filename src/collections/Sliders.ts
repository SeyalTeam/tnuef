import type { CollectionConfig } from 'payload'

export const Sliders: CollectionConfig = {
  slug: 'sliders',
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
        description: 'Title for the slider image (for admin reference)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload slider image (recommended size: 1920x600px)',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional link when slider is clicked',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Order of appearance (lower numbers appear first)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show/hide this slider',
      },
    },
  ],
}
