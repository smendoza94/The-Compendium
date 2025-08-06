<template>
  <div class="mt-4 text-outline">
    <div
      class="w-[250px] h-[350px] backdrop-brightness-50 border-4 border-gray-300 rounded-lg shadow-lg text-xs flex flex-col justify-between p-2 bg-cover bg-center"
      :style="{ backgroundImage: `url('${domainImage}')` }"
    >
      <!-- Top Bar: Domain Name -->
      <div class="flex justify-between">
        <span class="text-[10px] font-semibold text-gray-400">
          {{ domain.name || "Unknown Domain" }} • Domain
        </span>
      </div>

      <!-- Domain Title -->
      <div>
        <h3 class="font-bold text-white text-outline text-sm">
          {{ domain.name }}
        </h3>
      </div>

      <!-- Domain Description -->
      <div class="flex-1 flex flex-col justify-end">
        <p class="text-[11px] text-gray-200">
          {{ domain.description || "No description." }}
        </p>
      </div>

      <!-- Footer -->
      <div class="pt-2 text-[9px]">
        <div class="mt-1 flex justify-between">
          <span class="text-gray-500"
            >Illus. FLUX.1 Inspo. {{ domain.artist }}</span
          >
          <span class="text-gray-400"> {{ index + 1 }} / {{ total }} </span>
        </div>
        <p class="text-gray-400 mt-1">
          Abridged from Starke, Spenser, et al. Daggerheart Core Set. Darrington
          Press, 2025.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DomainCard",
  props: {
    domain: { type: Object, required: true },
    index: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  computed: {
    domainImage() {
      return this.domain.name
        ? `/domains/${this.domain.name
            .toLowerCase()
            .replace(/\s+/g, "_")}_480x672.webp`
        : "";
    },
  },
};
</script>

<style scoped>
.text-outline {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
