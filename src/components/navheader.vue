<script setup>
import { ref, nextTick, computed } from "vue";
import { products as productList } from "@/data/products";
import { supportItems } from "@/data/support";

const isSearchOpen = ref(false);
const searchQuery = ref("");
const isProductsOpen = ref(false);
const isSupportOpen = ref(false);
const isAboutOpen = ref(false);
const hoveredCategory = ref(null);

const categories = [
  { key: "pcie", label: "PCIe M.2 SSD", slugs: ["ut300", "up300"] },
  { key: "sata25", label: "SATA 2.5 SSD", slugs: ["uf300"] },
  { key: "sata_m2", label: "SATA M.2 SSD", slugs: ["um310"] },
  { key: "memory", label: "Memory", slugs: ["ut300"] },
  { key: "memory_card", label: "Memory Card", slugs: ["up300"] },
  { key: "usb", label: "USB Flash Drive", slugs: ["ut300", "um310", "uf300"] },
];

const previewProducts = computed(() => {
  const catKey = hoveredCategory.value || categories[0].key;
  const cat = categories.find((c) => c.key === catKey) || categories[0];
  const items = productList.filter((p) => cat.slugs.includes(p.slug));
  return items.slice(0, 3);
});

function openSearch() {
  isSearchOpen.value = true;
  nextTick(() => {
    document.getElementById("search-input")?.focus();
  });
}

function closeSearch() {
  isSearchOpen.value = false;
  searchQuery.value = "";
}
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-[var(--primary-bg)] border-b border-gray-200 py-4 relative shadow-lg"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Official Licensee -->
        <div class="flex items-center">
          <svg
            width="90"
            height="40"
            viewBox="0 0 415 100"
            xmlns="http://www.w3.org/2000/svg"
            class="w-auto items-center"
          >
            <path d="M0 50 L30 0 L60 50 L30 100 Z" fill="#00A99D" />
            <text
              x="80"
              y="65"
              font-family="Arial, sans-serif"
              font-size="90"
              font-weight="bold"
              fill="#00A99D"
              class="items-center"
            >
              acer
            </text>
          </svg>
          <div class="flex items-center">
            <span class="text-[var(--gray-text)] text-4xl">|</span>
            <span class="ml-3 text-[var(--gray-text)] text-sm uppercase tracking-wider">
              Official <br />
              Licensee
            </span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-12 relative">
          <!-- Products with Dropdown -->
          <div class="relative">
            <a
              href="#"
              @mouseenter="isProductsOpen = true"
              @mouseleave="isProductsOpen = false"
              class="text-[var(--gray-text)] hover:text-[var(--gray-hover)] text-lg font-medium uppercase tracking-wide transition-colors"
            >
              Products
            </a>

            <!-- Dropdown Mega Menu -->
            <transition name="dropdown">
              <div
                v-if="isProductsOpen"
                class="absolute left-0 top-full pt-2 w-[720px]"
                @mouseenter="isProductsOpen = true"
                @mouseleave="isProductsOpen = false"
              >
                <div class="bg-[var(--footer-text)] shadow-xl rounded-lg overflow-hidden">
                  <div class="grid grid-cols-12 gap-2 py-8 px-12">
                    <!-- Left: Categories (dynamic) -->
                    <div class="col-span-3">
                      <ul class="space-y-4">
                        <li v-for="cat in categories" :key="cat.key">
                          <a
                            href="#"
                            @mouseenter="hoveredCategory = cat.key"
                            class="text-lg font-semibold text-[var(--gray-text)] hover:text-[var(--primary-hover)] block"
                          >
                            {{ cat.label }}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <!-- Right: Product Previews (based on hovered category) -->
                    <div class="col-span-9 grid grid-cols-2 gap-4">
                      <router-link
                        v-for="p in previewProducts"
                        :key="p.slug"
                        :to="{ name: 'product-detail', params: { slug: p.slug } }"
                        class="text-center block"
                      >
                        <img
                          :src="p.img"
                          :alt="p.title"
                          class="mx-auto mb-3 object-contain h-20"
                        />
                        <p class="text-sm text-[var(--gray-text)]">{{ p.title }}</p>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Support with Dropdown -->
          <div class="relative">
            <router-link
              :to="{ name: 'support-detail', params: { slug: 'documentation' } }"
              @mouseenter="isSupportOpen = true"
              @mouseleave="isSupportOpen = false"
              class="text-[var(--gray-text)] hover:text-[var(--primary-hover)] text-lg font-medium uppercase tracking-wide transition-colors"
            >
              Support
            </router-link>

            <!-- Support Dropdown -->
            <transition name="dropdown">
              <div
                v-if="isSupportOpen"
                class="absolute left-0 top-full pt-2 w-48"
                @mouseenter="isSupportOpen = true"
                @mouseleave="isSupportOpen = false"
              >
                <div class="bg-[var(--footer-text)] shadow-lg rounded-lg overflow-hidden">
                  <ul class="space-y-3 py-2 px-4">
                    <li v-for="item in supportItems" :key="item.slug">
                      <router-link
                        :to="{ name: 'support-detail', params: { slug: item.slug } }"
                        class="text-lg font-semibold text-[var(--gray-text)] hover:text-[var(--primary-hover)] block"
                      >
                        {{ item.title }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </transition>
          </div>

          <!-- About Us with Dropdown -->
          <div class="relative">
            <a
              href="#"
              @mouseenter="isAboutOpen = true"
              @mouseleave="isAboutOpen = false"
              class="text-[var(--gray-text)] hover:text-[var(--primary-hover)] text-lg font-medium uppercase tracking-wide transition-colors"
            >
              About Us
            </a>

            <!-- About Dropdown -->
            <transition name="dropdown">
              <div
                v-if="isAboutOpen"
                class="absolute left-0 top-full pt-2 w-48"
                @mouseenter="isAboutOpen = true"
                @mouseleave="isAboutOpen = false"
              >
                <div class="bg-[var(--footer-text)] shadow-lg rounded-lg overflow-hidden">
                  <ul class="space-y-3 py-4 px-4">
                    <li>
                      <a
                        href="#"
                        class="text-lg font-semibold text-[var(--gray-text)] hover:text-[var(--primary-hover)]"
                        >Company Info</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-lg font-semibold text-[var(--gray-text)] hover:text-[var(--primary-hover)]"
                        >Careers</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-lg font-semibold text-[var(--gray-text)] hover:text-[var(--primary-hover)]"
                        >Press</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="text-lg font-semibold text-[var(--gray-text)] hover:text-[var(--primary-hover)]"
                        >Blog</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Search Area -->
        <div class="flex items-center">
          <transition name="fade">
            <button
              v-if="!isSearchOpen"
              @click="openSearch"
              class="cursor-pointer text-[var(--gray-text)] hover:text-[var(--gray-hover)] focus:outline-none transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </transition>

          <transition name="search">
            <div
              v-if="isSearchOpen"
              class="absolute right-0 top-0 h-16 flex items-center pr-4 pl-2 bg-[var(--primary-bg)] md:static md:bg-transparent"
            >
              <button
                @click="closeSearch"
                class="cursor-pointer text-[var(--gray-text)] hover:text-[var(--gray-hover)] mr-3"
              >
                ✕
              </button>

              <input
                id="search-input"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-48 md:w-64 px-4 py-2 border border-gray-300 rounded-full"
              />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.search-enter-active,
.search-leave-active {
  transition: all 0.3s ease;
}
.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
