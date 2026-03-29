import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:3001/api';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

const CUISINE_LABELS = {
  south_indian: 'South Indian',
  north_indian: 'North Indian',
  gujarati: 'Gujarati',
  bengali: 'Bengali',
};

export default function WeeklyPlanner({ onGroceryGenerated }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [meals, setMeals] = useState({});
  const [familySize, setFamilySize] = useState(4);
  const [usePantry, setUsePantry] = useState(false);
  const [loading, setLoading] = useState(false);
  const [festivals, setFestivals] = useState([]);
  const [showFestivalModal, setShowFestivalModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/recipes`).then(r => setRecipes(r.data)).catch(() => setError('Failed to load recipes'));
    axios.get(`${API}/festival-templates`).then(r => setFestivals(r.data)).catch(() => {});
  }, []);

  const setMeal = (day, mealType, recipeId) => {
    const recipe = recipes.find(r => r.id === parseInt(recipeId));
    setMeals(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipeId ? { type: 'recipe', recipeId: parseInt(recipeId), name: recipe?.name } : null
      }
    }));
  };

  const generateList = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API}/grocery-list/generate`, { meals, familySize, usePantry });
      onGroceryGenerated(res.data);
      navigate('/grocery-list');
    } catch (e) {
      setError('Failed to generate grocery list. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const loadFestivalTemplate = async (festival) => {
    const festivalRecipeNames = festival.recipes;
    const newMeals = {};
    let dayIndex = 0;
    for (const recipeName of festivalRecipeNames) {
      const recipe = recipes.find(r => r.name === recipeName);
      if (recipe && dayIndex < DAYS.length) {
        const day = DAYS[dayIndex];
        newMeals[day] = {
          ...newMeals[day],
          Dinner: { type: 'recipe', recipeId: recipe.id, name: recipe.name }
        };
        dayIndex++;
      }
    }
    setMeals(newMeals);
    setShowFestivalModal(false);
  };

  const clearAll = () => setMeals({});

  const getMealCount = () => {
    let count = 0;
    for (const day of Object.values(meals)) {
      for (const meal of Object.values(day)) {
        if (meal) count++;
      }
    }
    return count;
  };

  return (
    <div>
      <div className="section-title">📅 Weekly Meal Planner</div>

      {error && <div className="error-msg">{error}</div>}

      {/* Controls */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label style={{ fontWeight: 600, marginRight: 8 }}>👨‍👩‍👧‍👦 Family Size:</label>
            {[2, 4, 6].map(n => (
              <button
                key={n}
                className={`btn btn-sm ${familySize === n ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFamilySize(n)}
                style={{ marginRight: 6 }}
              >
                {n} members
              </button>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={usePantry}
              onChange={e => setUsePantry(e.target.checked)}
              style={{ width: 'auto' }}
            />
            <span style={{ fontWeight: 600 }}>🏠 Use Pantry Stock</span>
          </label>
          <button className="btn btn-outline" onClick={() => setShowFestivalModal(true)}>🎉 Festival Template</button>
          <button className="btn btn-sm" style={{ background: '#eee', color: '#666' }} onClick={clearAll}>🗑️ Clear All</button>
        </div>
      </div>

      {/* Meal Grid */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left', background: '#f5f5f5', borderRadius: 8 }}>Day</th>
              {MEALS.map(m => (
                <th key={m} style={{ padding: '10px', textAlign: 'center', background: '#FFF3E0', color: '#E65100' }}>
                  {m === 'Breakfast' ? '☀️' : m === 'Lunch' ? '🌤️' : '🌙'} {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day, i) => (
              <tr key={day} style={{ background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                <td style={{ padding: '8px 10px', fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  {day}
                </td>
                {MEALS.map(mealType => {
                  const current = meals[day]?.[mealType];
                  return (
                    <td key={mealType} style={{ padding: '6px' }}>
                      <select
                        value={current?.recipeId || ''}
                        onChange={e => setMeal(day, mealType, e.target.value)}
                        style={{ fontSize: '0.82rem', padding: '6px 8px' }}
                      >
                        <option value="">— None —</option>
                        {Object.entries(CUISINE_LABELS).map(([cuisine, label]) => (
                          <optgroup key={cuisine} label={label}>
                            {recipes
                              .filter(r => r.cuisine === cuisine)
                              .map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                              ))
                            }
                          </optgroup>
                        ))}
                      </select>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Button */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
        <button
          className="btn btn-primary"
          onClick={generateList}
          disabled={loading}
          style={{ fontSize: '1rem', padding: '12px 24px' }}
        >
          {loading ? '⏳ Generating...' : '🛒 Generate Grocery List'}
        </button>
        {getMealCount() > 0 && (
          <span style={{ color: '#666' }}>{getMealCount()} meals selected</span>
        )}
      </div>

      {/* Festival Modal */}
      {showFestivalModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="card" style={{ width: '90%', maxWidth: 500 }}>
            <h3 style={{ marginBottom: 16, color: '#FF6600' }}>🎉 Load Festival Template</h3>
            {festivals.map(f => (
              <div key={f.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px', border: '1px solid #eee', borderRadius: 8, marginBottom: 8
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{f.icon} {f.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>{f.description}</div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => loadFestivalTemplate(f)}>Load</button>
              </div>
            ))}
            <button className="btn btn-outline" onClick={() => setShowFestivalModal(false)} style={{ marginTop: 8 }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
