window.STORE_PRODUCTS = [
  {
    id: "product-one",
    name: "Product One",
    price: 1400,
    newestRank: 3,
    bestSellingRank: 1,
    priceLabel: "From Rs 1,400",
    status: "available",
    tag: "featured",
    visualClass: "product-one",
    shortDescription: "A simple featured item with clean details and a custom option.",
    description:
      "A simple product designed to keep the catalog clear and easy to browse.",
    category: "Featured",
    leadTime: "2-3 weeks",
    includes: [
      "Main item",
      "Standard finish",
      "Basic packaging"
    ]
  },
  {
    id: "product-two",
    name: "Product Two",
    price: 650,
    newestRank: 5,
    bestSellingRank: 2,
    priceLabel: "Rs 650",
    status: "available",
    tag: "standard",
    visualClass: "product-two",
    shortDescription: "A compact item with a straightforward design and simple presentation.",
    description:
      "A general product option that keeps the storefront flexible and easy to understand.",
    category: "Standard",
    leadTime: "Ships in 3-5 days",
    includes: [
      "Single item",
      "Standard details",
      "Basic packaging"
    ]
  },
  {
    id: "product-three",
    name: "Product Three",
    price: 950,
    newestRank: 4,
    bestSellingRank: 3,
    priceLabel: "From Rs 950",
    status: "available",
    tag: "popular",
    visualClass: "product-three",
    shortDescription: "A flexible product choice with a clear layout and neutral wording.",
    description:
      "A general listing built to show product information without brand-specific language.",
    category: "Featured",
    leadTime: "1-2 weeks",
    includes: [
      "Primary item",
      "Optional variation",
      "Basic packaging"
    ]
  },
  {
    id: "product-four",
    name: "Product Four",
    price: 720,
    newestRank: 2,
    bestSellingRank: 4,
    priceLabel: "Rs 720",
    status: "available",
    tag: "new",
    visualClass: "product-four",
    shortDescription: "A simple item for everyday browsing with easy-to-scan details.",
    description:
      "A straightforward product entry focused on clarity, basic copy, and easy comparison.",
    category: "Everyday",
    leadTime: "Ships in 5-7 days",
    includes: [
      "Single item",
      "Standard finish",
      "Basic packaging"
    ]
  },
  {
    id: "product-five",
    name: "Product Five",
    price: 800,
    newestRank: 6,
    bestSellingRank: 5,
    priceLabel: "From Rs 800",
    status: "available",
    tag: "classic",
    visualClass: "product-five",
    shortDescription: "A balanced product option with a clean structure and simple description.",
    description:
      "A general-purpose listing that keeps the catalog neutral and presentation-focused.",
    category: "Everyday",
    leadTime: "1-2 weeks",
    includes: [
      "Primary item",
      "Optional selection",
      "Basic packaging"
    ]
  },
  {
    id: "product-six",
    name: "Product Six",
    price: 1050,
    newestRank: 1,
    bestSellingRank: 6,
    priceLabel: "Rs 1,050",
    status: "coming soon",
    tag: "new",
    visualClass: "product-six",
    shortDescription: "A clean product listing prepared for a future release.",
    description:
      "A simple upcoming product entry using neutral language and a basic structure.",
    category: "Everyday",
    leadTime: "Pre-order",
    includes: [
      "Primary item",
      "Standard details",
      "Basic packaging"
    ]
  }
];

window.getStoreProductById = function getStoreProductById(productId) {
  return window.STORE_PRODUCTS.find((product) => product.id === productId);
};
