import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:3001/api';

const CATEGORY_ICONS = {
  'Vegetables': '🥦',
  'Pulses & Grains': '🌾',
  'Dairy': '🥛',
  'Spices & Masalas': '🌶️',
  'Household': '🏠',
  'Fruits': '🍎',
  'Meat & Seafood': '🍗',
};

export default function FestivalTemplates() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groceryData, setGroceryData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    axios.get(`${API}/festival-templates`)
      .then(r => setTemplates(r.data))
      .finally(() => setLoading(false));
  }, []);

  const generateFestivalList = async (template) => {
    setGenerating(true);
    setSelectedTemplate(template);
    try {
      // Get all recipes from the backend
      const recipesRes = await axios.get(`${API}/recipes`);
      const allRecipes = recipesRes.data;

      // Build meals object from festival recipes
      const meals = {};
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      template.recipes.forEach((recipeName, idx) => {
        const recipe = allRecipes.find(r => r.name === recipeName);
        if (recipe && idx < days.length) {
          meals[days[idx]] = {
            Dinner: { type: 'recipe', recipeId: recipe.id, name: recipe.name }
          };
        }
      });

      // Add extra items as a custom day
      const extraMeals = {};
      if (template.extra_items && template.extra_items.length > 0) {
        extraMeals['Sunday'] = {
          ...meals['Sunday'],
          Lunch: {
            type: 'custom',
            items: template.extra_items
          }
        };
      }

      const res = await axios.post(`${API}/grocery-list/generate`, {
        meals: { ...meals, ...extraMeals },
        familySize: 4,
        usePantry: false
      });

      setGroceryData(res.data);
    } catch (e) {
      alert('Failed to generate festival grocery list');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="loading">Loading festival templates...</div>;

  return (
    <div>
      <div className="section-title">🎉 Festival Templates</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, marginBottom: 24 }}>
        {templates.map(template => (
          <div key={template.id} className="card" style={{
            background: 'linear-gradient(135deg, #fff9f0, #fff)',
            border: '2px solid #FFE0B2'
          }}>
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: 8 }}>{template.icon}</div>
            <h2 style={{ textAlign: 'center', color: '#FF6600', marginBottom: 4 }}>{template.name}</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginBottom: 16 }}>
              {template.description}
            </p>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: '0.9rem' }}>🍽️ Featured Recipes:</div>
              {template.recipes.map((r, i) => (
                <span key={i} className="badge" style={{ background: '#FFF3E0', color: '#E65100', marginRight: 4, marginBottom: 4 }}>
                  {r}
                </span>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: '0.9rem' }}>🛒 Special Items:</div>
              {template.extra_items.map((item, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: '#555', padding: '2px 0' }}>
                  {CATEGORY_ICONS[item.category] || '📦'} {item.name} — {item.quantity} {item.unit}
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => generateFestivalList(template)}
              disabled={generating && selectedTemplate?.id === template.id}
            >
              {generating && selectedTemplate?.id === template.id ? '⏳ Generating...' : '🛒 Generate Grocery List'}
            </button>
          </div>
        ))}
      </div>

      {/* Generated Grocery List Preview */}
      {groceryData && selectedTemplate && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ color: '#FF6600' }}>
              {selectedTemplate.icon} {selectedTemplate.name} Grocery List
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontWeight: 700, color: '#138808' }}>💰 ₹{groceryData.totalBudget}</span>
            </div>
          </div>
          {Object.entries(groceryData.grouped).map(([category, items]) => (
            <div key={category} style={{ marginBottom: 16 }}>
              <div className={`category-header cat-${category.split(' ')[0].toLowerCase()}`}>
                {CATEGORY_ICONS[category]} {category}
              </div>
              {items.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '6px 8px', borderBottom: '1px solid #f5f5f5', fontSize: '0.9rem'
                }}>
                  <span style={{ textTransform: 'capitalize' }}>{item.name}</span>
                  <span style={{ color: '#666' }}>{item.quantity.toFixed(2)} {item.unit}
                    {item.estimatedPrice && <span style={{ color: '#138808', marginLeft: 8, fontWeight: 600 }}>₹{item.estimatedPrice}</span>}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
