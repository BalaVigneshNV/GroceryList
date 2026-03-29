const recipes = [
  {
    name: 'Idli',
    cuisine: 'south_indian',
    meal_type: 'breakfast',
    servings: 4,
    ingredients: [
      { name: 'urad dal', quantity: 1, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'idli rice', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'fenugreek seeds', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'salt', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Sambar',
    cuisine: 'south_indian',
    meal_type: 'lunch',
    servings: 4,
    ingredients: [
      { name: 'toor dal', quantity: 1, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'tamarind', quantity: 1, unit: 'lemon-sized ball', category: 'Spices & Masalas' },
      { name: 'tomatoes', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'onion', quantity: 1, unit: 'piece', category: 'Vegetables' },
      { name: 'sambar powder', quantity: 2, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'mustard seeds', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'curry leaves', quantity: 2, unit: 'sprig', category: 'Vegetables' },
      { name: 'turmeric', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'oil', quantity: 2, unit: 'tbsp', category: 'Household' },
    ]
  },
  {
    name: 'Rasam',
    cuisine: 'south_indian',
    meal_type: 'lunch',
    servings: 4,
    ingredients: [
      { name: 'toor dal', quantity: 0.25, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'tamarind', quantity: 1, unit: 'small ball', category: 'Spices & Masalas' },
      { name: 'tomatoes', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'black pepper', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'cumin', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'garlic', quantity: 4, unit: 'clove', category: 'Vegetables' },
      { name: 'mustard seeds', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'curry leaves', quantity: 2, unit: 'sprig', category: 'Vegetables' },
      { name: 'turmeric', quantity: 0.25, unit: 'tsp', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Upma',
    cuisine: 'south_indian',
    meal_type: 'breakfast',
    servings: 4,
    ingredients: [
      { name: 'semolina', quantity: 1, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'onion', quantity: 1, unit: 'piece', category: 'Vegetables' },
      { name: 'green chili', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'mustard seeds', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'curry leaves', quantity: 1, unit: 'sprig', category: 'Vegetables' },
      { name: 'cashews', quantity: 10, unit: 'piece', category: 'Pulses & Grains' },
      { name: 'oil', quantity: 2, unit: 'tbsp', category: 'Household' },
      { name: 'salt', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Dal Makhani',
    cuisine: 'north_indian',
    meal_type: 'dinner',
    servings: 4,
    ingredients: [
      { name: 'black dal', quantity: 1, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'rajma', quantity: 0.25, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'tomatoes', quantity: 3, unit: 'piece', category: 'Vegetables' },
      { name: 'onion', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'butter', quantity: 3, unit: 'tbsp', category: 'Dairy' },
      { name: 'cream', quantity: 0.25, unit: 'cup', category: 'Dairy' },
      { name: 'ginger garlic paste', quantity: 1, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'cumin', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'chili powder', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'coriander powder', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'garam masala', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Chole Bhature',
    cuisine: 'north_indian',
    meal_type: 'lunch',
    servings: 4,
    ingredients: [
      { name: 'kabuli chana', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'onion', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'tomatoes', quantity: 3, unit: 'piece', category: 'Vegetables' },
      { name: 'ginger garlic paste', quantity: 1, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'chole masala', quantity: 2, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'maida', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'oil', quantity: 0.5, unit: 'cup', category: 'Household' },
      { name: 'yogurt', quantity: 0.25, unit: 'cup', category: 'Dairy' },
    ]
  },
  {
    name: 'Roti/Chapati',
    cuisine: 'north_indian',
    meal_type: 'dinner',
    servings: 4,
    ingredients: [
      { name: 'whole wheat atta', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'salt', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'oil', quantity: 1, unit: 'tbsp', category: 'Household' },
    ]
  },
  {
    name: 'Poha',
    cuisine: 'north_indian',
    meal_type: 'breakfast',
    servings: 4,
    ingredients: [
      { name: 'poha', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'onion', quantity: 1, unit: 'piece', category: 'Vegetables' },
      { name: 'green chili', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'mustard seeds', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'turmeric', quantity: 0.25, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'peanuts', quantity: 0.25, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'curry leaves', quantity: 1, unit: 'sprig', category: 'Vegetables' },
      { name: 'lemon', quantity: 1, unit: 'piece', category: 'Fruits' },
    ]
  },
  {
    name: 'Macher Jhol',
    cuisine: 'bengali',
    meal_type: 'lunch',
    servings: 4,
    ingredients: [
      { name: 'fish', quantity: 500, unit: 'g', category: 'Meat & Seafood' },
      { name: 'potato', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'onion', quantity: 1, unit: 'piece', category: 'Vegetables' },
      { name: 'tomatoes', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'ginger paste', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'turmeric', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'chili powder', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'mustard oil', quantity: 3, unit: 'tbsp', category: 'Household' },
      { name: 'cumin', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Aloo Posto',
    cuisine: 'bengali',
    meal_type: 'dinner',
    servings: 4,
    ingredients: [
      { name: 'potato', quantity: 4, unit: 'piece', category: 'Vegetables' },
      { name: 'poppy seeds', quantity: 3, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'green chili', quantity: 3, unit: 'piece', category: 'Vegetables' },
      { name: 'mustard oil', quantity: 2, unit: 'tbsp', category: 'Household' },
      { name: 'turmeric', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'salt', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Dhokla',
    cuisine: 'gujarati',
    meal_type: 'breakfast',
    servings: 4,
    ingredients: [
      { name: 'besan', quantity: 1.5, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'yogurt', quantity: 0.5, unit: 'cup', category: 'Dairy' },
      { name: 'ginger paste', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'green chili paste', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'turmeric', quantity: 0.25, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'eno', quantity: 1, unit: 'tsp', category: 'Household' },
      { name: 'mustard seeds', quantity: 1, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'curry leaves', quantity: 2, unit: 'sprig', category: 'Vegetables' },
      { name: 'oil', quantity: 2, unit: 'tbsp', category: 'Household' },
    ]
  },
  {
    name: 'Thepla',
    cuisine: 'gujarati',
    meal_type: 'breakfast',
    servings: 4,
    ingredients: [
      { name: 'whole wheat flour', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'methi leaves', quantity: 1, unit: 'cup', category: 'Vegetables' },
      { name: 'yogurt', quantity: 0.25, unit: 'cup', category: 'Dairy' },
      { name: 'turmeric', quantity: 0.25, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'chili powder', quantity: 0.5, unit: 'tsp', category: 'Spices & Masalas' },
      { name: 'oil', quantity: 2, unit: 'tbsp', category: 'Household' },
    ]
  },
  {
    name: 'Kheer',
    cuisine: 'north_indian',
    meal_type: 'dessert',
    servings: 4,
    ingredients: [
      { name: 'milk', quantity: 1, unit: 'L', category: 'Dairy' },
      { name: 'basmati rice', quantity: 0.25, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'sugar', quantity: 0.5, unit: 'cup', category: 'Household' },
      { name: 'cardamom', quantity: 4, unit: 'piece', category: 'Spices & Masalas' },
      { name: 'cashews', quantity: 10, unit: 'piece', category: 'Pulses & Grains' },
      { name: 'raisins', quantity: 2, unit: 'tbsp', category: 'Fruits' },
      { name: 'saffron', quantity: 1, unit: 'pinch', category: 'Spices & Masalas' },
    ]
  },
  {
    name: 'Halwa',
    cuisine: 'north_indian',
    meal_type: 'dessert',
    servings: 4,
    ingredients: [
      { name: 'semolina', quantity: 1, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'ghee', quantity: 0.25, unit: 'cup', category: 'Dairy' },
      { name: 'sugar', quantity: 0.75, unit: 'cup', category: 'Household' },
      { name: 'cashews', quantity: 10, unit: 'piece', category: 'Pulses & Grains' },
      { name: 'raisins', quantity: 2, unit: 'tbsp', category: 'Fruits' },
      { name: 'cardamom', quantity: 4, unit: 'piece', category: 'Spices & Masalas' },
      { name: 'milk', quantity: 0.5, unit: 'cup', category: 'Dairy' },
    ]
  },
  {
    name: 'Biryani',
    cuisine: 'north_indian',
    meal_type: 'lunch',
    servings: 4,
    ingredients: [
      { name: 'basmati rice', quantity: 2, unit: 'cup', category: 'Pulses & Grains' },
      { name: 'chicken', quantity: 500, unit: 'g', category: 'Meat & Seafood' },
      { name: 'onion', quantity: 3, unit: 'piece', category: 'Vegetables' },
      { name: 'yogurt', quantity: 0.5, unit: 'cup', category: 'Dairy' },
      { name: 'tomatoes', quantity: 2, unit: 'piece', category: 'Vegetables' },
      { name: 'biryani masala', quantity: 2, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'ginger garlic paste', quantity: 2, unit: 'tbsp', category: 'Spices & Masalas' },
      { name: 'saffron', quantity: 1, unit: 'pinch', category: 'Spices & Masalas' },
      { name: 'ghee', quantity: 2, unit: 'tbsp', category: 'Dairy' },
      { name: 'mint leaves', quantity: 0.25, unit: 'cup', category: 'Vegetables' },
      { name: 'oil', quantity: 3, unit: 'tbsp', category: 'Household' },
    ]
  },
];

module.exports = recipes;
