<script setup>
import { computed } from "vue";
import AppButton from "./BaseButton.vue";
const emit = defineEmits(["explore"]);
function goToProducts() {
  emit("explore");
}

const products = [
  {
    id: 1,
    img: "/images/Acer_UD200_White_Base_800x800_32G_5600_1.webp",
    alt: "UD200",
    title: "Acer_UD200 White Base",
    desc: [
      "Unleash speeds up to 5600 MHz",
      "Elevate stability with On-Die ECC",
      "Power management IC (PMIC)",
    ],
  },
  {
    id: 2,
    img: "/images/motherbaord.avif",
    alt: "SD200",
    title: "Acer SD200 Laptop DRAM",
    desc: [
      "Faster Load Times and File Transfers",
      "Improved Stability with On-Die ECC",
      "Optimized Power Efficiency",
    ],
    showButton: true,
  },
  {
    id: 3,
    img: "/images/Acer_MA200_White_Base_800x800_1TB_4.jpg",
    alt: "FA200",
    title: "Acer MA200 1TB",
    desc: ["PCIe Gen 4 x4, NVMe 2.0", "Speeds up to 7200 MB/s", "PS5 compatible"],
  },
  {
    id: 4,
    img: "/images/olivier-collet-JMwCe3w7qKk-unsplash.jpg",
    alt: "UT300",
    title: "Acer UT300 USB Flash Drive",
    desc: [
      "USB 3.2 Gen1",
      "Dual Drive USB-C & USB-A",
      "Fast Transfer Speeds Up to 150 MB/s",
    ],
  },
  {
    id: 5,
    img: "/images/Acer SD200 Laptop Dram.avif",
    alt: "HT200",
    title: "Acer SD200 Laptop Dram",
    desc: [
      "Supports Intel XMP 3.0 and AMD EXPO",
      "Premium Aluminum Alloy Heatsink",
      "PMIC for Enhanced Power Stability",
    ],
  },
  {
    id: 6,
    img: "/images/ssd2.png",
    alt: "MA200",
    title: "Acer UT300 USB Flash Drive",
    desc: [
      "Read speed up to 5200 MB/s",
      "PCIe Gen4, M.2 2230",
      "Mini SSD (handheld gaming & ultra devices)",
    ],
  },
];

const rows = computed(() => {
  const chunk = 3;
  const out = [];
  for (let i = 0; i < products.length; i += chunk) out.push(products.slice(i, i + chunk));
  return out;
});
</script>

<template>
  <section class="py-8 sm:py-12 md:py-16 lg:py-20 bg-[var(--primary-bg)]">
    <h2
      class="text-[var(--primary-text)] text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-16"
    >
      <span class="text-[var(--acer-green)]">PROD</span>UCTS
    </h2>

    <div class="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div
        v-for="(row, rIndex) in rows"
        :key="rIndex"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start"
        :class="{ 'mt-8 sm:mt-10 md:mt-12 lg:mt-16': rIndex > 0 }"
      >
        <div v-for="product in row" :key="product.id" class="text-center">
          <div
            class="h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center mb-3 sm:mb-4 md:mb-6"
          >
            <img
              :src="product.img"
              :alt="product.alt"
              class="max-h-24 sm:max-h-28 md:max-h-32 lg:max-h-36 object-contain"
            />
          </div>
          <h3
            class="text-[var(--gray-text)] text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 cursor-pointer hover:text-[var(--primary-hover)] transition"
          >
            {{ product.title }}
          </h3>
          <p class="text-xs sm:text-sm text-[var(--gray-text)] leading-relaxed">
            <span v-for="(line, i) in product.desc" :key="i"
              >{{ line }}<br v-if="i < product.desc.length - 1"
            /></span>
          </p>
        </div>
      </div>
      <div class="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center">
        <AppButton
          label="Explore Products"
          class="mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4 text-center text-sm sm:text-base"
        />
      </div>
    </div>
  </section>
</template>
