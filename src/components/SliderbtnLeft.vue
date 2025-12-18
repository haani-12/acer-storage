<script setup>
defineEmits(["prev"]);
</script>

<template>
  <button
    @click="$emit('prev')"
    class="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[var(--primary-bg)] backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[var(--primary-hover)] transition-all duration-300 z-10"
    aria-label="Previous slide"
  >
    ◀
  </button>
</template>
