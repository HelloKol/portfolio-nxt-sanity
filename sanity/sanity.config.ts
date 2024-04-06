import {CogIcon, HomeIcon} from '@sanity/icons'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {TiersIcon, TagIcon, ProjectsIcon, PinIcon, CaseIcon, InfoOutlineIcon} from '@sanity/icons'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'
import {schemaTypes} from './schemaTypes'
import config from './config'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['settings'])

export default defineConfig({
  name: 'default',
  title: 'portfolio',
  projectId: config.projectId,
  dataset: config.dataset,

  plugins: [
    simplerColorInput({
      defaultColorFormat: 'rgba',
      enableSearch: true,
    }),
    deskTool({
      structure: (S, {schema}) => {
        return S.list()
          .title('Content')
          .items([
            // Define Home
            S.listItem()
              .title('Home')
              .icon(HomeIcon)
              .id('home')
              .child(S.document().schemaType('home').documentId('home')),
            // Define Home
            S.listItem()
              .title('About')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('Work')
              .icon(CaseIcon)
              .child(
                S.list()
                  .title('Content')
                  .items([
                    // Define Work Index
                    S.listItem()
                      .title('Work Index')
                      .icon(TiersIcon)
                      .id('work.index')
                      .child(S.document().schemaType('work.index').documentId('work.index')),
                    // Define Work
                    S.listItem()
                      .title('Work')
                      .icon(ProjectsIcon)
                      .child(
                        S.documentTypeList('work')
                          .title('Work')
                          .child((workId) =>
                            S.document()
                              .schemaType('work')
                              .documentId(workId)
                              .views([S.view.form()]),
                          ),
                      ),
                    // Define Work Category
                    S.listItem()
                      .title('Category')
                      .icon(TagIcon)
                      .child(
                        S.documentTypeList('work.category')
                          .title('Category')
                          .child((workCategoryId) =>
                            S.document()
                              .schemaType('work.category')
                              .documentId(workCategoryId)
                              .views([S.view.form()]),
                          ),
                      ),
                  ]),
              ),
            // Define Contact
            S.listItem()
              .title('Contact')
              .icon(PinIcon)
              .id('contact')
              .child(S.document().schemaType('contact').documentId('contact')),
            // Define Page Not Found
            S.listItem()
              .title('Page Not Found')
              .icon(InfoOutlineIcon)
              .id('pageNotFound')
              .child(S.document().schemaType('pageNotFound').documentId('pageNotFound')),
            S.divider(),
            S.listItem()
              .title('Settings')
              .icon(CogIcon)
              .id('settings')
              .child(S.document().schemaType('settings').documentId('settings')),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
