<template>
  <navheader />
  <main class="min-h-screen bg-[var(--primary-bg)] text-[var(--gray-text)]">
    <section class="py-6 sm:py-8 md:py-10 lg:py-12 mx-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav
          class="text-xs sm:text-sm md:text-base text-[var(--gray-text)] mb-6 sm:mb-8"
          aria-label="Breadcrumb"
        >
          <ol class="list-reset flex items-center gap-1 sm:gap-2 flex-wrap">
            <li>
              <router-link to="/" class="hover:text-[var(--primary-hover)]"
                >HOME</router-link
              >
            </li>
            <li class="text-[var(--gray-text)] opacity-60">/</li>
            <li class="font-semibold text-[var(--primary-text)]">PRODUCTS</li>
          </ol>
        </nav>

        <h1 class="text-3xl sm:text-4xl font-bold mb-8">All Products</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <router-link
            v-for="product in products"
            :key="product.slug"
            :to="{ name: 'product-detail', params: { slug: product.slug } }"
            class="group bg-[var(--primary-bg)] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-48 bg-[var(--primary-bg)] flex items-center justify-center p-4">
              <img
                :src="product.img"
                :alt="product.title"
                class="h-full w-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div class="bg-[var(--primary-bg)] p-4">
              <h2
                class="text-lg font-semibold text-[var(--gray-text)] group-hover:text-[var(--primary-hover)] transition-colors mb-2"
              >
                {{ product.title }}
              </h2>
              <p class="text-sm text-[var(--gray-text)] line-clamp-2">
                {{ product.desc }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </main>
  <mainFooter />
</template>

<script setup>
import { products } from "@/data/products";
import navheader from "@/components/navheader.vue";
import mainFooter from "@/components/mainFooter.vue";
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
