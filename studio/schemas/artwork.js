import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: 'artwork',
  title: 'Design',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'artwork'}),
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      description: 'Shown when someone hovers or taps the piece, e.g. "Café Opening Hours".',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'caption',
      title: 'Small label',
      description: 'The little orange text above the title, e.g. "Poster Series" or "Instagram Post".',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Work tab',
      description: 'Which tab it appears under in "Beyond the Visuals". Leave empty to only show it in the Visual Archive.',
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'showInArchive',
      title: 'Show in the floating "Visual Archive"',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'wide',
      title: 'Landscape / wide piece',
      description: 'Turn on for banners and thumbnails so they get a wider slot.',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category.title', media: 'image'},
    prepare: ({title, subtitle, media}) => ({title, subtitle: subtitle || 'Archive only', media}),
  },
}
