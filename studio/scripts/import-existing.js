/*
 * One-time import of the designs that were hard-coded in the website.
 * Run from the studio folder:  npm run import
 * Safe to re-run: documents use fixed ids and images are de-duplicated by Sanity.
 */
import {getCliClient} from 'sanity/cli'
import {LexoRank} from 'lexorank'
import fs from 'node:fs'
import path from 'node:path'

const client = getCliClient({apiVersion: '2025-02-19'})
const IMAGES = path.resolve(process.cwd(), '..', 'images')

const tabs = {
  'Editorial Posters': [
    ['picsart-1', 'Extra — Editorial Cover', 'Poster Series'],
    ['picsart-2', 'Extra — Pink Edition', 'Poster Series'],
    ['picsart-11', 'Extra — Rose Edition', 'Poster Series'],
    ['picsart-3', 'I Am My Own Enemy', 'Typographic Poster'],
    ['picsart-4', 'I Am My Own Enemy — Torn', 'Typographic Poster'],
    ['picsart-6', 'I Am My Own Enemy — Cream', 'Typographic Poster'],
    ['picsart-7', 'Eyes Never Lie — Mono', 'Collage Poster'],
    ['picsart-8', 'Eyes Never Lie — Blush', 'Collage Poster'],
    ['picsart-9', 'Eyes Never Lie — Red', 'Collage Poster'],
  ],
  'Brand & Print': [
    ['cafe-poster', 'Café Opening Hours', 'Poster · Brand'],
    ['coffee-menu', 'Coffee Menu', 'Menu · Print'],
    ['online-course-poster', 'Online Course Promo', 'Poster · Education'],
    ['science-event-poster', 'Welcome to 2026', 'Event Poster'],
  ],
  'Social & Thumbnails': [
    ['fashion-instagram-post', 'Red Brave — Fashion Post', 'Instagram · Fashion'],
    ['kiara-advani-design', 'Kiara Advani Tribute', 'Social Banner', true],
    ['vlog-routine-thumbnail', 'One Day Vlog', 'YouTube Thumbnail', true],
    ['picsart-10', 'Eyes Never Lie — Sage', 'Instagram Post'],
    ['picsart-5', 'My Own Enemy — Mono', 'Instagram Post'],
  ],
}
const notInArchive = new Set(['picsart-6', 'picsart-10'])

const findFile = (name) => {
  const hit = fs.readdirSync(IMAGES).find((f) => path.parse(f).name === name && /\.(png|jpe?g)$/i.test(f))
  if (!hit) throw new Error(`Image not found for ${name}`)
  return path.join(IMAGES, hit)
}

let rank = LexoRank.min()
const nextRank = () => (rank = rank.genNext().genNext()).toString()

const run = async () => {
  const tx = client.transaction()
  let catRank = LexoRank.min()
  for (const [i, tabName] of Object.keys(tabs).entries()) {
    catRank = catRank.genNext().genNext()
    tx.createOrReplace({_id: `category-${i + 1}`, _type: 'category', title: tabName, orderRank: catRank.toString()})
  }
  for (const [i, [tabName, items]] of Object.entries(tabs).entries()) {
    for (const [file, title, caption, wide] of items) {
      const filePath = findFile(file)
      process.stdout.write(`Uploading ${path.basename(filePath)} … `)
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {filename: path.basename(filePath)})
      console.log('done')
      tx.createOrReplace({
        _id: `artwork-${file}`,
        _type: 'artwork',
        orderRank: nextRank(),
        title,
        caption,
        wide: !!wide,
        showInArchive: !notInArchive.has(file),
        category: {_type: 'reference', _ref: `category-${i + 1}`},
        image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      })
    }
  }
  await tx.commit()
  console.log('Imported 3 work tabs and 18 designs.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
