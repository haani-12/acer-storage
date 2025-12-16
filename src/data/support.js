export const supportItems = [
  {
    id: 1,
    slug: 'documentation',
    title: 'Documentation',
    description: 'Access comprehensive guides, manuals, and technical documentation for all Acer products.',
    content: 'Our documentation covers product specifications, installation guides, troubleshooting steps, and best practices for using Acer memory and storage solutions.'
  },
  {
    id: 2,
    slug: 'drivers-tools',
    title: 'Drivers & Tools',
    description: 'Download the latest drivers, firmware updates, and utility tools for optimal performance.',
    content: 'Find and download drivers for your operating system, diagnostic tools, and performance optimization utilities to ensure your Acer products run smoothly.'
  },
  {
    id: 3,
    slug: 'contact-us',
    title: 'Contact Us',
    description: 'Get in touch with our support team for technical assistance and inquiries.',
    content: 'Reach out to Acer support via email, phone, or live chat. Our team is available to assist you with any questions or technical issues.'
  },
  {
    id: 4,
    slug: 'faq',
    title: 'FAQ',
    description: 'Find answers to frequently asked questions about Acer products.',
    content: 'Browse our comprehensive FAQ section covering common questions about installation, compatibility, warranty, and product features.'
  }
]

export function findSupportBySlug(slug) {
  return supportItems.find(s => s.slug === slug)
}
