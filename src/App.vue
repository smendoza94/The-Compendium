
<template>
  <div>
    <AppTitle />
    <CardFilterTabs :selectedTab="selectedTab" @update:tab="selectedTab = $event" />
    <section class="card-flex">
      <!-- Domains -->
      <DomainCard
        v-if="selectedTab === 'domains'"
        v-for="(domain, idx) in domains"
        :key="`domain-${idx}`"
        :domain="domain"
        :index="idx"
        :total="domains.length"
      />
      <!-- Communities -->
      <CommunityCard
        v-if="selectedTab === 'communities'"
        v-for="(card, idx) in communityFeatCards"
        :key="`community-feat-${idx}`"
        :community="card.community"
        :feat="card.feat"
        :index="idx"
        :total="communityFeatCards.length"
      />
      <!-- Ancestries -->
      <AncestriesCard
        v-if="selectedTab === 'ancestries'"
        v-for="(card, idx) in ancestryFeatCards"
        :key="`ancestry-feat-${idx}`"
        :ancestry="card.ancestry"
        :feat="card.feat"
        :index="idx"
        :total="ancestryFeatCards.length"
      />
      <!-- Abilities -->
      <AbilityCard
        v-if="selectedTab === 'abilities'"
        v-for="(ability, idx) in abilities"
        :key="`ability-${idx}`"
        :ability="ability"
        :index="idx"
        :total="abilities.length"
        :artist="ability.artist || 'Unknown Artist'"
      />
      <!-- None: show nothing -->
    </section>
  </div>
</template>

<script>
import AppTitle from "./components/AppTitle.vue";
import CardFilterTabs from "./components/CardFilterTabs.vue";
import AbilityCard from "./components/AbilityCard.vue";
import AncestriesCard from "./components/AncestriesCard.vue";
import CommunityCard from "./components/CommunityCard.vue";
import DomainCard from "./components/DomainCard.vue";
import abilities from "./data/abilities.json";
import ancestries from "./data/ancestries.json";
import communities from "./data/communities.json";
import domains from "./data/domains.json";

export default {
  components: {
    AppTitle,
    CardFilterTabs,
    AbilityCard,
    AncestriesCard,
    CommunityCard,
    DomainCard,
  },
  data() {
    return {
      abilities,
      ancestries,
      communities,
      domains,
      selectedTab: 'none',
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
    communityFeatCards() {
      return this.communities.flatMap((community) =>
        (community.feats || []).map((feat) => ({
          community,
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
