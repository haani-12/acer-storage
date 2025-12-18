<script setup>
defineEmits(["next"]);
</script>

<template>
  <button
    @click="$emit('next')"
    class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10"
    aria-label="Next slide"
  >
    ▶
  </button>
</template>
