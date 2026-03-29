const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { getDb } = require('./database');

const app = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(bodyParser.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

const PRICES = {
  'onion': { price: 40, unit: 'kg' },
  'onions': { price: 40, unit: 'kg' },
  'tomato': { price: 30, unit: 'kg' },
  'tomatoes': { price: 30, unit: 'kg' },
  'potato': { price: 35, unit: 'kg' },
  'potatoes': { price: 35, unit: 'kg' },
  'carrot': { price: 60, unit: 'kg' },
  'green chili': { price: 80, unit: 'kg' },
  'curry leaves': { price: 20, unit: 'bunch' },
  'methi leaves': { price: 30, unit: 'bunch' },
  'mint leaves': { price: 20, unit: 'bunch' },
  'ginger': { price: 120, unit: 'kg' },
  'garlic': { price: 150, unit: 'kg' },
  'rice': { price: 60, unit: 'kg' },
  'basmati rice': { price: 120, unit: 'kg' },
  'idli rice': { price: 70, unit: 'kg' },
  'raw rice': { price: 60, unit: 'kg' },
  'atta': { price: 45, unit: 'kg' },
  'whole wheat atta': { price: 45, unit: 'kg' },
  'whole wheat flour': { price: 45, unit: 'kg' },
  'maida': { price: 40, unit: 'kg' },
  'besan': { price: 90, unit: 'kg' },
  'semolina': { price: 50, unit: 'kg' },
  'toor dal': { price: 130, unit: 'kg' },
  'urad dal': { price: 140, unit: 'kg' },
  'black dal': { price: 140, unit: 'kg' },
  'rajma': { price: 120, unit: 'kg' },
  'kabuli chana': { price: 100, unit: 'kg' },
  'moong dal': { price: 120, unit: 'kg' },
  'poha': { price: 60, unit: 'kg' },
  'seviyan': { price: 80, unit: 'kg' },
  'cashews': { price: 800, unit: 'kg' },
  'kaju': { price: 800, unit: 'kg' },
  'peanuts': { price: 100, unit: 'kg' },
  'milk': { price: 65, unit: 'L' },
  'curd': { price: 50, unit: '500g' },
  'yogurt': { price: 50, unit: '500g' },
  'paneer': { price: 350, unit: 'kg' },
  'ghee': { price: 600, unit: 'kg' },
  'butter': { price: 550, unit: 'kg' },
  'cream': { price: 200, unit: '200ml' },
  'condensed milk': { price: 120, unit: 'can' },
  'mawa': { price: 350, unit: 'kg' },
  'cumin': { price: 40, unit: '100g' },
  'mustard seeds': { price: 30, unit: '100g' },
  'turmeric': { price: 25, unit: '100g' },
  'chili powder': { price: 20, unit: '100g' },
  'coriander powder': { price: 20, unit: '100g' },
  'garam masala': { price: 50, unit: '100g' },
  'sambar powder': { price: 40, unit: '100g' },
  'biryani masala': { price: 60, unit: '100g' },
  'chole masala': { price: 50, unit: '100g' },
  'cardamom': { price: 800, unit: 'kg' },
  'black pepper': { price: 600, unit: 'kg' },
  'saffron': { price: 500, unit: 'g' },
  'tamarind': { price: 80, unit: 'kg' },
  'poppy seeds': { price: 300, unit: 'kg' },
  'fenugreek seeds': { price: 80, unit: 'kg' },
  'ginger paste': { price: 120, unit: 'kg' },
  'ginger garlic paste': { price: 100, unit: 'kg' },
  'green chili paste': { price: 80, unit: 'kg' },
  'oil': { price: 180, unit: 'L' },
  'mustard oil': { price: 200, unit: 'L' },
  'cooking oil': { price: 180, unit: 'L' },
  'salt': { price: 20, unit: 'kg' },
  'sugar': { price: 45, unit: 'kg' },
  'jaggery': { price: 80, unit: 'kg' },
  'rose water': { price: 80, unit: 'bottle' },
  'eno': { price: 30, unit: 'packet' },
  'chicken': { price: 250, unit: 'kg' },
  'mutton': { price: 700, unit: 'kg' },
  'fish': { price: 300, unit: 'kg' },
  'lemon': { price: 5, unit: 'piece' },
  'coconut': { price: 40, unit: 'piece' },
  'raisins': { price: 250, unit: 'kg' },
  'mixed dry fruits': { price: 600, unit: 'kg' },
  'sugarcane': { price: 30, unit: 'piece' },
  'turmeric plant': { price: 20, unit: 'piece' },
};

// GET /api/recipes
app.get('/api/recipes', (req, res) => {
  try {
    const db = getDb();
    const { cuisine } = req.query;
    let recipes;
    if (cuisine) {
      recipes = db.prepare('SELECT * FROM recipes WHERE cuisine = ?').all(cuisine);
    } else {
      recipes = db.prepare('SELECT * FROM recipes').all();
    }
    const withIngredients = recipes.map(recipe => {
      const ingredients = db.prepare('SELECT * FROM recipe_ingredients WHERE recipe_id = ?').all(recipe.id);
      return { ...recipe, ingredients };
    });
    res.json(withIngredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/recipes/:id
app.get('/api/recipes/:id', (req, res) => {
  try {
    const db = getDb();
    const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    const ingredients = db.prepare('SELECT * FROM recipe_ingredients WHERE recipe_id = ?').all(recipe.id);
    res.json({ ...recipe, ingredients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/meal-plan
app.post('/api/meal-plan', (req, res) => {
  try {
    const db = getDb();
    const { meals, familySize, weekStart } = req.body;
    const result = db.prepare('INSERT INTO meal_plans (week_start, plan_data, family_size) VALUES (?, ?, ?)').run(
      weekStart || new Date().toISOString().split('T')[0],
      JSON.stringify(meals),
      familySize || 4
    );
    res.json({ id: result.lastInsertRowid, message: 'Meal plan saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/grocery-list/generate
app.post('/api/grocery-list/generate', (req, res) => {
  try {
    const db = getDb();
    const { meals, familySize = 4, usePantry = false } = req.body;
    const scaleFactor = familySize / 4;

    // Aggregate ingredients
    const aggregated = {};

    const addItem = (name, quantity, unit, category) => {
      const key = name.toLowerCase().trim();
      if (aggregated[key]) {
        aggregated[key].quantity += quantity;
      } else {
        aggregated[key] = { name, quantity, unit, category };
      }
    };

    // Process meal plan
    if (meals) {
      for (const day of Object.keys(meals)) {
        for (const mealType of Object.keys(meals[day])) {
          const mealEntry = meals[day][mealType];
          if (!mealEntry) continue;

          if (mealEntry.type === 'recipe' && mealEntry.recipeId) {
            const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(mealEntry.recipeId);
            if (recipe) {
              const ingredients = db.prepare('SELECT * FROM recipe_ingredients WHERE recipe_id = ?').all(recipe.id);
              for (const ing of ingredients) {
                addItem(ing.name, ing.quantity * scaleFactor, ing.unit, ing.category);
              }
            }
          } else if (mealEntry.type === 'custom' && mealEntry.items) {
            for (const item of mealEntry.items) {
              addItem(item.name, (item.quantity || 1) * scaleFactor, item.unit || 'piece', item.category || 'Household');
            }
          }
        }
      }
    }

    // Auto-add staples
    const staples = [
      { name: 'rice', quantity: 1, unit: 'kg', category: 'Pulses & Grains' },
      { name: 'atta', quantity: 2, unit: 'kg', category: 'Pulses & Grains' },
      { name: 'oil', quantity: 1, unit: 'L', category: 'Household' },
      { name: 'salt', quantity: 0.5, unit: 'kg', category: 'Spices & Masalas' },
      { name: 'onions', quantity: 1, unit: 'kg', category: 'Vegetables' },
      { name: 'tomatoes', quantity: 0.5, unit: 'kg', category: 'Vegetables' },
    ];
    for (const staple of staples) {
      if (!aggregated[staple.name.toLowerCase()]) {
        aggregated[staple.name.toLowerCase()] = { ...staple };
      }
    }

    // Subtract pantry stock if usePantry
    if (usePantry) {
      const pantryItems = db.prepare('SELECT * FROM pantry').all();
      for (const pantryItem of pantryItems) {
        const key = pantryItem.name.toLowerCase().trim();
        if (aggregated[key]) {
          aggregated[key].quantity -= pantryItem.quantity;
          if (aggregated[key].quantity <= 0) {
            delete aggregated[key];
          }
        }
      }
    }

    // Group by category
    const grouped = {};
    for (const item of Object.values(aggregated)) {
      if (!grouped[item.category]) grouped[item.category] = [];
      // Calculate estimated price
      const priceInfo = PRICES[item.name.toLowerCase()];
      item.estimatedPrice = priceInfo ? Math.round(priceInfo.price * item.quantity) : null;
      grouped[item.category].push(item);
    }

    // Calculate total budget
    let totalBudget = 0;
    for (const items of Object.values(grouped)) {
      for (const item of items) {
        if (item.estimatedPrice) totalBudget += item.estimatedPrice;
      }
    }

    res.json({ grouped, totalBudget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/pantry
app.get('/api/pantry', (req, res) => {
  try {
    const db = getDb();
    const items = db.prepare('SELECT * FROM pantry ORDER BY name').all();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/pantry
app.post('/api/pantry', (req, res) => {
  try {
    const db = getDb();
    const { id, name, quantity, unit, expiry_date } = req.body;
    if (id) {
      db.prepare('UPDATE pantry SET name=?, quantity=?, unit=?, expiry_date=?, updated_at=datetime("now") WHERE id=?')
        .run(name, quantity, unit, expiry_date || null, id);
      res.json({ id, message: 'Pantry item updated' });
    } else {
      const result = db.prepare('INSERT INTO pantry (name, quantity, unit, expiry_date) VALUES (?, ?, ?, ?)')
        .run(name, quantity, unit, expiry_date || null);
      res.json({ id: result.lastInsertRowid, message: 'Pantry item added' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/pantry/:id
app.delete('/api/pantry/:id', (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM pantry WHERE id = ?').run(req.params.id);
    res.json({ message: 'Pantry item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/festival-templates
app.get('/api/festival-templates', (req, res) => {
  try {
    const db = getDb();
    const templates = db.prepare('SELECT * FROM festival_templates').all();
    const parsed = templates.map(t => ({
      ...t,
      recipes: JSON.parse(t.recipes),
      extra_items: JSON.parse(t.extra_items),
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/budget-estimate
app.get('/api/budget-estimate', (req, res) => {
  res.json(PRICES);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
