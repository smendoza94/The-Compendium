# The TTRPG Compendium

## 📓 TTRPG Online Compendium 📓

Welcome to the \*The Compendium\*\*, a tool for players, Dungeon Masters, and creators who want an accessible, visually rich, and modular collection of one-shots, class abilities, custom items, and monsters.

### 🧩 What’s Inside

This compendium hosts a series of **One-Shot Adventures** designed to be flexible for new players and adaptable to varied timelines. Inside, you’ll find:

- 🧙‍♂️ **Character class skill trees**, ideal for visualizing progression
- 🃏 **Virtual playing cards** representing abilities, items, and monsters
- 🗺️ **Locations, maps, and narrative descriptions**
- 📖 A growing library of lore and modular game elements
- 🧑‍🎨 Homebrew content that supports both low-prep DMs and creative worldbuilders

## 🌍 The World

The first featured campaign, **Goblin Hunt**, serves as a pilot one-shot in a rich, original setting:

> A gritty, low-magic, high-lore continent where lost ruins breathe old magic and forgotten gods linger beneath the soil. The Goblin Hunt leads players through hostile forests, tribal politics, and cursed relics.

---

## ✅ Project Milestones

### 📁 Data Setup

- [x] Design database schema (classes, items, monsters)
- [x] Import initial data (Fighter abilities CSV)
- [x] Convert all class abilities to JSON
- [x] Add item and monster datasets

### 🧠 Core Features - Custom Character Sheet Builder

- [ ] Create Vue UI for browsing content
- [ ] Render skill tree for each class
- [ ] Implement search/filter by class, level, keyword
- [ ] Build card viewer component (hover or click to expand)

### 🎨 UI & Worldbuilding

- [ ] Design card template for abilities/items
- [ ] Add artwork, quotes, and rarity icons
- [ ] Include map view for campaigns
- [ ] Integrate Goblin Hunt adventure content

### 🚀 Deployment

- [ ] Set up GitHub Pages
- [ ] Deploy basic static site
- [ ] Add routing for class/item/monster pages

---

## 🛠️ Tech Stack

This project is built using:

- **Vite + Vue.js + Tailwind CSS** for an interactive UI
- **LocalStorage** for immediate and returning saved data
- **PostgreSQL + GraphQL API + Apollo Server** as the data backend

## 📂 Repository Structure (WIP)

/src →→ assets (card art) <br />
→→ Vue components (webapp templates, cards, skill trees, etc.) <br />
→→ data (daggerheart inital json data) <br />
/views → Map views, campaign pages <br />
/public <br />
index.html → Landing page <br />
README.md <br />

## 🤝 Contributions

This project is in early development. Contributions, feedback, and playtesting are welcome once the foundation is live!

**Progress:** 🟩⬜⬜⬜⬜⬜⬜⬜⬜ 10% Complete
