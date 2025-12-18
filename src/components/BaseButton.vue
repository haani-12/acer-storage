<!-- AppButton.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },

  variant: {
    type: String,
    default: "green", // purple | primary | danger | success
  },

  outline: {
    type: Boolean,
    default: false,
  },

  iconPosition: {
    type: String,
    default: "right",
    validator: (value) => ["left", "right"].includes(value),
  },

  bgColor: String,
  textColor: String,
  borderColor: String,
});

/* Dynamic styles */
const buttonStyles = computed(() => {
  return {
    backgroundColor: props.outline ? "transparent" : props.bgColor,
    color: props.textColor,
    borderColor: props.borderColor,
  };
});

/* Variant classes */
const variantClasses = computed(() => {
  const base =
    "cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300";
  const variants = {
    primary:
      "bg-[var(--acer-green)] text-[var(--primary-text)] hover:bg-[var(--hover-gray)]",

    green: "bg-[var(--acer-green)] text-white hover:bg-[var(--primary-hover)]",

    hero:
      "bg-[var(--primary-bg)] text-[var(--herobtn-text)] hover:bg-[var(--light-green)]",

    danger:
      "bg-[var(--light-red)] text-[var(--error)] hover:bg-[var(--error)] hover:text-white",
  };

  const outlineStyle = "border-2 bg-transparent hover:text-white";

  return [base, props.outline ? outlineStyle : variants[props.variant]];
});
</script>

<template>
  <button :class="variantClasses" :style="buttonStyles">
    <!-- Icon Left -->
    <slot
      v-if="$slots.iconLeft && iconPosition === 'left'"
      name="iconLeft"
      class="w-5 h-5"
    />

    <!-- Label -->
    <span>{{ label }}</span>

    <!-- Icon Right -->
    <slot
      v-if="$slots.iconRight && iconPosition === 'right'"
      name="iconRight"
      class="w-5 h-5 group-hover:translate-x-1 transition-transform"
    />
  </button>
</template>
