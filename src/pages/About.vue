<script setup>
import NavHeader from "../components/navheader.vue";
import footerMain from "@/components/mainFooter.vue";
</script>
<template>
  <NavHeader />
  <main
    class="bg-[url('/images/motherbaord.avif')] min-h-screen bg-[var(--primary-bg)]/100 text-[var(--gray-text)] py-12"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-[var(--primary-bg)] rounded-md shadow-md p-8 sm:p-12 lg:p-16">
        <h1 class="text-2xl sm:text-3xl font-bold mb-6">Acer Storage</h1>

        <div class="prose prose-sm sm:prose lg:prose-lg dark:prose-invert">
          <p>
            Acer branded storage products are designed and manufactured by BIWIN Storage
            Technology company, a leading maker of quality flash memory, DRAM memory and
            solid-state drives (SSD storage devices).
          </p>

          <p>
            Founded in 2010, BIWIN focuses on providing global customers with high-quality
            storage products and specializes in the research, development, manufacturing
            and sales of memory chip application products.
          </p>
        </div>
      </div>
    </div>
  </main>
  <footerMain />
</template>

<style scoped></style>
