import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  name: 'category',
  title: 'Work tab',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'category'}),
    {
      name: 'title',
      title: 'Tab name',
      description: 'Shown as a tab in the "Beyond the Visuals" section, e.g. "Brand & Print".',
      type: 'string',
      validation: (rule) => rule.required(),
    },
  ],
}
