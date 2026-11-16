import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// Left-hand menu of the editor. Each list can be reordered by dragging,
// and that order is the order used on the website.
export const structure = (S, context) =>
  S.list()
    .title('Portfolio')
    .items([
      orderableDocumentListDeskItem({type: 'artwork', title: 'Designs (images)', S, context}),
      orderableDocumentListDeskItem({type: 'reel', title: 'Videos', S, context}),
      S.divider(),
      orderableDocumentListDeskItem({type: 'category', title: 'Work tabs', S, context}),
    ])
