<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { findSupportBySlug } from "@/data/support";
import navheader from "@/components/navheader.vue";
import footerMain from "@/components/mainFooter.vue";
const route = useRoute();
const router = useRouter();
const supportItem = ref(null);
const loading = ref(true);

// Contact form state
const formData = ref({
  name: "",
  email: "",
  subject: "",
  description: "",
});

const errors = ref({});
const submitted = ref(false);
const showSuccess = ref(false);

function loadSupport(slug) {
  loading.value = true;
  const item = findSupportBySlug(slug);
  if (!item) {
    router.replace({ name: "home" });
    return;
  }
  supportItem.value = item;
  loading.value = false;
}

function validateForm() {
  errors.value = {};

  if (!formData.value.name.trim()) {
    errors.value.name = "Name is required";
  }

  if (!formData.value.email.trim()) {
    errors.value.email = "Email is required";
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = "Please enter a valid email address";
  }

  if (!formData.value.subject.trim()) {
    errors.value.subject = "Subject is required";
  }

  if (!formData.value.description.trim()) {
    errors.value.description = "Description is required";
  } else if (formData.value.description.trim().length < 10) {
    errors.value.description = "Description must be at least 10 characters";
  }

  return Object.keys(errors.value).length === 0;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleSubmit() {
  submitted.value = true;

  if (validateForm()) {
    // Form is valid - show success message
    showSuccess.value = true;
    // Reset form after 3 seconds
    setTimeout(() => {
      formData.value = { name: "", email: "", subject: "", description: "" };
      submitted.value = false;
      showSuccess.value = false;
    }, 3000);
  }
}

onBeforeMount(() => {
  loadSupport(route.params.slug);
});

onMounted(() => {
  loadSupport(route.params.slug);
});
</script>

<template>
  <navheader />
  <section class="py-12 bg-[var(--primary-bg)]">
    <div class="max-w-4xl mx-auto px-6">
      <h1 class="text-[var(--gray-text)] pb-6 text-center font-bold text-3xl">
        <span class="text-[var(--acer-green)]">Intreact </span>With Our
        <span class="text-[var(--acer-green)]">Support</span> Team
      </h1>
      <div v-if="loading" class="text-center text-[var(--gray-text)]">Loading...</div>

      <div v-else class="bg-[var(--footer-text)] rounded-lg shadow-md overflow-hidden">
        <div class="bg-[var(--acer-green)] text-[var(--footer-text)] p-8">
          <h1 class="text-4xl font-bold mb-2">{{ supportItem.title }}</h1>
          <p class="text-lg">{{ supportItem.description }}</p>
        </div>
        <div class="p-8">
          <!-- Show contact form for contact-us page -->
          <div v-if="supportItem.slug === 'contact-us'">
            <transition name="fade">
              <div
                v-if="showSuccess"
                class="mb-6 p-4 bg-[var(--light-green)] text-[var(--acer-green)] border border-[var(--primary-hover)] rounded-lg"
              >
                <p class="font-semibold">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            </transition>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name and Email in one row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Name Field -->
                <div>
                  <label for="name" class="block font-semibold mb-2">
                    Name <span class="text-[var(--error)]">*</span>
                  </label>
                  <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    placeholder="Your full name"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none transition"
                    :class="[
                      errors.name
                        ? 'border-[var(--error)] bg-[var(--light-red)] focus:ring-2 focus:ring-[var(--error)]'
                        : 'border-[var(--border-gray)] focus:ring-2 focus:ring-[var(--acer-green)]',
                    ]"
                  />
                  <transition name="slide-fade">
                    <p
                      v-if="submitted && errors.name"
                      class="mt-1 text-[var(--error)] text-sm"
                    >
                      {{ errors.name }}
                    </p>
                  </transition>
                </div>

                <!-- Email Field -->
                <div>
                  <label for="email" class="block text font-semibold mb-2">
                    Email <span class="text-[var(--error)]">*</span>
                  </label>
                  <input
                    id="email"
                    v-model="formData.email"
                    type="email"
                    placeholder="your.email@example.com"
                    class="w-full px-4 py-2 border rounded-md focus:outline-none transition"
                    :class="[
                      errors.email
                        ? 'border-[var(--error)] bg-[var(--light-red)] focus:ring-2 focus:ring-[var(--error)]'
                        : 'border-[var(--border-gray)] focus:ring-2 focus:ring-[var(--acer-green)]',
                    ]"
                  />
                  <transition name="slide-fade">
                    <p
                      v-if="submitted && errors.email"
                      class="mt-1 text-[var(--error)] text-sm"
                    >
                      {{ errors.email }}
                    </p>
                  </transition>
                </div>
              </div>

              <!-- Subject Field -->
              <div>
                <label for="subject" class="block text font-semibold mb-2">
                  Subject <span class="text-[var(--error)]">*</span>
                </label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  placeholder="What is this about?"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none transition"
                  :class="[
                    errors.subject
                      ? 'border-[var(--error)] bg-[var(--light-red)] focus:ring-2 focus:ring-[var(--error)]'
                      : 'border-[var(--border-gray)] focus:ring-2 focus:ring-[var(--acer-green)]',
                  ]"
                />
                <transition name="slide-fade">
                  <p v-if="submitted && errors.subject" class="mt-1 text-sm">
                    {{ errors.subject }}
                  </p>
                </transition>
              </div>

              <!-- Description Field -->
              <div>
                <label for="description" class="block text font-semibold mb-2">
                  Description <span class="text-[var(--error)]">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  placeholder="Please describe your issue or question in detail..."
                  rows="5"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none transition resize-none"
                  :class="[
                    errors.description
                      ? 'border-[var(--error)] bg-[var(--light-red)] focus:ring-2 focus:ring-[var(--error)]'
                      : 'border-[var(--border-gray)] focus:ring-2 focus:ring-[var(--acer-green)]',
                  ]"
                ></textarea>
                <transition name="slide-fade">
                  <p
                    v-if="submitted && errors.description"
                    class="mt-1 text-[var(--error)] text-sm"
                  >
                    {{ errors.description }}
                  </p>
                </transition>
              </div>

              <!-- Submit Button -->
              <div class="flex gap-4">
                <button
                  type="submit"
                  class="px-6 py-2 bg-[var(--acer-green)] text-[var(--footer-text)] rounded-md font-semibold hover:bg-[var(--primary-hover)] transition"
                >
                  Send Message
                </button>
                <router-link
                  to="/"
                  class="px-6 py-2 border border-[var(--gray-text)] rounded-md font-semibold hover:bg-[var(--hover-gray)] hover:text-[var(--primary-text)] transition"
                >
                  Cancel
                </router-link>
              </div>
            </form>
          </div>

          <!-- Show default content for other support pages -->
          <div v-else>
            <p class="text-[var(--gray-text)] text-lg leading-relaxed">
              {{ supportItem.content }}
            </p>

            <div class="mt-8 pt-8 border-t border-[var(--gray-text)]">
              <router-link
                to="/"
                class="inline-block px-6 py-2 bg-[var(--acer-green)] text-[var(--footer-text)] rounded-md font-semibold hover:bg-[var(--primary-hover)] transition"
              >
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footerMain />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-5px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}
</style>
