document.addEventListener("DOMContentLoaded", function () {
  // Load saved data
  loadData();

  // Set up event listeners for all inputs
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", debounce(saveData, 500));
  });

  // Set up tracker buttons
  setupTracker("HP");
  setupTracker("Stress");
  setupTracker("Armor");

  // Manual save button
  document.getElementById("saveBtn").addEventListener("click", function () {
    saveData();
    showSaveStatus();
  });

  // Reset button
  document.getElementById("resetBtn").addEventListener("click", function () {
    if (confirm("Are you sure you want to reset all data?")) {
      localStorage.removeItem("daggerheartCharacter");
      loadData(); // This will load empty values
      showSaveStatus("Data reset");
    }
  });

  // Auto-update trackers when max values change
  ["maxHP", "maxStress", "maxArmor"].forEach((id) => {
    document.getElementById(id).addEventListener("change", function () {
      const currentId = id.replace("max", "current");
      const currentInput = document.getElementById(currentId);
      if (parseInt(currentInput.value) > parseInt(this.value)) {
        currentInput.value = this.value;
      }
      updateTrackerFill(id.replace("max", ""));
      saveData();
    });
  });

  // Star rating for weapon proficiency
  setupStarRating("primaryProficiency");
  setupStarRating("secondaryProficiency");

  // Gold checkboxes
  document.querySelectorAll(".gold-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", debounce(saveData, 500));
  });

  // Add feature button
  document
    .getElementById("addFeatureBtn")
    .addEventListener("click", addFeature);

  // Add item button
  document.getElementById("addItemBtn").addEventListener("click", addItem);

  // Add inventory weapon button
  document
    .getElementById("addInventoryWeaponBtn")
    .addEventListener("click", addInventoryWeapon);

  // Load any existing features, items, or inventory weapons
  loadDynamicElements();
});

function setupTracker(type) {
  const minusBtn = document.getElementById(`${type.toLowerCase()}Minus`);
  const plusBtn = document.getElementById(`${type.toLowerCase()}Plus`);
  const currentInput = document.getElementById(`current${type}`);
  const maxInput = document.getElementById(`max${type}`);

  minusBtn.addEventListener("click", function () {
    if (parseInt(currentInput.value) > 0) {
      currentInput.value = parseInt(currentInput.value) - 1;
      currentInput.dispatchEvent(new Event("input"));
      updateTrackerFill(type);
    }
  });

  plusBtn.addEventListener("click", function () {
    if (parseInt(currentInput.value) < parseInt(maxInput.value)) {
      currentInput.value = parseInt(currentInput.value) + 1;
      currentInput.dispatchEvent(new Event("input"));
      updateTrackerFill(type);
    }
  });

  currentInput.addEventListener("change", function () {
    const max = parseInt(maxInput.value);
    let value = parseInt(this.value);

    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > max) value = max;

    this.value = value;
    updateTrackerFill(type);
    saveData();
  });
}

function updateTrackerFill(type) {
  const current = parseInt(document.getElementById(`current${type}`).value);
  const max = parseInt(document.getElementById(`max${type}`).value);
  const percentage = (current / max) * 100;
  document.getElementById(
    `${type.toLowerCase()}Fill`
  ).style.width = `${percentage}%`;
}

function setupStarRating(containerId) {
  const container = document.getElementById(containerId);
  const stars = container.querySelectorAll(".star");

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      const parent = this.parentElement;

      // Set active state for clicked star and previous stars
      parent.querySelectorAll(".star").forEach((s, index) => {
        if (index < value) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });

      // Save the rating value in a hidden input
      const inputId = containerId.replace("Proficiency", "WeaponRating");
      let input = document.getElementById(inputId);
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.id = inputId;
        container.appendChild(input);
      }
      input.value = value;

      saveData();
    });
  });
}

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

function saveData() {
  const data = {
    // Basic fields
    ...collectFormData("input, textarea"),

    // Star ratings
    primaryWeaponRating: document.querySelector("#primaryProficiency .active")
      ? document
          .querySelector("#primaryProficiency .active")
          .getAttribute("data-value")
      : 0,
    secondaryWeaponRating: document.querySelector(
      "#secondaryProficiency .active"
    )
      ? document
          .querySelector("#secondaryProficiency .active")
          .getAttribute("data-value")
      : 0,

    // Gold checkboxes
    goldHand1: document.getElementById("goldHand1").checked,
    goldHand2: document.getElementById("goldHand2").checked,
    goldHand3: document.getElementById("goldHand3").checked,
    goldHand4: document.getElementById("goldHand4").checked,
    goldHand5: document.getElementById("goldHand5").checked,
    goldBag1: document.getElementById("goldBag1").checked,
    goldBag2: document.getElementById("goldBag2").checked,
    goldBag3: document.getElementById("goldBag3").checked,
    goldChest1: document.getElementById("goldChest1").checked,
    goldChest2: document.getElementById("goldChest2").checked,

    // Dynamic elements
    features: collectDynamicData("feature"),
    items: collectDynamicData("item"),
    inventoryWeapons: collectDynamicData("inventoryWeapon"),
  };

  localStorage.setItem("daggerheartCharacter", JSON.stringify(data));
  showSaveStatus();
}

function collectFormData(selector) {
  const data = {};
  document.querySelectorAll(selector).forEach((input) => {
    data[input.id] = input.value;
  });
  return data;
}

function collectDynamicData(type) {
  const elements = [];
  const containers = {
    feature: document.getElementById("featuresContainer"),
    item: document.getElementById("inventoryContainer"),
    inventoryWeapon: document.getElementById("inventoryWeaponsContainer"),
  };

  const container = containers[type];
  if (!container) return elements;

  container.querySelectorAll(`.${type}-item`).forEach((item, index) => {
    const elementData = {};

    if (type === "feature") {
      elementData.name = item.querySelector(".feature-name").value;
      elementData.desc = item.querySelector(".feature-desc").value;
    } else if (type === "item") {
      elementData.name = item.querySelector(".item-name").value;
      elementData.desc = item.querySelector(".item-desc").value;
    } else if (type === "inventoryWeapon") {
      elementData.name = item.querySelector(".weapon-name").value;
      elementData.trait = item.querySelector(".weapon-trait").value;
      elementData.dice = item.querySelector(".weapon-dice").value;
      elementData.features = item.querySelector(".weapon-features").value;

      // Get active stars for proficiency
      const activeStar = item.querySelector(".weapon-proficiency .active");
      elementData.rating = activeStar
        ? activeStar.getAttribute("data-value")
        : 0;
    }

    elements.push(elementData);
  });

  return elements;
}

function loadData() {
  const savedData = localStorage.getItem("daggerheartCharacter");
  if (savedData) {
    const data = JSON.parse(savedData);

    // Load basic form fields
    Object.keys(data).forEach((key) => {
      const element = document.getElementById(key);
      if (element) {
        if (element.type === "checkbox") {
          element.checked = data[key];
        } else {
          element.value = data[key];
        }
      }
    });

    // Update tracker fills
    ["HP", "Stress", "Armor"].forEach((type) => {
      updateTrackerFill(type);
    });

    // Set star ratings
    if (data.primaryWeaponRating) {
      setStarRating("primaryProficiency", data.primaryWeaponRating);
    }
    if (data.secondaryWeaponRating) {
      setStarRating("secondaryProficiency", data.secondaryWeaponRating);
    }
  } else {
    // Set default values if no saved data
    document.getElementById("maxHP").value = 10;
    document.getElementById("currentHP").value = 10;
    document.getElementById("maxStress").value = 10;
    document.getElementById("currentStress").value = 0;
    document.getElementById("maxArmor").value = 10;
    document.getElementById("currentArmor").value = 0;

    ["HP", "Stress", "Armor"].forEach((type) => {
      updateTrackerFill(type);
    });
  }
}

function setStarRating(containerId, rating) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll(".star").forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function showSaveStatus(message = "Autosaved") {
  const statusElement = document.getElementById("saveStatus");
  statusElement.textContent = message;
  statusElement.classList.remove("hidden");
  statusElement.classList.add("flex", "items-center");

  setTimeout(() => {
    statusElement.classList.add("opacity-0");
    setTimeout(() => {
      statusElement.classList.add("hidden");
      statusElement.classList.remove("flex", "items-center", "opacity-0");
    }, 500);
  }, 2000);
}

function addFeature() {
  const template = document.getElementById("featureTemplate");
  const clone = template.cloneNode(true);
  clone.id = "";
  clone.classList.remove("hidden");

  // Add delete button functionality
  clone.querySelector(".delete-feature").addEventListener("click", function () {
    clone.remove();
    saveData();
  });

  // Add input listeners
  clone.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", debounce(saveData, 500));
  });

  document.getElementById("featuresContainer").appendChild(clone);
  saveData();
}

function addItem() {
  const template = document.getElementById("itemTemplate");
  const clone = template.cloneNode(true);
  clone.id = "";
  clone.classList.remove("hidden");

  // Add delete button functionality
  clone.querySelector(".delete-item").addEventListener("click", function () {
    clone.remove();
    saveData();
  });

  // Add input listeners
  clone.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", debounce(saveData, 500));
  });

  document.getElementById("inventoryContainer").appendChild(clone);
  saveData();
}

function addInventoryWeapon() {
  const template = document.getElementById("inventoryWeaponTemplate");
  const clone = template.cloneNode(true);
  clone.id = "";
  clone.classList.remove("hidden");

  // Add delete button functionality
  clone
    .querySelector(".delete-inventory-weapon")
    .addEventListener("click", function () {
      clone.remove();
      saveData();
    });

  // Add input listeners
  clone.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", debounce(saveData, 500));
  });

  // Setup star rating
  const starContainer = clone.querySelector(".weapon-proficiency");
  starContainer.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));

      // Set active state for clicked star and previous stars
      starContainer.querySelectorAll(".star").forEach((s, index) => {
        if (index < value) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });

      saveData();
    });
  });

  document.getElementById("inventoryWeaponsContainer").appendChild(clone);
  saveData();
}

function loadDynamicElements() {
  const savedData = localStorage.getItem("daggerheartCharacter");
  if (!savedData) return;

  const data = JSON.parse(savedData);

  // Load features
  if (data.features && data.features.length > 0) {
    data.features.forEach((feature) => {
      addFeature();
      const container = document.getElementById("featuresContainer");
      const lastFeature = container.lastElementChild;

      lastFeature.querySelector(".feature-name").value = feature.name || "";
      lastFeature.querySelector(".feature-desc").value = feature.desc || "";
    });
  }

  // Load items
  if (data.items && data.items.length > 0) {
    data.items.forEach((item) => {
      addItem();
      const container = document.getElementById("inventoryContainer");
      const lastItem = container.lastElementChild;

      lastItem.querySelector(".item-name").value = item.name || "";
      lastItem.querySelector(".item-desc").value = item.desc || "";
    });
  }

  // Load inventory weapons
  if (data.inventoryWeapons && data.inventoryWeapons.length > 0) {
    data.inventoryWeapons.forEach((weapon) => {
      addInventoryWeapon();
      const container = document.getElementById("inventoryWeaponsContainer");
      const lastWeapon = container.lastElementChild;

      lastWeapon.querySelector(".weapon-name").value = weapon.name || "";
      lastWeapon.querySelector(".weapon-trait").value = weapon.trait || "";
      lastWeapon.querySelector(".weapon-dice").value = weapon.dice || "";
      lastWeapon.querySelector(".weapon-features").value =
        weapon.features || "";

      // Set star rating
      if (weapon.rating) {
        const stars = lastWeapon.querySelectorAll(".weapon-proficiency .star");
        stars.forEach((star, index) => {
          if (index < weapon.rating) {
            star.classList.add("active");
          } else {
            star.classList.remove("active");
          }
        });
      }
    });
  }
}
