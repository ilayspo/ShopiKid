// survivalTime = minutes until product spoils in the cart (9999 = never expires)
export const products = [
  // ─── חנות ירקות (veg) ───────────────────────────────────────────────────────
  { id: 'veg_tomato',   storeId: 'veg',   name: 'עגבניות',    icon: '🍅', price: 5,  survivalTime: 45   },
  { id: 'veg_cucumber', storeId: 'veg',   name: 'מלפפון',     icon: '🥒', price: 3,  survivalTime: 60   },
  { id: 'veg_carrot',   storeId: 'veg',   name: 'גזר',        icon: '🥕', price: 4,  survivalTime: 90   },
  { id: 'veg_onion',    storeId: 'veg',   name: 'בצל',        icon: '🧅', price: 3,  survivalTime: 9999 },
  { id: 'veg_potato',   storeId: 'veg',   name: 'תפוח אדמה',  icon: '🥔', price: 4,  survivalTime: 9999 },
  { id: 'veg_lettuce',  storeId: 'veg',   name: 'חסה',        icon: '🥬', price: 5,  survivalTime: 20   },
  { id: 'veg_pepper',   storeId: 'veg',   name: 'פלפל ירוק',  icon: '🫑', price: 6,  survivalTime: 30   },
  { id: 'veg_avocado',  storeId: 'veg',   name: 'אבוקדו',     icon: '🥑', price: 8,  survivalTime: 60   },
  { id: 'veg_lemon',    storeId: 'veg',   name: 'לימון',      icon: '🍋', price: 3,  survivalTime: 9999 },
  { id: 'veg_apple',    storeId: 'veg',   name: 'תפוח',       icon: '🍎', price: 4,  survivalTime: 120  },

  // ─── כלי בית (home) ─────────────────────────────────────────────────────────
  { id: 'home_soap',    storeId: 'home',  name: 'סבון',        icon: '🧼', price: 7,  survivalTime: 9999 },
  { id: 'home_tp',      storeId: 'home',  name: 'נייר טואלט',  icon: '🧻', price: 10, survivalTime: 9999 },
  { id: 'home_bag',     storeId: 'home',  name: 'שקית אשפה',   icon: '🗑️', price: 6,  survivalTime: 9999 },
  { id: 'home_sponge',  storeId: 'home',  name: 'ספוג',        icon: '🧽', price: 4,  survivalTime: 9999 },
  { id: 'home_clean',   storeId: 'home',  name: 'חומר ניקוי',  icon: '🫧', price: 8,  survivalTime: 9999 },
  { id: 'home_candle',  storeId: 'home',  name: 'נרות',        icon: '🕯️', price: 8,  survivalTime: 9999 },
  { id: 'home_ptowel',  storeId: 'home',  name: 'מגבת נייר',   icon: '📄', price: 5,  survivalTime: 9999 },

  // ─── קיוסק (kiosk) ──────────────────────────────────────────────────────────
  { id: 'kiosk_icecream', storeId: 'kiosk', name: 'גלידה',       icon: '🍦', price: 8,  survivalTime: 15  },
  { id: 'kiosk_choco',    storeId: 'kiosk', name: 'שוקולד',      icon: '🍫', price: 5,  survivalTime: 9999 },
  { id: 'kiosk_juice',    storeId: 'kiosk', name: 'מיץ תפוזים',  icon: '🧃', price: 4,  survivalTime: 60  },
  { id: 'kiosk_biscuit',  storeId: 'kiosk', name: 'ביסקוויט',    icon: '🍪', price: 3,  survivalTime: 9999 },
  { id: 'kiosk_bamba',    storeId: 'kiosk', name: 'במבה',        icon: '🟡', price: 3,  survivalTime: 9999 },
  { id: 'kiosk_cola',     storeId: 'kiosk', name: 'קולה',        icon: '🥤', price: 5,  survivalTime: 9999 },
  { id: 'kiosk_popsicle', storeId: 'kiosk', name: 'ארטיק',       icon: '🧊', price: 4,  survivalTime: 20  },
  { id: 'kiosk_milk',     storeId: 'kiosk', name: 'חלב',         icon: '🥛', price: 6,  survivalTime: 90  },

  // ─── חנות תבלינים (spice) ───────────────────────────────────────────────────
  { id: 'spice_pepper',   storeId: 'spice', name: 'פלפל שחור',   icon: '🌶️', price: 6,  survivalTime: 9999 },
  { id: 'spice_turmeric', storeId: 'spice', name: 'כורכום',      icon: '🟡', price: 5,  survivalTime: 9999 },
  { id: 'spice_cumin',    storeId: 'spice', name: 'כמון',        icon: '🟤', price: 5,  survivalTime: 9999 },
  { id: 'spice_paprika',  storeId: 'spice', name: 'פפריקה',      icon: '🫑', price: 6,  survivalTime: 9999 },
  { id: 'spice_cinnamon', storeId: 'spice', name: 'קינמון',      icon: '🟤', price: 7,  survivalTime: 9999 },
  { id: 'spice_zaatar',   storeId: 'spice', name: "זעתר",        icon: '🌿', price: 8,  survivalTime: 9999 },
  { id: 'spice_garlic',   storeId: 'spice', name: 'שום',         icon: '🧄', price: 5,  survivalTime: 9999 },
  { id: 'spice_oregano',  storeId: 'spice', name: 'אורגנו',      icon: '🌿', price: 6,  survivalTime: 9999 },
];
