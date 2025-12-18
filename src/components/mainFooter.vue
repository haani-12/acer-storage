<script setup>
import AppButton from "./BaseButton.vue";
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
  <hr class="text-[var(--gray-text)] shadow-[0_-4px_12px_rgba(0,0,0,0.12)]" />
  <footer
    class="bg-[var(--primary-bg)] text-[var(--gray-text)] shadow-[0_-4px_12px_rgba(0,0,0,0.12)]"
  >
    <!-- Main Footer Content -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8"
      >
        <!-- Logo/Company Name -->
        <div class="sm:col-span-1 lg:col-span-1">
          <div class="flex items-center gap-2 mb-3 sm:mb-4">
            <div
              class="w-6 sm:w-8 h-6 sm:h-8 bg-[var(--acer-green)] rounded-full flex items-center justify-center"
            >
              <span class="text-[var(--gray-text)] text-xs sm:text-sm font-bold">A</span>
            </div>
            <h2 class="text-lg sm:text-xl font-bold text-[var(--gray-text)]">Acer</h2>
          </div>
          <p class="text-xs sm:text-sm text-[var(--gray-text)] opacity-90">
            Premium memory and storage solutions
          </p>
        </div>

        <!-- Footer Sections -->
        <div v-for="section in footerSections" :key="section.title" class="sm:col-span-1">
          <h3
            class="text-[var(--gray-text)] font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
          >
            {{ section.title }}
          </h3>
          <ul class="space-y-1 sm:space-y-2">
            <li v-for="link in section.links" :key="link.text">
              <a
                :href="link.href"
                class="text-xs sm:text-sm text-[var(--gray-text)] hover:text-[var(--primary-hover)] transition"
              >
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter Signup -->
        <div class="sm:col-span-2 lg:col-span-1">
          <h3
            class="text-[var(--footer-text)] font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
          >
            {{ newsletter.title }}
          </h3>
          <form @submit.prevent class="flex flex-col gap-2 sm:gap-3">
            <input
              type="email"
              :placeholder="newsletter.placeholder"
              class="px-3 sm:px-4 py-2 rounded-md bg-[var(--primary-bg)] dark:text-[var(--gray-text)] text-[var(--gray-text)] placeholder-[var(--gray-text)] focus:outline-none focus:ring-2 focus:ring-[var(--acer-green)] text-xs sm:text-sm"
            />

            <AppButton
              label="Subscribe"
              class="w-full lg:w-auto text-xs px-2 py-1 text-center"
            />
          </form>
        </div>
      </div>
    </div>
  </footer>
  <!-- Divider -->
  <div class="border-t border-[var(--border-gray)]"></div>
  <!-- Bottom Footer -->
  <div
    class="px-3 sm:px-6 md:px-10 py-6 sm:py-8 bg-[var(--footer-bg)] flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-[var(--footer-text)] gap-4 md:gap-0"
  >
    <p class="text-center md:text-left">&copy; 2025 Acer. All rights reserved.</p>
    <div class="flex gap-4 sm:gap-6 text-xs sm:text-sm mt-2 md:mt-0">
      <a
        href="#"
        class="text-[var(--footer-text)] hover:text-[var(--primary-hover)] transition"
        >Privacy Policy</a
      >
      <a
        href="#"
        class="text-[var(--footer-text)] hover:text-[var(--primary-hover)] transition"
        >Terms of Service</a
      >
      <a
        href="#"
        class="text-[var(--footer-text)] hover:text-[var(--primary-hover)] transition"
        >Cookie Policy</a
      >
    </div>
  </div>
</template>
