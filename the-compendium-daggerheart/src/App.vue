<template>
  <div>
    <Header />
    <main>
      <SidebarFilters />
      <MainContent />
      <RightSidebar />
      <div style="display: flex; flex-wrap: wrap; gap: 1rem">
        <AbilityCard
          v-for="(ability, idx) in abilities"
          :key="idx"
          :ability="ability"
          :index="idx"
          :total="abilities.length"
          :artist="ability.artist || 'Unknown Artist'"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AbilityCard from "./components/AbilityCard.vue";
import SidebarFilters from "./components/SidebarFilters.vue";
import MainContent from "./components/MainContent.vue";
import RightSidebar from "./components/RightSidebar.vue";
import abilities from "./data/abilities.json";

export default {
  components: {
    Header,
    AbilityCard,
    SidebarFilters,
    MainContent,
    RightSidebar,
  },
  data() {
    return {
      abilities,
    };
  },
};
</script>

<style link rel="stylesheet" href="./styles.css"></style>
