export default function HowToUse() {
  return (
    <div>
      <div className="section-title">❓ How to Use the Grocery Planner</div>

      <div className="card">
        <h2 style={{ fontSize: '1.3rem', color: '#FF6600', marginBottom: 16 }}>
          Welcome to Indian Meals Grocery Planner!
        </h2>
        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: 16 }}>
          This application helps you plan weekly Indian meals and automatically generates organized
          grocery lists with budget estimates. Follow the guide below to get started.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', color: '#FF6600', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          📅 1. Weekly Planner
        </h3>
        <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
          The Weekly Planner is your starting point for meal planning:
        </p>
        <ul style={{ color: '#555', lineHeight: 1.8, marginLeft: 20 }}>
          <li><strong>Select Meals:</strong> Choose recipes for breakfast, lunch, and dinner across all 7 days of the week</li>
          <li><strong>Browse Recipes:</strong> Click on any meal slot to see available recipes from our recipe library</li>
          <li><strong>Set Family Size:</strong> Adjust the number of people (default is 4) to scale ingredient quantities</li>
          <li><strong>Use Pantry:</strong> Enable this option to subtract items you already have in your pantry from the grocery list</li>
          <li><strong>Apply Festival Templates:</strong> Use pre-configured meal plans for festivals like Diwali, Pongal, or Eid</li>
          <li><strong>Generate List:</strong> Once you've selected your meals, click "Generate Grocery List" to create your shopping list</li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', color: '#FF6600', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          🛍️ 2. Grocery List
        </h3>
        <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
          Your automatically generated shopping list with smart features:
        </p>
        <ul style={{ color: '#555', lineHeight: 1.8, marginLeft: 20 }}>
          <li><strong>Organized by Category:</strong> Items are grouped into categories like Vegetables, Pulses & Grains, Dairy, Spices & Masalas, Fruits, Meat & Seafood, and Household</li>
          <li><strong>Check Off Items:</strong> Tap items while shopping to mark them as purchased</li>
          <li><strong>Budget Estimates:</strong> View estimated prices in Indian Rupees (₹) for each item and total budget</li>
          <li><strong>Export to CSV:</strong> Download your list as a spreadsheet for easy sharing or printing</li>
          <li><strong>Print List:</strong> Get a printer-friendly version of your grocery list</li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', color: '#FF6600', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          🏠 3. Pantry Tracker
        </h3>
        <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
          Keep track of what you already have at home:
        </p>
        <ul style={{ color: '#555', lineHeight: 1.8, marginLeft: 20 }}>
          <li><strong>Add Items:</strong> Record ingredients you already have with their quantities and units</li>
          <li><strong>Track Expiry Dates:</strong> Set expiration dates to know when items need to be used</li>
          <li><strong>Expiry Alerts:</strong> Items expiring within 7 days are highlighted in orange, expired items in red</li>
          <li><strong>Edit & Delete:</strong> Update quantities or remove items as you use them</li>
          <li><strong>Smart Lists:</strong> Enable "Use Pantry" in the Weekly Planner to automatically subtract these items from your grocery list</li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', color: '#FF6600', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          📖 4. Recipe Library
        </h3>
        <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
          Explore our collection of authentic Indian recipes:
        </p>
        <ul style={{ color: '#555', lineHeight: 1.8, marginLeft: 20 }}>
          <li><strong>Browse by Cuisine:</strong> Filter recipes by South Indian, North Indian, Gujarati, or Bengali cuisines</li>
          <li><strong>Recipe Details:</strong> Each recipe shows meal type (breakfast/lunch/dinner), servings, and ingredient count</li>
          <li><strong>View Ingredients:</strong> Click on any recipe card to expand and see the full ingredient list with quantities</li>
          <li><strong>Meal Planning:</strong> Use these recipes when planning your weekly meals</li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', color: '#FF6600', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          🎉 5. Festival Templates
        </h3>
        <p style={{ color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
          Quick meal planning for Indian festivals:
        </p>
        <ul style={{ color: '#555', lineHeight: 1.8, marginLeft: 20 }}>
          <li><strong>Pre-configured Plans:</strong> Choose from festival templates like Diwali, Pongal, and Eid</li>
          <li><strong>Traditional Recipes:</strong> Each template includes authentic festival recipes</li>
          <li><strong>Special Items:</strong> Templates include traditional sweets, snacks, and special ingredients</li>
          <li><strong>One-Click Planning:</strong> Apply a festival template to quickly generate a complete grocery list</li>
          <li><strong>View Details:</strong> Expand templates to see all recipes and extra items before generating the list</li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.2rem', color: '#138808', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          💡 Tips for Best Results
        </h3>
        <ul style={{ color: '#555', lineHeight: 1.8, marginLeft: 20 }}>
          <li><strong>Start with Pantry:</strong> Add your existing ingredients to the Pantry Tracker before planning meals</li>
          <li><strong>Plan Ahead:</strong> Fill out your weekly meal plan at the start of each week</li>
          <li><strong>Mix Cuisines:</strong> Try different regional cuisines throughout the week for variety</li>
          <li><strong>Check Budget:</strong> Review the estimated budget before finalizing your meal plan</li>
          <li><strong>Update Regularly:</strong> Keep your pantry tracker updated as you shop and cook</li>
          <li><strong>Export Lists:</strong> Download CSV files to keep a record of your shopping history</li>
        </ul>
      </div>

      <div className="card" style={{ background: '#fff3e0', borderLeft: '4px solid #FF6600' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#FF6600', marginBottom: 12 }}>
          🚀 Quick Start Guide
        </h3>
        <ol style={{ color: '#555', lineHeight: 2, marginLeft: 20 }}>
          <li>Go to <strong>Recipe Library</strong> to browse available recipes</li>
          <li>Add your existing ingredients to <strong>Pantry Tracker</strong></li>
          <li>Visit <strong>Weekly Planner</strong> and select meals for the week</li>
          <li>Set your family size and enable "Use Pantry" if desired</li>
          <li>Click "Generate Grocery List" to create your shopping list</li>
          <li>View your organized <strong>Grocery List</strong> with budget estimates</li>
          <li>Export or print your list before heading to the store</li>
          <li>Check off items as you shop!</li>
        </ol>
      </div>
    </div>
  );
}
