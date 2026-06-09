// survivalTime = minutes until product spoils in the cart (9999 = never expires)
export const products = [
  // ─── Veggie Store (veg) ─────────────────────────────────────────────────────
  { id: 'veg_tomato',   storeId: 'veg',   name: 'Tomatoes',      icon: '🍅', price: 5,  survivalTime: 45   },
  { id: 'veg_cucumber', storeId: 'veg',   name: 'Cucumber',      icon: '🥒', price: 3,  survivalTime: 60   },
  { id: 'veg_carrot',   storeId: 'veg',   name: 'Carrot',        icon: '🥕', price: 4,  survivalTime: 90   },
  { id: 'veg_onion',    storeId: 'veg',   name: 'Onion',         icon: '🧅', price: 3,  survivalTime: 9999 },
  { id: 'veg_potato',   storeId: 'veg',   name: 'Potato',        icon: '🥔', price: 4,  survivalTime: 9999 },
  { id: 'veg_lettuce',  storeId: 'veg',   name: 'Lettuce',       icon: '🥬', price: 5,  survivalTime: 20   },
  { id: 'veg_pepper',   storeId: 'veg',   name: 'Green Pepper',  icon: '🫑', price: 6,  survivalTime: 30   },
  { id: 'veg_avocado',  storeId: 'veg',   name: 'Avocado',       icon: '🥑', price: 8,  survivalTime: 60   },
  { id: 'veg_lemon',    storeId: 'veg',   name: 'Lemon',         icon: '🍋', price: 3,  survivalTime: 9999 },
  { id: 'veg_apple',    storeId: 'veg',   name: 'Apple',         icon: '🍎', price: 4,  survivalTime: 120  },

  // ─── Home Goods (home) ──────────────────────────────────────────────────────
  { id: 'home_soap',    storeId: 'home',  name: 'Soap',          icon: '🧼', price: 7,  survivalTime: 9999 },
  { id: 'home_tp',      storeId: 'home',  name: 'Toilet Paper',  icon: '🧻', price: 10, survivalTime: 9999 },
  { id: 'home_bag',     storeId: 'home',  name: 'Trash Bag',     icon: '🗑️', price: 6,  survivalTime: 9999 },
  { id: 'home_sponge',  storeId: 'home',  name: 'Sponge',        icon: '🧽', price: 4,  survivalTime: 9999 },
  { id: 'home_clean',   storeId: 'home',  name: 'Cleaner',       icon: '🫧', price: 8,  survivalTime: 9999 },
  { id: 'home_candle',  storeId: 'home',  name: 'Candles',       icon: '🕯️', price: 8,  survivalTime: 9999 },
  { id: 'home_ptowel',  storeId: 'home',  name: 'Paper Towel',   icon: '📄', price: 5,  survivalTime: 9999 },

  // ─── Kiosk (kiosk) ──────────────────────────────────────────────────────────
  { id: 'kiosk_icecream', storeId: 'kiosk', name: 'Ice Cream',     icon: '🍦', price: 8,  survivalTime: 15  },
  { id: 'kiosk_choco',    storeId: 'kiosk', name: 'Chocolate',     icon: '🍫', price: 5,  survivalTime: 9999 },
  { id: 'kiosk_juice',    storeId: 'kiosk', name: 'Orange Juice',  icon: '🧃', price: 4,  survivalTime: 60  },
  { id: 'kiosk_biscuit',  storeId: 'kiosk', name: 'Biscuit',       icon: '🍪', price: 3,  survivalTime: 9999 },
  { id: 'kiosk_bamba',    storeId: 'kiosk', name: 'Bamba',         icon: '🟡', price: 3,  survivalTime: 9999 },
  { id: 'kiosk_cola',     storeId: 'kiosk', name: 'Cola',          icon: '🥤', price: 5,  survivalTime: 9999 },
  { id: 'kiosk_popsicle', storeId: 'kiosk', name: 'Popsicle',      icon: '🧊', price: 4,  survivalTime: 20  },
  { id: 'kiosk_milk',     storeId: 'kiosk', name: 'Milk',          icon: '🥛', price: 6,  survivalTime: 90  },

  // ─── Spice Store (spice) ────────────────────────────────────────────────────
  { id: 'spice_pepper',   storeId: 'spice', name: 'Black Pepper',  icon: '🌶️', price: 6,  survivalTime: 9999 },
  { id: 'spice_turmeric', storeId: 'spice', name: 'Turmeric',      icon: '🟡', price: 5,  survivalTime: 9999 },
  { id: 'spice_cumin',    storeId: 'spice', name: 'Cumin',         icon: '🟤', price: 5,  survivalTime: 9999 },
  { id: 'spice_paprika',  storeId: 'spice', name: 'Paprika',       icon: '🫑', price: 6,  survivalTime: 9999 },
  { id: 'spice_cinnamon', storeId: 'spice', name: 'Cinnamon',      icon: '🟤', price: 7,  survivalTime: 9999 },
  { id: 'spice_zaatar',   storeId: 'spice', name: "Za'atar",       icon: '🌿', price: 8,  survivalTime: 9999 },
  { id: 'spice_garlic',   storeId: 'spice', name: 'Garlic',        icon: '🧄', price: 5,  survivalTime: 9999 },
  { id: 'spice_oregano',  storeId: 'spice', name: 'Oregano',       icon: '🌿', price: 6,  survivalTime: 9999 },
];
