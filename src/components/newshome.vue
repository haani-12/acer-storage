<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import SliderbtnLeft from "./SliderbtnLeft.vue";
import SliderbtnRight from "./SliderbtnRight.vue";
import AppButton from "./BaseButton.vue";
const currentIndex = ref(0);
let autoSlideInterval = null;

const news = [
  {
    id: 1,
    img: "/images/homeslider1.jpg",
    title: "Introducing Acer MA200 M.2 2230 SSD",
    desc:
      "Acer MA200 M.2 2230 SSD is designed to transform handheld gaming with lightning-fast speeds of up to 5200 MB/s...",
  },
  {
    id: 2,
    img: "/images/motherbaord.avif",
    title: "Acer FA200 SSD: Elevate Your Digital Experience",
    desc:
      "Acer FA200 SSD brings faster read and write speeds - 7200 MB/s and 6200 MB/s - providing a superior experience for users.",
  },
  {
    id: 3,
    img: "/images/ssd2.jpg",
    title: "Acer Launches New UM310 USB Working with All Devices",
    desc:
      "Acer UM310 USB flash drive, which comes in versions ranging from 8GB to 1TB, allows for data-transfer speeds of 120...",
  },
  {
    id: 4,
    img: "/images/homeslider3.jpg",
    title: "Introducing Acer MA200 M.2 2230 SSD",
    desc:
      "Acer MA200 M.2 2230 SSD is designed to transform handheld gaming with lightning-fast speeds of up to 5200 MB/s...",
  },
  {
    id: 5,
    img: "/images/ssd1.jpg",
    title: "Acer FA200 SSD: Elevate Your Digital Experience",
    desc:
      "Acer FA200 SSD brings faster read and write speeds - 7200 MB/s and 6200 MB/s - providing a superior experience for users.",
  },
  {
    id: 6,
    img: "/images/homeslider4.jpg",
    title: "Acer Launches New UM310 USB Working with All Devices",
    desc:
      "Acer UM310 USB flash drive, which comes in versions ranging from 8GB to 1TB, allows for data-transfer speeds of 120...",
  },
];

const visibleNews = computed(() => {
  const chunk = 3;
  const out = [];
  for (let i = 0; i < news.length; i += chunk) out.push(news.slice(i, i + chunk));
  return out;
});

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % visibleNews.value.length;
  }, 5000);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

function prevSlide() {
  stopAutoSlide();
  currentIndex.value =
    (currentIndex.value - 1 + visibleNews.value.length) % visibleNews.value.length;
  startAutoSlide();
}

function nextSlide() {
  stopAutoSlide();
  currentIndex.value = (currentIndex.value + 1) % visibleNews.value.length;
  startAutoSlide();
}

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <section
    class="py-8 sm:py-12 md:py-16 lg:py-20 bg-[var(--primary-bg)] shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
  >
    <h2
      class="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-[var(--primary-text)]"
    >
      <span class="text-[var(--acer-green)]">NE</span>WS
    </h2>

    <div class="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <!-- News Carousel -->
      <div class="flex overflow-hidden">
        <div
          v-for="(row, idx) in visibleNews"
          :key="idx"
          class="w-full flex-shrink-0 transition-transform duration-500 ease-in-out grid grid-cols-1 md:grid-cols-3 gap-8"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <article
            v-for="item in row"
            :key="item.id"
            class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              :src="item.img"
              :alt="item.title"
              class="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover"
            />
            <div class="p-3 sm:p-4 md:p-6">
              <h3
                class="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 text-[var(--primary-text)] cursor-pointer hover:text-[var(--primary-hover)] transition"
              >
                {{ item.title }}
              </h3>
              <p
                class="text-xs sm:text-sm md:text-base text-[var(--gray-text)] line-clamp-2"
              >
                {{ item.desc }}
              </p>
            </div>
          </article>
        </div>
      </div>
      <div class="mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-center">
        <AppButton
          label="News Room"
          class="mt-4 sm:mt-6 px-2 sm:px-4 text-center text-sm sm:text-base"
        />
      </div>
      <!-- Left Arrow Button -->
      <button
        @click="prevSlide"
        class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-14 md:-translate-x-16 lg:-translate-x-20 w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 bg-[var(--acer-green)] cursor-pointer hover:bg-[var(--primary-hover)] text-[var(--footer-text)] rounded-full items-center justify-center transition"
      >
        <svg
          class="w-4 sm:w-5 md:w-6"
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

      <!-- Right Arrow Button -->
      <button
        @click="nextSlide"
        class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-14 md:translate-x-16 lg:translate-x-20 w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 bg-[var(--acer-green)] cursor-pointer hover:bg-[var(--primary-hover)] text-[var(--footer-text)] rounded-full flex items-center justify-center transition"
      >
        <svg
          class="w-4 sm:w-5 md:w-6"
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
    </div>
  </section>
</template>
