<script setup>
const footerSections = [
  {
    title: "PRODUCTS",
    links: [
      { text: "DRAM Memory", href: "#" },
      { text: "SSD Storage", href: "#" },
      { text: "USB Flash Drive", href: "#" },
      { text: "All Products", href: "#" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { text: "Documentation", href: "#" },
      { text: "Drivers & Tools", href: "#" },
      { text: "Contact Us", href: "#" },
      { text: "FAQ", href: "#" },
    ],
  },
  {
    title: "ABOUT US",
    links: [
      { text: "Company Info", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Press", href: "#" },
      { text: "Blog", href: "#" },
    ],
  },
  {
    title: "FOLLOW US",
    links: [
      { text: "Facebook", href: "#" },
      { text: "Twitter", href: "#" },
      { text: "LinkedIn", href: "#" },
      { text: "YouTube", href: "#" },
    ],
  },
];

const newsletter = {
  title: "Access our news, exclusive deals",
  placeholder: "Enter your email",
};
</script>

<template>
  <footer class="bg-[var(--footer-bg)] text-[var(--footer-text)]">
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <!-- Logo/Company Name -->
        <div class="md:col-span-1 lg:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div
              class="w-8 h-8 bg-[var(--acer-green)] rounded-full flex items-center justify-center"
            >
              <span class="text-[var(--footer-text)] text-sm font-bold">A</span>
            </div>
            <h2 class="text-xl font-bold text-[var(--footer-text)]">Acer</h2>
          </div>
          <p class="text-sm text-[var(--footer-text)] opacity-90">
            Premium memory and storage solutions
          </p>
        </div>

        <!-- Footer Sections -->
        <div v-for="section in footerSections" :key="section.title" class="md:col-span-1">
          <h3 class="text-[var(--footer-text)] font-semibold mb-4">
            {{ section.title }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.text">
              <a
                :href="link.href"
                class="text-sm text-[var(--footer-text)] hover:text-[var(--primary-hover)] transition"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter Signup -->
        <div class="md:col-span-2 lg:col-span-1">
          <h3 class="text-[var(--footer-text)] font-semibold mb-4">
            {{ newsletter.title }}
          </h3>
          <form @submit.prevent class="flex flex-col gap-3">
            <input
              type="email"
              :placeholder="newsletter.placeholder"
              class="px-4 py-2 rounded-md text-gray-900 placeholder-[var(--footer-text)] focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button
              type="submit"
              class="px-4 py-2 curor-pointer bg-[var(--acer-green)] hover:bg-[var(--primary-hover)] text-[var(--footer-text)] rounded-md font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </footer>
  <!-- Divider -->
  <div class="border-t border-gray-700"></div>
  <!-- Bottom Footer -->
  <div
    class="px-10 py-8 bg-[var(--primary-text)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--footer-text)] pt-5"
  >
    <p>&copy; 2025 Acer. All rights reserved.</p>
    <div class="flex gap-6 mt-4 md:mt-0">
      <a href="#" class="hover:text-[var(--primary-hover)] transition">Privacy Policy</a>
      <a href="#" class="hover:text-[var(--primary-hover)] transition"
        >Terms of Service</a
      >
      <a href="#" class="hover:text-[var(--primary-hover)] transition">Cookie Policy</a>
    </div>
  </div>
</template>
