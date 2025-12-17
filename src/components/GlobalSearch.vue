<template>
  <div ref="root" class="relative">
    <div class="flex items-center">
      <input
        ref="inputEl"
        v-model="localQuery"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
        @keydown.esc="close"
        @focus="open"
        type="search"
        placeholder="Search products, support..."
        class="w-48 sm:w-80 md:w-96 px-3 py-2 rounded-full border border-[var(--border-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-hover)] bg-[var(--primary-bg)] text-[var(--gray-text)]"
        aria-label="Global search"
      />
    </div>

    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-full sm:w-96 bg-white dark:bg-[var(--footer-text)] shadow-lg rounded-md z-50 max-h-72 overflow-auto"
    >
      <ul>
        <li
          v-if="store.loading"
          class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300"
        >
          Searching...
        </li>

        <li
          v-if="!store.loading && store.results.length === 0 && localQuery"
          class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300"
        >
          No results found
        </li>

        <li
          v-for="(item, idx) in store.results"
          :key="item._type + '-' + item.id"
          @mouseenter="activeIndex = idx"
          @mouseleave="activeIndex = -1"
          @click="select(item)"
          :class="[
            'px-3 py-2 flex items-center gap-3 cursor-pointer',
            activeIndex === idx
              ? 'bg-gray-100 dark:bg-gray-700'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800',
          ]"
        >
          <img v-if="item.img" :src="item.img" class="h-10 w-10 object-cover rounded" />
          <div class="flex-1 min-w-0">
            <div
              class="text-sm font-medium text-[var(--gray-text)] truncate"
              v-html="highlight(item.title)"
            ></div>
            <div class="text-xs text-gray-500 dark:text-gray-300 truncate">
              <span v-if="item._type === 'product'">Product</span>
              <span v-else>Support</span>
              &nbsp;•&nbsp; <span v-html="highlight(subText(item))"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/search";

const store = useSearchStore();
const router = useRouter();
const root = ref(null);
const inputEl = ref(null);
const localQuery = ref(store.query);
const activeIndex = ref(-1);
const showDropdown = ref(false);

watch(localQuery, (val) => {
  store.setQuery(val);
  showDropdown.value = !!val;
  activeIndex.value = -1;
});

watch(
  () => store.results,
  () => {
    // reset index when results change
    activeIndex.value = -1;
  }
);

function subText(item) {
  return item._type === "product" ? item.desc || "" : item.description || "";
}

function escapeRegExp(string = "") {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlight(text = "") {
  const q = (localQuery.value || "").trim();
  if (!q) return text;
  const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
  return String(text).replace(
    re,
    '<mark class="bg-yellow-200 dark:bg-yellow-600/40 rounded">$1</mark>'
  );
}

function open() {
  showDropdown.value = true;
}

function close() {
  showDropdown.value = false;
  store.clear();
  localQuery.value = "";
}

function onArrowDown() {
  if (!store.results.length) return;
  if (activeIndex.value < store.results.length - 1) activeIndex.value++;
  else activeIndex.value = 0;
}

function onArrowUp() {
  if (!store.results.length) return;
  if (activeIndex.value > 0) activeIndex.value--;
  else activeIndex.value = store.results.length - 1;
}

function onEnter() {
  if (activeIndex.value >= 0 && store.results[activeIndex.value]) {
    select(store.results[activeIndex.value]);
  } else if (store.results.length === 1) {
    select(store.results[0]);
  }
}

function select(item) {
  store.selectItem(item);
  showDropdown.value = false;
  localQuery.value = "";
  if (item._type === "product") {
    router.push({ name: "product-detail", params: { slug: item.slug } });
  } else {
    router.push({ name: "support-detail", params: { slug: item.slug } });
  }
}

function onClickOutside(e) {
  if (!root.value) return;
  if (!root.value.contains(e.target)) close();
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<style scoped>
mark {
  padding: 0 0.15rem;
}
</style>
