<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

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
  <section class="py-12 bg-[var(--primary-bg)]">
    <h2
      class="text-center text-3xl md:text-4xl font-extrabold tracking-wide mb-12 text-[var(--primary-text)]"
    >
      NEWS
    </h2>

    <div class="relative max-w-6xl mx-auto px-6">
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
            <img :src="item.img" :alt="item.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3
                class="text-lg font-semibold mb-2 text-[var(--primary-text)] cursor-pointer hover:text-[var(--primary-hover)]"
              >
                {{ item.title }}
              </h3>
              <p class="text-sm text-[var(--gray-text)]">{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </div>
      <div class="mt-10 text-center">
        <button
          @click="goTonews"
          class="cursor-pointer inline-block px-6 py-2.5 text-[var(--primary-text)] border border-[var(--gray-text)] rounded-md text-sm font-medium hover:bg-[var(--primary-hover)] hover:text-[var(--footer-text)] transition-colors"
        >
          News Room
        </button>
      </div>
      <!-- Left Arrow Button -->
      <button
        @click="prevSlide"
        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 md:-translate-x-20 w-10 h-10 md:w-12 md:h-12 bg-[var(--acer-green)] cursor-pointer hover:bg-[var(--primary-hover)] text-[var(--footer-text)] rounded-full flex items-center justify-center transition"
      >
        <svg
          class="w-5 h-5 md:w-6 md:h-6"
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
        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 md:translate-x-20 w-10 h-10 md:w-12 md:h-12 bg-[var(--acer-green)] cursor-pointer hover:bg-[var(--primary-hover)] text-[var(--footer-text)] rounded-full flex items-center justify-center transition"
      >
        <svg
          class="w-5 h-5 md:w-6 md:h-6"
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
