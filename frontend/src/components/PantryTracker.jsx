import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3001/api';

export default function PantryTracker() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', unit: 'kg', expiry_date: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/pantry`);
      setItems(res.data);
    } catch {
      setError('Failed to load pantry items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity) return;
    try {
      await axios.post(`${API}/pantry`, {
        ...form,
        id: editId,
        quantity: parseFloat(form.quantity)
      });
      setForm({ name: '', quantity: '', unit: 'kg', expiry_date: '' });
      setEditId(null);
      fetchItems();
    } catch {
      setError('Failed to save pantry item');
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ name: item.name, quantity: item.quantity, unit: item.unit, expiry_date: item.expiry_date || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this pantry item?')) return;
    try {
      await axios.delete(`${API}/pantry/${id}`);
      fetchItems();
    } catch {
      setError('Failed to delete item');
    }
  };

  const isExpiringSoon = (expiry) => {
    if (!expiry) return false;
    const days = (new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24);
    return days <= 7 && days >= 0;
  };

  const isExpired = (expiry) => {
    if (!expiry) return false;
    return new Date(expiry) < new Date();
  };

  return (
    <div>
      <div className="section-title">🏠 Pantry Tracker</div>
      {error && <div className="error-msg">{error}</div>}

      {/* Add/Edit Form */}
      <div className="card">
        <h3 style={{ marginBottom: 16, color: '#FF6600' }}>
          {editId ? '✏️ Edit Item' : '➕ Add Item'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Item Name *</label>
              <input
                placeholder="e.g., Rice, Dal"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Quantity *</label>
              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="Amount"
                value={form.quantity}
                onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))}
                required
              />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Unit</label>
              <select value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))}>
                {['kg', 'g', 'L', 'ml', 'cup', 'piece', 'bunch', 'tbsp', 'tsp', 'packet', 'can', 'bottle'].map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, display: 'block' }}>Expiry Date</label>
              <input
                type="date"
                value={form.expiry_date}
                onChange={e => setForm(p => ({ ...p, expiry_date: e.target.value }))}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn btn-primary">
              {editId ? '💾 Update' : '➕ Add to Pantry'}
            </button>
            {editId && (
              <button type="button" className="btn btn-outline"
                onClick={() => { setEditId(null); setForm({ name: '', quantity: '', unit: 'kg', expiry_date: '' }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Pantry List */}
      <div className="card">
        <h3 style={{ marginBottom: 16, color: '#FF6600' }}>
          📦 Stock ({items.length} items)
        </h3>
        {loading ? (
          <div className="loading">Loading pantry...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: 30 }}>
            <div style={{ fontSize: '2rem' }}>🏠</div>
            <p style={{ marginTop: 8 }}>Your pantry is empty. Add items above!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Item</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Quantity</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Unit</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Expiry</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const expired = isExpired(item.expiry_date);
                  const expiringSoon = !expired && isExpiringSoon(item.expiry_date);
                  return (
                    <tr key={item.id} style={{
                      background: expired ? '#ffebee' : expiringSoon ? '#fff8e1' : i % 2 === 0 ? 'white' : '#fafafa'
                    }}>
                      <td style={{ padding: '10px', fontWeight: 500 }}>{item.name}</td>
                      <td style={{ padding: '10px', textAlign: 'right' }}>{item.quantity}</td>
                      <td style={{ padding: '10px', color: '#666' }}>{item.unit}</td>
                      <td style={{ padding: '10px' }}>
                        {item.expiry_date ? (
                          <span style={{ color: expired ? '#c62828' : expiringSoon ? '#f57f17' : '#388e3c', fontWeight: 500 }}>
                            {expired ? '⚠️ ' : expiringSoon ? '⏰ ' : '✅ '}
                            {item.expiry_date}
                          </span>
                        ) : <span style={{ color: '#bbb' }}>—</span>}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => handleEdit(item)} style={{ marginRight: 4 }}>
                          ✏️
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
