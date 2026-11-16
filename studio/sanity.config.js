import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {muxInput} from 'sanity-plugin-mux-input'
import {schemaTypes} from './schemas'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Trisha — Portfolio',
  projectId: 'vhmnscgr',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    // Videos uploaded in the "Videos" list go straight to Mux for streaming.
    muxInput({max_resolution_tier: '1080p'}),
  ],
  schema: {types: schemaTypes},
})
