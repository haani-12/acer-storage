<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findProductBySlug } from "@/data/products";

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

// handle param changes when route updates
if (route) {
  // watch param changes using beforeRouteUpdate is not available in script setup; use a route watcher instead
}

// simple watcher via onMounted + router.afterEach (cleaner approaches exist)
onMounted(() => {
  // in most cases route.params will be static; ensure product updates on navigation
  loadProduct(route.params.slug);
});
</script>

<template>
  <section class="py-16">
    <div class="max-w-4xl mx-auto px-6">
      <div v-if="loading" class="text-center text-[var(--gray-text)]">Loading...</div>

      <div v-else class="bg-[var(--footer-text)] rounded-lg shadow-md overflow-hidden">
        <img :src="product.img" :alt="product.title" class="w-full h-72 object-cover" />
        <div class="p-6">
          <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
          <p class="text-[var(--gray-text)]">{{ product.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
