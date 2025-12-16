export const products = [
  {
    id: 1,
    slug: 'ut300',
    title: 'Acer UT300 USB Flash Drive',
    img: '/images/olivier-collet-JMwCe3w7qKk-unsplash.jpg',
    desc: 'USB 3.2 Gen1 dual-drive USB-C & USB-A. Fast transfer speeds up to 150 MB/s.'
  },
  {
    id: 2,
    slug: 'up300',
    title: 'Acer UP300 USB Flash Drive',
    img: '/images/ssd1.jpg',
    desc: 'Compact USB flash drive with reliable performance for daily use.'
  },
  {
    id: 3,
    slug: 'uf300',
    title: 'Acer UF300 USB Flash Drive',
    img: '/images/ssd2.jpg',
    desc: 'High-speed USB drive optimized for media and backup tasks.'
  },
  {
    id: 4,
    slug: 'um310',
    title: 'Acer UM310 USB Flash Drive',
    img: '/images/homeslider1.jpg',
    desc: 'Versatile UM310 series, available in sizes from 8GB to 1TB.'
  }
]

export function findProductBySlug(slug) {
  return products.find(p => p.slug === slug)
}
