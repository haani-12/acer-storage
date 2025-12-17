<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findProductBySlug, products as allProducts } from "@/data/products";
import AppButton from "@/components/BaseButton.vue";

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
  <section class="py-16">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Breadcrumb -->
      <nav class="text-sm text-[var(--gray-text)] mb-6" aria-label="Breadcrumb">
        <ol class="list-reset flex items-center gap-2 flex-wrap">
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <!-- Left: Product image -->
          <div class="p-6 flex items-center justify-center">
            <img
              :src="product.img"
              :alt="product.title"
              class="w-full max-w-lg object-contain"
            />
          </div>

          <!-- Right: Product details -->
          <div class="p-8 flex flex-col justify-center">
            <h1 class="text-2xl md:text-4xl font-bold mb-4">{{ product.title }}</h1>

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
      <div v-if="!loading" class="mb-6 my-10 py-4">
        <div class="bg-[var(--footer-text)] rounded-md px-4">
          <ul class="flex gap-6 border-b border-[var(--border-gray)]">
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-3 inline-block text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium"
                >OVERVIEW</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-3 inline-block text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium"
                >SPECIFICATIONS</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-3 inline-block text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium"
                >DOWNLOADS</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'home' }"
                class="py-3 inline-block text-[var(--gray-text)] hover:text-[var(--primary-hover)] font-medium"
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
        class="mt-10 bg-[var(--footer-text)] p-6 rounded-md"
      >
        <h2 class="text-lg font-semibold mb-4 text-[var(--primary-text)]">
          Specifications
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[var(--gray-text)]">
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
        class="mt-8 bg-[var(--footer-text)] p-6 rounded-md"
      >
        <h2 class="text-lg font-semibold mb-4 text-[var(--primary-text)]">Downloads</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <div v-for="(d, i) in downloads" :key="i">
            <AppButton :label="d.name" variant="primary" :bgColor="null" />
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section id="related-products" v-if="relatedProducts.length" class="mt-8">
        <h2 class="text-lg font-semibold mb-4 text-[var(--primary-text)]">
          Related Products
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <router-link
            v-for="rp in relatedProducts"
            :key="rp.slug"
            :to="{ name: 'product-detail', params: { slug: rp.slug } }"
            class="block bg-[var(--footer-text)] p-4 rounded-md text-center"
          >
            <img :src="rp.img" :alt="rp.title" class="mx-auto h-24 object-contain mb-3" />
            <div class="text-sm font-medium text-[var(--primary-text)]">
              {{ rp.title }}
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </section>
</template>
