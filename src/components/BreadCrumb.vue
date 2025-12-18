<script setup>
const props = defineProps({
  productTitle: {
    type: String,
    default: null,
  },
});
</script>
<template>
  <nav
    class="text-xs sm:text-sm md:text-base text-[var(--gray-text)] mb-6 sm:mb-8"
    aria-label="Breadcrumb"
  >
    <ol class="list-reset flex items-center gap-1 sm:gap-2 flex-wrap">
      <li>
        <router-link to="/" class="hover:text-[var(--primary-hover)]">HOME</router-link>
      </li>
      <li class="text-[var(--gray-text)] opacity-60">/</li>
      <li>
        <router-link to="/products" class="hover:text-[var(--primary-hover)]"
          >PRODUCTS</router-link
        >
      </li>
      <li v-if="productTitle" class="text-[var(--gray-text)] opacity-60">/</li>
      <li
        v-if="productTitle"
        class="font-semibold text-[var(--primary-text)] truncate max-w-[60%]"
      >
        {{ productTitle }}
      </li>
    </ol>
  </nav>
</template>
