<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findProductBySlug, products as allProducts } from "@/data/products";
import AppButton from "@/components/BaseButton.vue";
import NavHeader from "@/components/navheader.vue";
import footerMain from "@/components/mainFooter.vue";
const route = useRoute();
const router = useRouter();
const product = ref(null);
const loading = ref(true);

function loadProduct(slug) {
  loading.value = true;
  const p = findProductBySlug(slug);
  if (!p) {
    // fallback: navigate to home if not found
    router.replace({ name: "home" });
    return;
  }
  product.value = p;
  loading.value = false;
}

onBeforeMount(() => {
  // initial load
  loadProduct(route.params.slug);
});

onMounted(() => {
  // ensure product updates on navigation
  loadProduct(route.params.slug);
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return allProducts.filter((p) => p.slug !== product.value.slug).slice(0, 4);
});

const specs = computed(() => {
  // try to read product.specs, otherwise provide sensible defaults
  if (product.value && product.value.specs) return product.value.specs;
  return [
    { key: "Interface", value: "M.2 (2280)" },
    { key: "NAND", value: "3D TLC NAND" },
    { key: "Capacity", value: "Up to 2 TB" },
    { key: "Sequential Read", value: "Up to 560 MB/s" },
    { key: "Power", value: "Low power consumption" },
  ];
});

const downloads = computed(() => {
  if (product.value && product.value.downloads) return product.value.downloads;
  return [
    { name: "Datasheet (PDF)", href: "#" },
    { name: "User Manual", href: "#" },
  ];
});
</script>

<template>
  <NavHeader />
  <section class="py-6 sm:py-8 md:py-10 lg:py-12 mx-auto">
    <div class="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav
        class="text-xs sm:text-sm md:text-base text-[var(--gray-text)] mb-4 sm:mb-6"
        aria-label="Breadcrumb"
      >
        <ol class="list-reset flex items-center gap-1 sm:gap-2 flex-wrap">
          <li>
            <router-link to="/" class="hover:text-[var(--primary-hover)]"
              >HOME</router-link
            >
          </li>
          <li class="text-[var(--gray-text)] opacity-60">/</li>
          <li>
            <router-link to="/" class="hover:text-[var(--primary-hover)]"
              >PRODUCTS</router-link
            >
          </li>
          <li class="text-[var(--gray-text)] opacity-60">/</li>
          <li class="font-semibold text-[var(--primary-text)] truncate max-w-[60%]">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div v-if="loading" class="text-center text-[var(--gray-text)]">Loading...</div>

      <div
        v-if="!loading"
        id="overview"
        class="bg-[var(--footer-text)] rounded-lg shadow-md overflow-hidden"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
          <!-- Left: Product image -->
          <div class="p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <img
              :src="product.img"
              :alt="product.title"
              class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain"
            />
          </div>

          <!-- Right: Product details -->
          <div class="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
            <h1
              class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
            >
              {{ product.title }}
            </h1>

            <div class="text-[var(--gray-text)] mb-4">
              <template v-if="Array.isArray(product.desc)">
                <ul class="list-disc pl-5 space-y-2">
                  <li v-for="(line, i) in product.desc" :key="i">{{ line }}</li>
                </ul>
              </template>
              <template v-else>
                <p>{{ product.desc }}</p>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- Tabs / Section Links -->
      <div v-if="!loading" class="mb-6 my-6 sm:my-8 lg:my-10 py-3 sm:py-4">
        <div
          class="bg-[var(--footer-text)] rounded-md px-3 sm:px-4 lg:px-6 overflow-x-auto"
        >
          <ul
            class="flex gap-3 sm:gap-4 md:gap-6 border-b border-[var(--border-gray)] whitespace-nowrap"
          >
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-2 sm:py-3 inline-block text-xs sm:text-sm md:text-base text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium transition"
                >OVERVIEW</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-2 sm:py-3 inline-block text-xs sm:text-sm md:text-base text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium transition"
                >SPECIFICATIONS</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-2 sm:py-3 inline-block text-xs sm:text-sm md:text-base text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium transition"
                >DOWNLOADS</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-2 sm:py-3 inline-block text-xs sm:text-sm md:text-base text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium transition"
                >RELATED PRODUCTS</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- Specifications -->
      <section
        id="specifications"
        v-if="!loading"
        class="mt-8 sm:mt-10 lg:mt-12 bg-[var(--footer-text)] p-4 sm:p-6 lg:p-8 rounded-md"
      >
        <h2
          class="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-[var(--primary-text)]"
        >
          Specifications
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-[var(--gray-text)]"
        >
          <div
            v-for="(s, idx) in specs"
            :key="idx"
            class="flex justify-between py-2 border-b border-[var(--border-gray)]"
          >
            <div class="font-medium text-[var(--primary-text)]">{{ s.key }}</div>
            <div class="text-right">{{ s.value }}</div>
          </div>
        </div>
      </section>

      <!-- Downloads -->
      <section
        id="downloads"
        v-if="!loading"
        class="mt-6 sm:mt-8 lg:mt-10 bg-[var(--footer-text)] p-4 sm:p-6 lg:p-8 rounded-md"
      >
        <h2
          class="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-[var(--primary-text)]"
        >
          Downloads
        </h2>
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <div v-for="(d, i) in downloads" :key="i">
            <AppButton :label="d.name" variant="primary" :bgColor="null" />
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section
        id="related-products"
        v-if="relatedProducts.length"
        class="mt-6 sm:mt-8 lg:mt-10"
      >
        <h2
          class="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-[var(--primary-text)]"
        >
          Related Products
        </h2>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          <router-link
            v-for="rp in relatedProducts"
            :key="rp.slug"
            :to="{ name: 'product-detail', params: { slug: rp.slug } }"
            class="block bg-[var(--footer-text)] p-2 sm:p-4 rounded-md text-center hover:shadow-md transition"
          >
            <img
              :src="rp.img"
              :alt="rp.title"
              class="mx-auto h-16 sm:h-20 md:h-24 object-contain mb-2 sm:mb-3"
            />
            <div class="text-xs sm:text-sm font-medium text-[var(--primary-text)]">
              {{ rp.title }}
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </section>
  <footerMain />
</template>
