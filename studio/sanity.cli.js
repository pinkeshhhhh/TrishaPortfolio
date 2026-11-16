import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {projectId: 'vhmnscgr', dataset: 'production'},
  // Hosted editor address: https://trisha-portfolio.sanity.studio
  studioHost: 'trisha-portfolio',
  deployment: {appId: 'kjslvzb6f9ye3p59sb1jgbx5', autoUpdates: true},
})
