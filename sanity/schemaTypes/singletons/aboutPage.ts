import { defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Page: About',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Me',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Building at the intersection of engineering and design craft.',
    },
    {
      name: 'profileImage',
      title: 'Profile Portrait Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    },
    {
      name: 'bioStory',
      title: 'Full Story / Bio Content',
      type: 'blockContent',
    },
    {
      name: 'resumeUrl',
      title: 'Resume / CV Download URL',
      type: 'string',
    },
    {
      name: 'skillsHeadline',
      title: 'Skills Section Title',
      type: 'string',
      initialValue: 'Core Competencies & Tooling',
    },
    {
      name: 'skills',
      title: 'Skills / Tech List',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'showTimeline',
      title: 'Show Experience / Career Timeline',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'timelineHeading',
      title: 'Timeline Section Heading',
      type: 'string',
      initialValue: 'Experience & Milestones',
    },
    {
      name: 'seo',
      title: 'About Page SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: 'About Page Settings',
        subtitle: title || 'Configure about page bio, skills, and timeline',
      }
    },
  },
})
