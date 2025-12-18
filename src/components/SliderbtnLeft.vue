<script setup>
defineEmits(["prev"]);
</script>

<template>
  <button
    @click="$emit('prev')"
    class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10"
    aria-label="Previous slide"
  >
    ◀
  </button>
</template>
