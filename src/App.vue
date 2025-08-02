<template>
  <div>
    <AppTitle />
    <section>
      <AbilityCard
        v-for="(ability, idx) in abilities"
        :key="idx"
        :ability="ability"
        :index="idx"
        :total="abilities.length"
        :artist="ability.artist || 'Unknown Artist'"
      />
    </section>
  </div>
</template>

<script>
import AppTitle from "./components/AppTitle.vue";
import AbilityCard from "./components/AbilityCard.vue";

// JSON data for abilities
import abilities from "./data/abilities.json";

export default {
  components: {
    AppTitle,
    AbilityCard,
  },
  data() {
    return {
      abilities,
    };
  },
};
</script>

<style></style>
