const CART_STORAGE_KEY = "store-cart";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const cartButton = document.querySelector(".cart-button");
const cartDrawer = document.querySelector(".cart-drawer");
const cartBackdrop = document.querySelector(".cart-backdrop");
const cartClose = document.querySelector(".cart-close");
const cartItemsContainer = document.querySelector("[data-cart-items]");
const cartEmptyState = document.querySelector("[data-cart-empty]");
const cartTotal = document.querySelector("[data-cart-total]");
const cartCountNodes = document.querySelectorAll("[data-cart-count]");

function getProducts() {
  return window.STORE_PRODUCTS || [];
}

function getProductById(productId) {
  return typeof window.getStoreProductById === "function"
    ? window.getStoreProductById(productId)
    : null;
}

function readCart() {
  try {
    const rawCart = localStorage.getItem(CART_STORAGE_KEY);
    return rawCart ? JSON.parse(rawCart) : [];
  } catch (error) {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function formatPrice(value) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

function getCartDetailedItems() {
  return readCart()
    .map((entry) => {
      const product = getProductById(entry.id);
      if (!product) {
        return null;
      }

      return {
        ...entry,
        product
      };
    })
    .filter(Boolean);
}

function updateCartCount() {
  const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
  cartCountNodes.forEach((node) => {
    node.textContent = String(count);
  });
}

function renderCart() {
  if (!cartItemsContainer || !cartEmptyState || !cartTotal) {
    updateCartCount();
    return;
  }

  const detailedItems = getCartDetailedItems();
  const total = detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  cartItemsContainer.innerHTML = "";

  if (detailedItems.length === 0) {
    cartEmptyState.hidden = false;
    cartTotal.textContent = formatPrice(0);
    updateCartCount();
    return;
  }

  cartEmptyState.hidden = true;

  detailedItems.forEach((item) => {
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="cart-item-visual ${item.product.visualClass}"></div>
      <div class="cart-item-copy">
        <strong>${item.product.name}</strong>
        <span>${item.product.priceLabel}</span>
        <div class="cart-item-controls">
          <button type="button" data-cart-decrement="${item.product.id}" aria-label="Decrease quantity">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-increment="${item.product.id}" aria-label="Increase quantity">+</button>
          <button type="button" class="cart-remove" data-cart-remove="${item.product.id}">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(row);
  });

  cartTotal.textContent = formatPrice(total);
  updateCartCount();
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) {
    return;
  }

  const cart = readCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  writeCart(cart);
  renderCart();
  openCart();
}

function updateCartItem(productId, delta) {
  const cart = readCart()
    .map((item) => {
      if (item.id !== productId) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + delta
      };
    })
    .filter((item) => item.quantity > 0);

  writeCart(cart);
  renderCart();
}

function removeCartItem(productId) {
  const cart = readCart().filter((item) => item.id !== productId);
  writeCart(cart);
  renderCart();
}

function openCart() {
  if (!cartDrawer || !cartBackdrop || !cartButton) {
    return;
  }

  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartButton.setAttribute("aria-expanded", "true");
  cartBackdrop.hidden = false;
  document.body.classList.add("cart-open");
}

function closeCart() {
  if (!cartDrawer || !cartBackdrop || !cartButton) {
    return;
  }

  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartButton.setAttribute("aria-expanded", "false");
  cartBackdrop.hidden = true;
  document.body.classList.remove("cart-open");
}

function bindProductCards() {
  const cards = document.querySelectorAll(".product-card.is-clickable");

  cards.forEach((card) => {
    const productId = card.getAttribute("data-product-id");

    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) {
        return;
      }

      window.location.href = `product.html?id=${productId}`;
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
}

function bindAddToCartButtons() {
  const buttons = document.querySelectorAll("[data-add-to-cart]");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const productId = button.getAttribute("data-add-to-cart");
      addToCart(productId);
    });
  });
}

function bindCartControls() {
  if (!cartItemsContainer) {
    return;
  }

  cartItemsContainer.addEventListener("click", (event) => {
    const incrementButton = event.target.closest("[data-cart-increment]");
    const decrementButton = event.target.closest("[data-cart-decrement]");
    const removeButton = event.target.closest("[data-cart-remove]");

    if (incrementButton) {
      updateCartItem(incrementButton.getAttribute("data-cart-increment"), 1);
    }

    if (decrementButton) {
      updateCartItem(decrementButton.getAttribute("data-cart-decrement"), -1);
    }

    if (removeButton) {
      removeCartItem(removeButton.getAttribute("data-cart-remove"));
    }
  });
}

function bindFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  if (chips.length === 0) {
    return;
  }

  const cards = document.querySelectorAll(".shop-grid .product-card");
  const grid = document.querySelector(".shop-grid");
  const status = document.querySelector("[data-filter-status]");
  const emptyState = document.querySelector("[data-filter-empty]");
  const sortSelect = document.querySelector("[data-sort-select]");

  function sortCards(sortValue) {
    if (!grid) {
      return;
    }

    const sortedCards = [...cards].sort((cardA, cardB) => {
      const productA = getProductById(cardA.getAttribute("data-product-id"));
      const productB = getProductById(cardB.getAttribute("data-product-id"));

      if (!productA || !productB) {
        return 0;
      }

      switch (sortValue) {
        case "price-asc":
          return productA.price - productB.price;
        case "price-desc":
          return productB.price - productA.price;
        case "newest":
          return productA.newestRank - productB.newestRank;
        case "best-selling":
          return productA.bestSellingRank - productB.bestSellingRank;
        case "name-asc":
          return productA.name.localeCompare(productB.name);
        case "name-desc":
          return productB.name.localeCompare(productA.name);
        default:
          return productA.bestSellingRank - productB.bestSellingRank;
      }
    });

    sortedCards.forEach((card) => {
      grid.appendChild(card);
    });
  }

  function updateFilter(selectedFilter, selectedLabel) {
    let visibleCount = 0;
    const currentSort = sortSelect?.value || "featured";

    sortCards(currentSort);

    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const shouldShow = selectedFilter === "all" || category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (status) {
      status.textContent = selectedFilter === "all"
        ? `Showing all ${visibleCount} products`
        : `Showing ${visibleCount} product${visibleCount === 1 ? "" : "s"} in ${selectedLabel}`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((otherChip) => {
        otherChip.classList.remove("is-selected");
        otherChip.setAttribute("aria-pressed", "false");
      });

      chip.classList.add("is-selected");
      chip.setAttribute("aria-pressed", "true");

      const selectedFilter = chip.getAttribute("data-filter") || "all";
      const selectedLabel = chip.textContent.trim();
      updateFilter(selectedFilter, selectedLabel);
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const activeChip = document.querySelector(".filter-chip.is-selected") || chips[0];
      if (!activeChip) {
        return;
      }

      updateFilter(activeChip.getAttribute("data-filter") || "all", activeChip.textContent.trim());
    });
  }

  const activeChip = document.querySelector(".filter-chip.is-selected") || chips[0];
  if (activeChip) {
    updateFilter(activeChip.getAttribute("data-filter") || "all", activeChip.textContent.trim());
  }
}

function renderProductPage() {
  const productPage = document.querySelector("[data-product-page]");
  if (!productPage) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || getProducts()[0]?.id;
  const product = getProductById(productId);

  if (!product) {
    productPage.innerHTML = `
      <div class="product-detail-copy">
        <p class="eyebrow">Not found</p>
        <h1>This product does not exist.</h1>
        <a class="button button-secondary" href="shop.html">Back to shop</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | Example Studios`;

  const visual = document.querySelector("[data-product-visual]");
  const name = document.querySelector("[data-product-name]");
  const category = document.querySelector("[data-product-category]");
  const description = document.querySelector("[data-product-description]");
  const price = document.querySelector("[data-product-price]");
  const lead = document.querySelector("[data-product-lead]");
  const status = document.querySelector("[data-product-status]");
  const includes = document.querySelector("[data-product-includes]");
  const addButton = document.querySelector(".product-detail [data-add-to-cart]");

  visual.className = `product-visual ${product.visualClass}`;
  name.textContent = product.name;
  category.textContent = product.category;
  description.textContent = product.description;
  price.textContent = product.priceLabel;
  lead.textContent = product.leadTime;
  status.textContent = product.status;
  includes.innerHTML = product.includes.map((item) => `<li>${item}</li>`).join("");

  if (addButton) {
    addButton.setAttribute("data-add-to-cart", product.id);
  }
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (cartButton) {
  cartButton.addEventListener("click", () => {
    if (cartDrawer?.classList.contains("is-open")) {
      closeCart();
    } else {
      openCart();
    }
  });
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}

if (cartBackdrop) {
  cartBackdrop.addEventListener("click", closeCart);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

renderProductPage();
bindProductCards();
bindAddToCartButtons();
bindCartControls();
bindFilters();
renderCart();
