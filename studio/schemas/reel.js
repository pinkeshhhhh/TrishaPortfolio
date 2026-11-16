import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: 'reel',
  title: 'Video',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'reel'}),
    {
      name: 'video',
      title: 'Video file',
      description: 'Upload the exported video (MP4 or MOV). It is processed for smooth streaming — wait for the preview to appear before publishing.',
      type: 'mux.video',
    },
    {
      name: 'title',
      title: 'Title',
      description: 'e.g. "Mid-Form Celebrity Edit".',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'label',
      title: 'Small label',
      description: 'e.g. "Social Media", "Podcast Cut", "Short Reel".',
      type: 'string',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram link (optional)',
      description: 'If there is no video file, the card opens this Instagram post instead.',
      type: 'url',
    },
    {
      name: 'cover',
      title: 'Cover image (optional)',
      description: 'Only needed for Instagram-only cards. Uploaded videos get a cover automatically.',
      type: 'image',
    },
  ],
  validation: (rule) =>
    rule.custom((doc) => (doc?.video?.asset || doc?.instagramUrl ? true : 'Add a video file or an Instagram link.')),
  preview: {
    select: {title: 'title', subtitle: 'label', media: 'cover'},
  },
}
