const Database = require('better-sqlite3');
const path = require('path');
const recipes = require('./data/recipes');
const festivalTemplates = require('./data/festivalTemplates');

const DB_PATH = path.join(__dirname, 'grocery.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeSchema();
    seedData();
  }
  return db;
}

function initializeSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cuisine TEXT NOT NULL,
      meal_type TEXT,
      servings INTEGER DEFAULT 4
    );

    CREATE TABLE IF NOT EXISTS recipe_ingredients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      category TEXT NOT NULL,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id)
    );

    CREATE TABLE IF NOT EXISTS pantry (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      expiry_date TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS meal_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week_start TEXT NOT NULL,
      plan_data TEXT NOT NULL,
      family_size INTEGER DEFAULT 4,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS festival_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      recipes TEXT NOT NULL,
      extra_items TEXT NOT NULL
    );
  `);
}

function seedData() {
  const recipeCount = db.prepare('SELECT COUNT(*) as count FROM recipes').get();
  if (recipeCount.count === 0) {
    const insertRecipe = db.prepare('INSERT INTO recipes (name, cuisine, meal_type, servings) VALUES (?, ?, ?, ?)');
    const insertIngredient = db.prepare('INSERT INTO recipe_ingredients (recipe_id, name, quantity, unit, category) VALUES (?, ?, ?, ?, ?)');

    const insertMany = db.transaction(() => {
      for (const recipe of recipes) {
        const result = insertRecipe.run(recipe.name, recipe.cuisine, recipe.meal_type, recipe.servings);
        const recipeId = result.lastInsertRowid;
        for (const ing of recipe.ingredients) {
          insertIngredient.run(recipeId, ing.name, ing.quantity, ing.unit, ing.category);
        }
      }
    });
    insertMany();
  }

  const festivalCount = db.prepare('SELECT COUNT(*) as count FROM festival_templates').get();
  if (festivalCount.count === 0) {
    const insertFestival = db.prepare('INSERT INTO festival_templates (name, description, icon, recipes, extra_items) VALUES (?, ?, ?, ?, ?)');
    for (const template of festivalTemplates) {
      insertFestival.run(
        template.name,
        template.description,
        template.icon,
        JSON.stringify(template.recipes),
        JSON.stringify(template.extra_items)
      );
    }
  }
}

module.exports = { getDb };
