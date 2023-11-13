import { visionTool } from '@sanity/vision'
import { dashboardTool } from '@sanity/dashboard'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { apiVersion, dataset, projectId } from './env'
import { schemaTypes } from '@/sanity/schemas'
import { defaultDocumentNode } from '@/sanity/desk/defaultDocumentNode'
import { deskStructure } from '@/sanity/desk/deskStructure'

import { media } from 'sanity-plugin-media'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['frontpage', 'settings'])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included in `singletonActions`
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },

  plugins: [
    deskTool({
      defaultDocumentNode,
      structure: deskStructure,
    }),
    dashboardTool({
      widgets: [vercelWidget()],
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
