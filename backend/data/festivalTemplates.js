const festivalTemplates = [
  {
    name: 'Diwali',
    description: 'Celebration of lights - sweets and snacks',
    icon: '🪔',
    recipes: ['Kheer', 'Halwa'],
    extra_items: [
      { name: 'besan', quantity: 2, unit: 'kg', category: 'Pulses & Grains' },
      { name: 'sugar', quantity: 2, unit: 'kg', category: 'Household' },
      { name: 'ghee', quantity: 500, unit: 'g', category: 'Dairy' },
      { name: 'cardamom', quantity: 20, unit: 'g', category: 'Spices & Masalas' },
      { name: 'cashews', quantity: 250, unit: 'g', category: 'Pulses & Grains' },
      { name: 'kaju', quantity: 500, unit: 'g', category: 'Pulses & Grains' },
      { name: 'mawa', quantity: 500, unit: 'g', category: 'Dairy' },
    ]
  },
  {
    name: 'Pongal',
    description: 'Harvest festival from Tamil Nadu',
    icon: '🌾',
    recipes: ['Kheer'],
    extra_items: [
      { name: 'raw rice', quantity: 2, unit: 'kg', category: 'Pulses & Grains' },
      { name: 'moong dal', quantity: 500, unit: 'g', category: 'Pulses & Grains' },
      { name: 'jaggery', quantity: 500, unit: 'g', category: 'Household' },
      { name: 'coconut', quantity: 2, unit: 'piece', category: 'Fruits' },
      { name: 'sugarcane', quantity: 2, unit: 'piece', category: 'Fruits' },
      { name: 'turmeric plant', quantity: 1, unit: 'piece', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Eid',
    description: 'Festival of breaking the fast',
    icon: '🌙',
    recipes: ['Biryani'],
    extra_items: [
      { name: 'seviyan', quantity: 500, unit: 'g', category: 'Pulses & Grains' },
      { name: 'condensed milk', quantity: 400, unit: 'g', category: 'Dairy' },
      { name: 'rose water', quantity: 1, unit: 'bottle', category: 'Household' },
      { name: 'mixed dry fruits', quantity: 250, unit: 'g', category: 'Fruits' },
      { name: 'mutton', quantity: 1, unit: 'kg', category: 'Meat & Seafood' },
    ]
  },
];

module.exports = festivalTemplates;
