<template>
  <div class="mt-4 text-outline">
    <div
      class="w-[250px] h-[350px] backdrop-brightness-50 border-4 border-gray-300 rounded-lg shadow-lg text-xs flex flex-col justify-between p-2 bg-cover bg-center"
      :style="{ backgroundImage: `url('${communityImage}')` }"
    >
      <!-- Top Bar: Community Name -->
      <div class="flex justify-between">
        <span class="text-[10px] font-semibold text-gray-400">
          {{ community.name || "Unknown Community" }} • Community Feat
        </span>
      </div>

      <!-- Feat Title -->
      <div>
        <h3 class="font-bold text-white text-outline text-sm">
          {{ feat?.name || "Unnamed Feat" }}
        </h3>
      </div>

      <!-- Feat Description -->
      <div class="flex-1 flex flex-col justify-end">
        <p class="text-[11px] text-gray-200">
          {{ feat?.text || "No description." }}
        </p>
      </div>

      <!-- Description -->
      <div class="mt-2 pt-2 border-t border-gray-200 text-[9px]">
        <!-- <p class="text-gray-300 italic">
          {{ community.description || "" }}
        </p> -->
        <span class="text-gray-300 italic" v-if="community.note">
          {{ community.note }}
        </span>
        <div class="mt-1 flex justify-between">
          <span class="text-gray-500"
            >Illus. FLUX.1 Inspo. {{ community.artist }}</span
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
  name: "CommunityCard",
  props: {
    community: { type: Object, required: true },
    feat: { type: Object, required: false },
    index: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  computed: {
    communityImage() {
      return this.feat && this.feat.name
        ? `/communities/${this.feat.name
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
