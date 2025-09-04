<template>
  <div class="card-filter-dropdown">
    <div class="dropdown-container">
      <button
        class="dropdown-btn"
        @click="toggleDropdown"
        :class="{ active: isDropdownOpen }"
      >
        Compendium
        <span class="dropdown-arrow" :class="{ rotated: isDropdownOpen }"
          >▼</span
        >
      </button>

      <div v-if="isDropdownOpen" class="dropdown-menu">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['dropdown-item', { selected: tab.key === selectedTab }]"
          @click="selectTab(tab.key)"
        >
          {{ tab.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardFilterTabs",
  props: {
    selectedTab: {
      type: String,
      default: "none",
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      tabs: [
        { key: "none", label: "All" },
        { key: "abilities", label: "Abilities" },
        { key: "ancestries", label: "Ancestries" },
        { key: "communities", label: "Communities" },
        { key: "domains", label: "Domains" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectTab(key) {
      this.$emit("update:tab", key);
      this.isDropdownOpen = false;
    },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false;
      }
    });
  },
};
</script>

<style scoped>
.card-filter-dropdown {
  margin-bottom: 1.5rem;
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #c66ef8;
  background: #ffe9c1;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;
  min-width: 150px;
  justify-content: space-between;
}

.dropdown-btn:hover {
  border-color: #e7c5a6;
  background: #d0b3fd;
}

.dropdown-btn.active {
  border-color: #e7e1a6;
  background: #8e7cff;
  box-shadow: 0 2px 8px rgba(182, 166, 231, 0.2);
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #d0b3fd;
  border: 2px solid #e7c5a6;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 2px;
  overflow: hidden;
}

.dropdown-item {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #f8f7ff;
}

.dropdown-item.selected {
  background: #b6a6e7;
  color: #fff;
}

.dropdown-item.selected:hover {
  background: #a394d9;
}
</style>
