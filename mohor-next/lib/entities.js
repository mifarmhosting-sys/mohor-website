// Config-driven definition of dashboard-managed collections.
// `table` and column names here are the only ones the generic admin actions will touch.
export const ENTITIES = {
  updates: {
    table: 'updates',
    title: 'Latest Updates',
    singular: 'update',
    description: 'Cards shown in the "Latest Updates" carousel on the home page.',
    orderBy: 'sort_order ASC, id DESC',
    listColumns: ['title', 'date_label', 'published'],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'summary', label: 'Summary', type: 'textarea', required: true },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'date_label', label: 'Date label', type: 'text', required: true, placeholder: 'October 2026' },
      { name: 'link', label: 'Read more link', type: 'text', default: '/event-detail.html' },
      { name: 'sort_order', label: 'Order (lower first)', type: 'number', default: 0 },
      { name: 'published', label: 'Published', type: 'checkbox', default: 1 },
    ],
  },
  events: {
    table: 'events',
    title: 'Events',
    singular: 'event',
    description: 'Upcoming events shown in the "Our Events" section.',
    orderBy: 'event_date ASC',
    listColumns: ['title', 'event_date', 'published'],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'event_date', label: 'Date', type: 'date', required: true },
      { name: 'badge', label: 'Badge text', type: 'text', default: 'NEXT EVENTS' },
      { name: 'link', label: 'Details link', type: 'text', default: '/event-detail.html' },
      { name: 'published', label: 'Published', type: 'checkbox', default: 1 },
    ],
  },
  stories: {
    table: 'stories',
    title: 'Impact Stories',
    singular: 'story',
    description: 'Stories in the "Impact Stories" slider. Add more than one to get pagination dots.',
    orderBy: 'sort_order ASC, id ASC',
    listColumns: ['title', 'published'],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'image_alt', label: 'Image description (alt text)', type: 'text' },
      { name: 'link', label: 'Read more link', type: 'text', default: '/project-detail.html' },
      { name: 'sort_order', label: 'Order (lower first)', type: 'number', default: 0 },
      { name: 'published', label: 'Published', type: 'checkbox', default: 1 },
    ],
  },
  allocations: {
    table: 'allocations',
    title: 'Fund Allocation',
    singular: 'allocation',
    description: 'Slices of the donation chart. Percentages are normalised to 100% automatically.',
    orderBy: 'sort_order ASC, id ASC',
    listColumns: ['label', 'percent'],
    fields: [
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'percent', label: 'Percent', type: 'number', required: true, step: '0.1' },
      { name: 'sort_order', label: 'Order (lower first)', type: 'number', default: 0 },
    ],
  },
};

// Grouped fields for the "Page content" editor (stored in the settings table).
export const CONTENT_GROUPS = [
  {
    title: 'Announcement bar',
    fields: [
      { name: 'announcement_enabled', label: 'Show announcement bar', type: 'checkbox' },
      { name: 'announcement_text', label: 'Text', type: 'text' },
    ],
  },
  {
    title: 'Hero',
    fields: [
      { name: 'hero_title', label: 'Heading', type: 'textarea' },
      { name: 'hero_image', label: 'Background image', type: 'image' },
      { name: 'hero_stat_1', label: 'Stat 1', type: 'text' },
      { name: 'hero_stat_2', label: 'Stat 2', type: 'text' },
    ],
  },
  {
    title: 'About',
    fields: [
      { name: 'about_subtitle', label: 'Small heading', type: 'text' },
      { name: 'about_title', label: 'Title', type: 'text' },
      { name: 'about_p1', label: 'Paragraph 1', type: 'textarea' },
      { name: 'about_p2', label: 'Paragraph 2', type: 'textarea' },
      { name: 'about_image', label: 'Image', type: 'image' },
    ],
  },
  {
    title: "Secretary's desk",
    fields: [
      { name: 'secretary_lead', label: 'Highlighted quote', type: 'textarea' },
      { name: 'secretary_p1', label: 'Paragraph 1', type: 'textarea' },
      { name: 'secretary_p2', label: 'Paragraph 2', type: 'textarea' },
      { name: 'secretary_p3', label: 'Paragraph 3', type: 'textarea' },
      { name: 'secretary_name', label: 'Name', type: 'text' },
      { name: 'secretary_role', label: 'Role', type: 'text' },
      { name: 'secretary_image', label: 'Portrait', type: 'image' },
    ],
  },
  {
    title: 'Section headings',
    fields: [
      { name: 'updates_subtitle', label: 'Updates: small heading', type: 'text' },
      { name: 'updates_title', label: 'Updates: title', type: 'text' },
      { name: 'donations_title', label: 'Donations: title', type: 'text' },
      { name: 'donations_desc', label: 'Donations: description', type: 'textarea' },
      { name: 'cta_title', label: 'Call-to-action heading', type: 'text' },
      { name: 'events_title', label: 'Events: title', type: 'text' },
    ],
  },
];
