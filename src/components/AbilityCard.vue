<!-- Define the Card component
This component displays a D&D card with ability details -->

<template>
  <div class="mt-4 text-outline">
    <!-- Card Container, Border, and Background Image-->
    <div
      class="w-[250px] h-[350px] backdrop-brightness-50 border-4 border-gray-300 rounded-lg shadow-lg text-xs flex flex-col justify-between p-2 bg-cover bg-center"
      :style="{ backgroundImage: `url('${abilityImage}')` }"
    >
      <!-- Top Bar: Domain, Type, Level + Rarity-->
      <div class="flex justify-between">
        <span class="text-[10px] font-semibold text-gray-600">
          {{ ability.domain || "General" }} •
          {{ ability.type || "Ability" }}</span
        >
        <span
          :class="[
            'text-[10px] font-semibold',
            +ability.level >= 1 && +ability.level < 3
              ? 'text-white'
              : +ability.level >= 3 && +ability.level < 5
              ? 'text-green-600'
              : +ability.level >= 5 && +ability.level < 7
              ? 'text-blue-600'
              : +ability.level >= 7 && +ability.level < 9
              ? 'text-purple-600'
              : +ability.level >= 9
              ? 'text-orange-600'
              : 'text-red-600',
          ]"
          >Lv {{ ability.level || 0 }} •
          {{
            +ability.level >= 1 && +ability.level < 3
              ? "Common"
              : +ability.level >= 3 && +ability.level < 5
              ? "Uncommon"
              : +ability.level >= 5 && +ability.level < 7
              ? "Rare"
              : +ability.level >= 7 && +ability.level < 9
              ? "Epic"
              : +ability.level >= 9
              ? "Legendary"
              : "Unknown"
          }}</span
        >
      </div>

      <!-- Title: Name of Ability -->
      <div>
        <h3 class="text-sm font-bold text-white">{{ ability.name }}</h3>
      </div>

      <!-- Description -->
      <div class="mt-2 flex flex-col justify-end flex-1">
        <p class="italic text-[11px] text-gray-500 mt-1">
          {{ ability.recall ? `Recall: ${ability.recall}` : "No recall." }}
        </p>
        <p class="text-[11px]">
          {{ ability.text.split("\n")[0] || "No description." }}
        </p>
      </div>

      <!-- Footer -->
      <div class="pt-2 border-t border-gray-200 text-[9px]">
        <p class="text-gray-300 italic">
          {{ ability.text.split("\n").slice(1).join("\n") || "" }}
        </p>
        <div class="mt-1 flex justify-between">
          <span class="text-gray-500"
            >Illus. FLUX.1 Inspo. {{ ability.artist }}</span
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
  name: "AbilityCard",
  props: {
    ability: { type: Object, required: true },
    artist: { type: String, default: "Unknown Artist" },
    index: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  computed: {
    abilityImage() {
      // Handles undefined name gracefully
      return this.ability.name
        ? `/abilities/${this.ability.name
            .toLowerCase()
            .replace(/\s+/g, "_")}_480x672.webp`
        : "";
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for the card here */
.text-outline {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}
</style>
