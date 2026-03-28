window.ACUBI_PRODUCTS = [
  {
    id: "custom-couple-dolls",
    name: "Custom Couple Dolls",
    price: 1400,
    newestRank: 3,
    bestSellingRank: 1,
    priceLabel: "From Rs 1,400",
    status: "made-to-order",
    tag: "best seller",
    visualClass: "product-one",
    shortDescription: "Mini portrait dolls styled from your outfits, wedding looks, or favorite photo.",
    description:
      "A custom crochet duo made from your reference photos. Ideal for weddings, anniversaries, or just immortalizing a favorite outfit pairing in yarn.",
    category: "Custom dolls",
    leadTime: "2-3 weeks",
    includes: [
      "Two hand-crocheted dolls",
      "Outfit color matching",
      "Small accessory details like flowers, veils, or bags"
    ]
  },
  {
    id: "button-bloom-charm",
    name: "Button Bloom Charm",
    price: 650,
    newestRank: 5,
    bestSellingRank: 2,
    priceLabel: "Rs 650",
    status: "ready to ship",
    tag: "tiny gift",
    visualClass: "product-two",
    shortDescription: "Soft pink flower charm for bags, keychains, and desk setups that need some whimsy.",
    description:
      "A pastel flower-button charm with a soft sculptural feel. Designed as a small joyful object for bags, mirrors, keys, and gift wrapping.",
    category: "Charms",
    leadTime: "Ships in 3-5 days",
    includes: [
      "Crochet flower charm",
      "Loop for hanging or clipping",
      "Gift-ready wrapping"
    ]
  },
  {
    id: "memory-plush-portrait",
    name: "Memory Plush Portrait",
    price: 950,
    newestRank: 4,
    bestSellingRank: 3,
    priceLabel: "From Rs 950",
    status: "customizable",
    tag: "statement piece",
    visualClass: "product-three",
    shortDescription: "Handheld plush sculpture inspired by a person, pet, or fictional comfort character.",
    description:
      "A soft portrait plush that translates a face, mood, or icon into a palm-sized crochet keepsake with expressive features and color details.",
    category: "Custom dolls",
    leadTime: "1-2 weeks",
    includes: [
      "One portrait plush",
      "Custom color palette",
      "Face and clothing detail work"
    ]
  },
  {
    id: "mini-mood-mascot",
    name: "Mini Mood Mascot",
    price: 720,
    newestRank: 2,
    bestSellingRank: 4,
    priceLabel: "Rs 720",
    status: "small batch",
    tag: "giftable",
    visualClass: "product-four",
    shortDescription: "A tiny desk plush with sleepy eyes, blush cheeks, and one embroidered lucky star.",
    description:
      "A compact mascot plush for desks, shelves, and care packages. Lightly surreal, soft to hold, and designed to feel like a tiny mood object.",
    category: "Decor",
    leadTime: "Ships in 5-7 days",
    includes: [
      "One mascot plush",
      "Embroidered detail accents",
      "Acubi tag"
    ]
  },
  {
    id: "crochet-name-totem",
    name: "Crochet Name Totem",
    price: 800,
    newestRank: 6,
    bestSellingRank: 5,
    priceLabel: "From Rs 800",
    status: "personalized",
    tag: "signature",
    visualClass: "product-five",
    shortDescription: "Soft sculptural letters with bows, flowers, or tiny icons woven into the form.",
    description:
      "A personalized crochet word or name piece for gifting, room styling, or memory shelves. Decorative but still soft and tactile.",
    category: "Decor",
    leadTime: "1-2 weeks",
    includes: [
      "Custom name or short word",
      "Choice of accent motif",
      "Color customization"
    ]
  },
  {
    id: "lucky-wall-charm",
    name: "Lucky Wall Charm",
    price: 1050,
    newestRank: 1,
    bestSellingRank: 6,
    priceLabel: "Rs 1,050",
    status: "launching soon",
    tag: "home object",
    visualClass: "product-six",
    shortDescription: "Decor piece mixing stitched motifs, texture, and doodle-like geometry for cozy corners.",
    description:
      "A wall-facing crochet object for bedrooms, work corners, and reading nooks. Built like a small textile collage with a soft Acubi visual language.",
    category: "Decor",
    leadTime: "Pre-order",
    includes: [
      "Structured crochet wall charm",
      "Hanging loop",
      "Decorative stitched details"
    ]
  }
];

window.getAcubiProductById = function getAcubiProductById(productId) {
  return window.ACUBI_PRODUCTS.find((product) => product.id === productId);
};
