<template>
  <div>
    <AppTitle />
    <section class="card-flex">
      <AncestriesCard
        v-for="(card, idx) in ancestryFeatCards"
        :key="`ancestry-feat-${idx}`"
        :ancestry="card.ancestry"
        :feat="card.feat"
        :index="idx"
        :total="ancestryFeatCards.length"
      />
      <AbilityCard
        v-for="(ability, idx) in abilities"
        :key="`ability-${idx}`"
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
import AncestriesCard from "./components/AncestriesCard.vue";
import abilities from "./data/abilities.json";
import ancestries from "./data/ancestries.json";

export default {
  components: {
    AppTitle,
    AbilityCard,
    AncestriesCard,
  },
  data() {
    return {
      abilities,
      ancestries,
    };
  },
  computed: {
    ancestryFeatCards() {
      return this.ancestries.flatMap((ancestry) =>
        (ancestry.feats || []).map((feat) => ({
          ancestry,
          feat,
        }))
      );
    },
  },
};
</script>

<style>
.card-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2rem;
}
</style>
