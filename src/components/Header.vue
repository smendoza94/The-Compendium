<template>
  <header>
    <div class="flex items-center space-x-4 p-2">
      <img src="/dh_48x48.png" alt="Compendium Logo" class="h-12" />
      <h1 class="text-xl font-bold text-white">The Compendium: Daggerheart</h1>
    </div>
    <div class="flex justify-between items-center p-2 text-white">
      <nav class="flex space-x-4 relative">
        <button
          class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
          href="/dashboard"
        >
          Dashboard
        </button>
        <button
          class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
          href="/create"
        >
          Create New
        </button>
        <button
          class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
          href="/load"
        >
          Load Existing
        </button>
        <!-- Compendium button with submenu -->
        <div
          class="relative"
          @mouseenter="dropdownOpen = true"
          @mouseleave="dropdownOpen = false"
        >
          <button class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700">
            Compendium ▼
          </button>
          <ul
            v-if="dropdownOpen"
            class="absolute left-0 w-48 bg-gray-700 border border-gray-700 rounded shadow-lg z-10"
          >
            <li
              v-for="option in menuOptions"
              :key="option"
              class="px-4 py-2 hover:bg-yellow-700 cursor-pointer"
            >
              <a
                class="px-2 py-1 bg-gray-600 rounded hover:bg-gray-700"
                :href="'/' + option.toLowerCase()"
              >
                {{ option }}
              </a>
            </li>
          </ul>
        </div>
        <button
          class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
          href="/map"
        >
          World Map
        </button>
      </nav>
      <div class="flex space-x-2">
        <button
          class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
          href="/login"
        >
          Login
        </button>
        <button
          class="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
          href="/register"
        >
          Register
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      dropdownOpen: false,
      menuOptions: [
        "Abilities",
        "Adversaries",
        "Ancestries",
        "Armor",
        "Classes",
        "Communities",
        "Consumables",
        "Domains",
        "Environments",
        "Items",
        "Subclasses",
        "Weapons",
      ],
    };
  },
};
</script>

<style scoped>
/* Optional: Add custom styles for dropdown */
</style>
