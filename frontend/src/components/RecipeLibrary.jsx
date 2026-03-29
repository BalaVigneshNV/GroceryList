import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3001/api';

const CUISINES = [
  { value: '', label: 'All' },
  { value: 'south_indian', label: 'South Indian' },
  { value: 'north_indian', label: 'North Indian' },
  { value: 'gujarati', label: 'Gujarati' },
  { value: 'bengali', label: 'Bengali' },
];

const CUISINE_BADGE = {
  south_indian: 'badge-south',
  north_indian: 'badge-north',
  gujarati: 'badge-gujarati',
  bengali: 'badge-bengali',
};

const CUISINE_LABELS = {
  south_indian: 'South Indian',
  north_indian: 'North Indian',
  gujarati: 'Gujarati',
  bengali: 'Bengali',
};

const MEAL_ICONS = { breakfast: '☀️', lunch: '🌤️', dinner: '🌙', dessert: '🍮' };

export default function RecipeLibrary() {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = cuisine ? `${API}/recipes?cuisine=${cuisine}` : `${API}/recipes`;
    axios.get(url)
      .then(r => setRecipes(r.data))
      .finally(() => setLoading(false));
  }, [cuisine]);

  return (
    <div>
      <div className="section-title">📖 Recipe Library</div>

      {/* Filter */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontWeight: 600 }}>Filter by cuisine:</span>
          {CUISINES.map(c => (
            <button
              key={c.value}
              className={`btn btn-sm ${cuisine === c.value ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCuisine(c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading recipes...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {recipes.map(recipe => (
            <div key={recipe.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => setExpanded(expanded === recipe.id ? null : recipe.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: '1.1rem', color: '#333' }}>{recipe.name}</h3>
                <span style={{ fontSize: '1.2rem' }}>{MEAL_ICONS[recipe.meal_type] || '🍽️'}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <span className={`badge ${CUISINE_BADGE[recipe.cuisine]}`}>
                  {CUISINE_LABELS[recipe.cuisine]}
                </span>
                <span className="badge" style={{ background: '#f5f5f5', color: '#555' }}>
                  {recipe.meal_type}
                </span>
                <span className="badge" style={{ background: '#fff3e0', color: '#e65100' }}>
                  {recipe.ingredients?.length || 0} ingredients
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '0.85rem' }}>
                <span>👥 {recipe.servings} servings</span>
                <span>{expanded === recipe.id ? '▲ Hide' : '▼ View'} ingredients</span>
              </div>

              {expanded === recipe.id && recipe.ingredients && (
                <div style={{ marginTop: 12, borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '4px 0', borderBottom: i < recipe.ingredients.length - 1 ? '1px solid #f9f9f9' : 'none',
                      fontSize: '0.88rem'
                    }}>
                      <span style={{ textTransform: 'capitalize' }}>{ing.name}</span>
                      <span style={{ color: '#666' }}>{ing.quantity} {ing.unit}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
