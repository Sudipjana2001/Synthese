import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Studio')
    .items([
      // ⚙️ Site Settings Singleton
      S.listItem()
        .title('Site Settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Site Settings')
        ),

      S.divider(),

      // 📄 Page Settings Singletons
      S.listItem()
        .title('Pages')
        .icon(() => '📄')
        .child(
          S.list()
            .title('Page Settings')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(() => '🏠')
                .child(
                  S.document()
                    .schemaType('homePage')
                    .documentId('homePage')
                    .title('Home Page Configuration')
                ),
              S.listItem()
                .title('Blog Page')
                .icon(() => '📝')
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                    .title('Blog Page Configuration')
                ),
              S.listItem()
                .title('Projects Page')
                .icon(() => '💼')
                .child(
                  S.document()
                    .schemaType('projectsPage')
                    .documentId('projectsPage')
                    .title('Projects Page Configuration')
                ),
              S.listItem()
                .title('Digital Garden Page')
                .icon(() => '🌿')
                .child(
                  S.document()
                    .schemaType('gardenPage')
                    .documentId('gardenPage')
                    .title('Digital Garden Configuration')
                ),
              S.listItem()
                .title('About Page')
                .icon(() => '👤')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page Configuration')
                ),
            ])
        ),

      S.divider(),

      // ✍️ Editorial & Content
      S.listItem()
        .title('Blog Posts')
        .icon(() => '📰')
        .schemaType('post')
        .child(S.documentTypeList('post').title('All Blog Posts')),

      S.listItem()
        .title('Projects')
        .icon(() => '🚀')
        .schemaType('project')
        .child(S.documentTypeList('project').title('All Projects')),

      S.listItem()
        .title('Garden Notes')
        .icon(() => '🌱')
        .schemaType('gardenNote')
        .child(S.documentTypeList('gardenNote').title('All Garden Notes')),

      S.listItem()
        .title('Timeline & Milestones')
        .icon(() => '⏱️')
        .schemaType('timeline')
        .child(S.documentTypeList('timeline').title('Career Timeline')),

      S.divider(),

      // 🏷️ Taxonomies & People
      S.listItem()
        .title('Authors')
        .icon(() => '✍️')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),

      S.listItem()
        .title('Categories')
        .icon(() => '🏷️')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
    ])
