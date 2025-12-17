<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import AppButton from "./BaseButton.vue";
// Slide data
const slides = ref([
  {
    id: 1,
    title: "Speed That Works",
    subtitle: "as Hard as You Do",
    description: "Acer HT200 DDR5 High Performance Memory",
    cta: "Learn More",
    link: "#",
    bgImage: "/images/homeslider1.jpg",
  },

  {
    id: 2,
    title: "Ultimate Gaming Memory",
    subtitle: "For Extreme Performance",
    description: "Acer Predator RGB DDR5 Memory",
    cta: "Explore Now",
    link: "#",
    bgImage: "/images/homeslider4.jpg",
  },
  {
    id: 3,
    title: "Professional Series",
    subtitle: "For Workstations & Servers",
    description: "Acer Pro ECC Memory Modules",
    cta: "Discover",
    link: "#",
    bgImage: "/images/homeslider3.jpg",
  },
  {
    id: 4,
    title: "High Capacity",
    subtitle: "For Demanding Applications",
    description: "Acer Server Memory 256GB Kits",
    cta: "Learn More",
    link: "#",
    bgImage: "/images/homeslider4.jpg",
  },
]);

const currentSlide = ref(0);
let autoSlideInterval = null;

// Navigation functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

// Auto slide management
const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 8000);
};

const resetAutoSlide = () => {
  clearInterval(autoSlideInterval);
  startAutoSlide();
};

// Initialize and cleanup
onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  clearInterval(autoSlideInterval);
});
</script>

<template>
  <div class="relative w-full mx-auto overflow-hidden shadow-2xl">
    <!-- Slider Container -->
    <div class="relative h-[500px] md:h-[500px]">
      <!-- Slides with Transition -->
      <TransitionGroup name="slide" tag="div" class="relative w-full h-full">
        <div
          v-for="(slide, index) in slides"
          v-show="currentSlide === index"
          :key="slide.id"
          :style="{
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
          :class="[
            'absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center p-8',
          ]"
        >
          <!-- Left Content -->
          <div class="text-[var(--footer-text)] md:w-1/2 p-6 md:p-12">
            <div class="space-y-4">
              <h1 class="text-4xl md:text-5xl font-bold leading-tight">
                {{ slide.title }}
                <span class="block text-3xl md:text-4xl font-semibold mt-2">
                  {{ slide.subtitle }}
                </span>
              </h1>
              <p class="text-xl md:text-2xl font-medium opacity-90">
                {{ slide.description }}
              </p>
              <AppButton
                as="a"
                :href="slide.link"
                target="_blank"
                :label="slide.cta"
                class="mt-8"
              >
                <template #iconRight>→</template>
              </AppButton>
            </div>
          </div>

          <!-- Right Image Placeholder (would be real images in production) -->
          <div class="md:w-1/2 flex items-center justify-center p-8">
            <!-- <div class="relative w-full max-w-md">
              <div
                class="aspect-square rounded-2xl bg-gradient-to-br from-white/20 to-transparent border-2 border-white/30 backdrop-blur-sm flex items-center justify-center"
              >
                <div class="text-center p-8">
                  <div class="text-6xl mb-4">💾</div>
                  <p class="text-white text-xl font-semibold">Memory Module</p>
                  <p class="text-white/80 mt-2">High Performance DDR5</p>
                </div>
              </div>
              <div
                class="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-yellow-400/20 blur-xl"
              ></div>
              <div
                class="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-blue-400/20 blur-xl"
              ></div>
            </div> -->
          </div>
        </div>
      </TransitionGroup>

      <!-- Navigation Buttons -->
      <button
        @click="
          prevSlide();
          resetAutoSlide();
        "
        class="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg
          class="w-6 h-6 text-[var(--footer-text)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        @click="
          nextSlide();
          resetAutoSlide();
        "
        class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center cursor-pointer justify-center hover:bg-white/30 transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- Slide Indicators -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        <button
          v-for="(slide, index) in slides"
          :key="`indicator-${slide.id}`"
          @click="
            goToSlide(index);
            resetAutoSlide();
          "
          :class="[
            'cursor-pointer w-3 h-3 rounded-full transition-all duration-300',
            currentSlide === index
              ? 'bg-[var(--footer-text)] w-8'
              : 'bg-white/50 hover:bg-white/80',
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        />
      </div>

      <!-- Slide Counter -->
      <div
        class="cursor-pointer absolute top-6 right-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-[var(--footer-text)] font-medium z-10"
      >
        {{ currentSlide + 1 }} / {{ slides.length }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Vue Transition Classes */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* Ensure proper stacking */
.slide-leave-active {
  position: absolute;
}
</style>
