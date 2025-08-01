<template>
  <main class="max-w-screen-xl mx-auto flex gap-2 p-2">
    <SidebarFilters />
    <section class="w-3/5 space-y-2">
      <div class="bg-red-100 p-4 border border-gray-300">
        <h1 class="text-xl font-bold">Goblin Hunt: Featured Campaign</h1>
        <p class="text-xs mt-1">
          Low-magic, high-lore adventure across rugged terrain. Perfect for
          1st–3rd level parties.
        </p>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <div class="bg-white p-2 border border-gray-300 text-xs">
          <h3 class="font-semibold">New Abilities</h3>
          <p>Explore Fighter class skill trees visually.</p>
        </div>
        <div class="bg-white p-2 border border-gray-300 text-xs">
          <h3 class="font-semibold">Magic Items</h3>
          <p>Unique loot tailored for each one-shot adventure.</p>
        </div>
        <div class="bg-white p-2 border border-gray-300 text-xs">
          <h3 class="font-semibold">Bestiary</h3>
          <p>Monsters sorted by region and level.</p>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-sm font-bold mb-2">Fighter Ability Cards</h2>
        <div
          class="border-4 border-grey-500 border-double rounded-lg shadow-lg text-xs flex flex-col justify-between p-2"
        >
          <div class="flex justify-between">
            <div class="flex text-left space-x-1">
              <span class="text-[10px] font-semibold text-black-600"
                >Fighter</span
              >
              <span class="text-[10px] font-semibold italic text-gray-600"
                >Fighter</span
              >
            </div>
            <span class="text-[10px] font-semibold text-green-600"
              >Lv 1 • Common</span
            >
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-800">Archer Fighting</h3>
            <p class="italic text-[10px] text-gray-500 mt-1"></p>
          </div>

          <div class="mt-20 pt-20 flex-1">
            <p class="text-[11px]">
              Gain a +2 bonus to attack rolls with ranged weapons.
            </p>
            <p class="text-gray-600 text-[10px] italic">
              “You adopt a fighting style specialty. Only one can be used per
              session.”
            </p>
          </div>

          <div class="pt-2 border-t border-gray-200 text-[9px]">
            <div class="mt-1 flex justify-between">
              <span class="">Inspo. Kuroimori</span>
              <span class="text-yellow-400">⭐</span>
              <div class="flex items-center space-x-1">
                <span class="">GOB</span>
                <span class="">1 / 153</span>
              </div>
            </div>
            <p class="mt-1 text-[8px]">
              Abridged from Player's Handbook by Wizards of the Coast
            </p>
          </div>
        </div>
      </div>
    </section>
    <RightSidebar />
  </main>
</template>

<script>
import SidebarFilters from "./SidebarFilters.vue";
import RightSidebar from "./RightSidebar.vue";

export default {
  components: {
    SidebarFilters,
    RightSidebar,
  },
};
</script>

<style scoped>
/* Add any specific styles for MainContent here */
</style>
