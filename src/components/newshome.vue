<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import AppButton from "./BaseButton.vue";

const currentIndex = ref(0);
const screenWidth = ref(window.innerWidth);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragDistance = ref(0);
let autoSlideInterval = null;

const news = [
  { id: 1, img: "/images/homeslider1.jpg", title: "Introducing Acer MA200 M.2 2230 SSD", desc: "Acer MA200 M.2 2230 SSD is designed to transform handheld gaming with lightning-fast speeds..." },
  { id: 2, img: "/images/motherbaord.avif", title: "Acer FA200 SSD", desc: "Acer FA200 SSD brings faster read and write speeds for a superior experience." },
  { id: 3, img: "/images/ssd2.jpg", title: "Acer UM310 USB", desc: "Acer UM310 USB flash drive supports fast data transfers across devices." },
  { id: 4, img: "/images/homeslider3.jpg", title: "Acer MA200 Series", desc: "High-performance SSD optimized for compact systems." },
  { id: 5, img: "/images/ssd1.jpg", title: "Acer FA200 Series", desc: "Next-gen SSD designed for power users and creators." },
  { id: 6, img: "/images/homeslider4.jpg", title: "Acer UM310 USB Drive", desc: "Portable, fast, and reliable USB storage solution." },
];

/* Responsive items per slide */
const itemsPerSlide = computed(() => {
  if (screenWidth.value < 768) return 1;   // mobile
  if (screenWidth.value < 1024) return 2;  // tablet
  return 3;                                // desktop/laptop
});

/* Chunk news into slides */
const slides = computed(() => {
  const result = [];
  for (let i = 0; i < news.length; i += itemsPerSlide.value) {
    result.push(news.slice(i, i + itemsPerSlide.value));
  }
  return result;
});

/* Slider controls */
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  resetAutoSlide();
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  resetAutoSlide();
}

/* Touch/drag functionality */
function handleTouchStart(e) {
  isDragging.value = true;
  dragStartX.value = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  dragDistance.value = 0;
  stopAutoSlide();
}

function handleTouchMove(e) {
  if (!isDragging.value) return;
  const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  dragDistance.value = currentX - dragStartX.value;
}

function handleTouchEnd() {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  const threshold = 50; // Minimum drag distance to trigger slide change
  
  if (dragDistance.value < -threshold) {
    nextSlide();
  } else if (dragDistance.value > threshold) {
    prevSlide();
  }
  
  dragDistance.value = 0;
  startAutoSlide();
}

/* Auto-slide */
function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

/* Update screen width on resize */
function updateWidth() {
  screenWidth.value = window.innerWidth;
  currentIndex.value = 0; // reset slide on resize
}

/* Watch for slide count changes */
watch(slides, () => {
  if (currentIndex.value >= slides.value.length) {
    currentIndex.value = 0;
  }
});

onMounted(() => {
  window.addEventListener("resize", updateWidth);
  startAutoSlide();
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
  stopAutoSlide();
});
</script>

<template>
  <section class="py-10 sm:py-14 lg:py-20 bg-[var(--primary-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
    <h2 class="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10 text-[var(--primary-text)]">
      <span class="text-[var(--acer-green)]">NE</span>WS
    </h2>

    <!-- Slider Container with Arrows Outside -->
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Left Arrow - Hidden on mobile, positioned outside -->
      <button
        @click="prevSlide"
        class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full border border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-text)] items-center justify-center shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-200 z-10"
        aria-label="Previous slide"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Right Arrow - Hidden on mobile, positioned outside -->
      <button
        @click="nextSlide"
        class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full border border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-text)] items-center justify-center shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-200 z-10"
        aria-label="Next slide"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Slider Content -->
      <div 
        class="overflow-hidden rounded-xl"
        @mousedown="handleTouchStart"
        @mousemove="handleTouchMove"
        @mouseup="handleTouchEnd"
        @mouseleave="handleTouchEnd"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          class="flex transition-transform duration-300 ease-out"
          :style="{ 
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragDistance}px))`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }"
        >
          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2"
          >
            <article
              v-for="item in slide"
              :key="item.id"
              class="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-[var(--primary-bg)]"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="item.img"
                  :alt="item.title"
                  class="w-full h-40 sm:h-44 lg:h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div class="p-4 sm:p-5">
                <h3 class="text-sm sm:text-base lg:text-lg font-semibold text-[var(--primary-text)] hover:text-[var(--primary-hover)] transition-colors duration-200 cursor-pointer mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-xs sm:text-sm text-[var(--gray-text)] line-clamp-2 leading-relaxed">
                  {{ item.desc }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>

      <!-- Dots Indicator -->
      <div class="flex justify-center mt-8 gap-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="currentIndex = index; resetAutoSlide()"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="[
            index === currentIndex 
              ? 'w-8 bg-[var(--acer-green)]' 
              : 'bg-[var(--gray-text)] hover:bg-gray-400'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>
    </div>

    <!-- News Room Button -->
    <div class="mt-12 text-center">
      <AppButton label="News Room" />
    </div>
  </section>
</template>

<style scoped>
/* Improve touch experience on mobile */
@media (max-width: 767px) {
  .slider-container {
    -webkit-tap-highlight-color: transparent;
    touch-action: pan-y;
  }
}

/* Smooth transitions */
.transition-transform {
  will-change: transform;
}

/* Hide scrollbar for cleaner look */
.overflow-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow-hidden::-webkit-scrollbar {
  display: none;
}
</style>