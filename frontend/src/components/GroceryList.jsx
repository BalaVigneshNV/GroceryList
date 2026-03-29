import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORY_CLASS = {
  'Vegetables': 'cat-vegetables',
  'Pulses & Grains': 'cat-pulses',
  'Dairy': 'cat-dairy',
  'Spices & Masalas': 'cat-spices',
  'Household': 'cat-household',
  'Fruits': 'cat-fruits',
  'Meat & Seafood': 'cat-meat',
};

const CATEGORY_ICONS = {
  'Vegetables': '🥦',
  'Pulses & Grains': '🌾',
  'Dairy': '🥛',
  'Spices & Masalas': '🌶️',
  'Household': '🏠',
  'Fruits': '🍎',
  'Meat & Seafood': '🍗',
};

export default function GroceryList({ groceryData }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  if (!groceryData) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🛒</div>
        <h2 style={{ color: '#FF6600', marginBottom: 12 }}>No Grocery List Generated Yet</h2>
        <p style={{ color: '#666', marginBottom: 20 }}>Go to the Weekly Planner to select meals and generate your grocery list.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          📅 Go to Planner
        </button>
      </div>
    );
  }

  const { grouped, totalBudget } = groceryData;

  const toggleCheck = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const exportCSV = () => {
    const rows = [['Item', 'Quantity', 'Unit', 'Category', 'Est. Price (₹)']];
    for (const [cat, items] of Object.entries(grouped)) {
      for (const item of items) {
        rows.push([item.name, item.quantity.toFixed(2), item.unit, cat, item.estimatedPrice || 'N/A']);
      }
    }
    const csv = rows.map(r => r.join(',')).join('\n');
    downloadFile('grocery-list.csv', 'text/csv', csv);
  };

  const exportMarkdown = () => {
    let md = '# 🛒 Indian Meals Grocery List\n\n';
    for (const [cat, items] of Object.entries(grouped)) {
      md += `## ${CATEGORY_ICONS[cat] || ''} ${cat}\n\n`;
      for (const item of items) {
        const price = item.estimatedPrice ? ` — ₹${item.estimatedPrice}` : '';
        md += `- [ ] **${item.name}** — ${item.quantity.toFixed(2)} ${item.unit}${price}\n`;
      }
      md += '\n';
    }
    md += `---\n**Total Estimated Budget: ₹${totalBudget}**\n`;
    downloadFile('grocery-list.md', 'text/markdown', md);
  };

  const downloadFile = (filename, type, content) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalItems = Object.values(grouped).reduce((sum, items) => sum + items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div className="section-title">🛍️ Grocery List</div>

      {/* Summary + Actions */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              {checkedCount}/{totalItems} items collected
            </span>
            <span style={{ marginLeft: 16, fontSize: '1.2rem', color: '#138808', fontWeight: 700 }}>
              💰 Total: ₹{totalBudget}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={exportCSV}>📊 Export CSV</button>
            <button className="btn btn-outline btn-sm" onClick={exportMarkdown}>📝 Export Markdown</button>
            <button className="btn btn-sm" style={{ background: '#607d8b', color: 'white' }} onClick={() => window.print()}>🖨️ Print</button>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/')}>📅 Back to Planner</button>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 12, background: '#eee', borderRadius: 8, height: 8 }}>
          <div style={{
            width: `${totalItems ? (checkedCount / totalItems) * 100 : 0}%`,
            height: '100%', background: '#138808', borderRadius: 8, transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Category groups */}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="card" style={{ marginBottom: 16 }}>
          <div className={`category-header ${CATEGORY_CLASS[category] || ''}`}>
            {CATEGORY_ICONS[category] || '📦'} {category}
            <span style={{ float: 'right', fontWeight: 400, fontSize: '0.85rem' }}>
              {items.length} items
            </span>
          </div>
          {items.map((item, idx) => {
            const key = `${category}-${item.name}`;
            const isChecked = checked[key];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 8px', cursor: 'pointer',
                  borderBottom: idx < items.length - 1 ? '1px solid #f0f0f0' : 'none',
                  opacity: isChecked ? 0.5 : 1,
                  textDecoration: isChecked ? 'line-through' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked || false}
                  onChange={() => toggleCheck(key)}
                  onClick={e => e.stopPropagation()}
                  style={{ width: 18, height: 18, cursor: 'pointer', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{item.name}</span>
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  {item.quantity.toFixed(2)} {item.unit}
                </div>
                {item.estimatedPrice && (
                  <div style={{ color: '#138808', fontWeight: 600, minWidth: 60, textAlign: 'right' }}>
                    ₹{item.estimatedPrice}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Total */}
      <div className="card" style={{ background: '#138808', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>
          💰 Total Estimated Budget: ₹{totalBudget}
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: 4 }}>
          Prices are approximate market rates
        </div>
      </div>
    </div>
  );
}
