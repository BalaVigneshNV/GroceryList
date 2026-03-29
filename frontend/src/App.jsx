import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import WeeklyPlanner from './components/WeeklyPlanner';
import GroceryList from './components/GroceryList';
import PantryTracker from './components/PantryTracker';
import RecipeLibrary from './components/RecipeLibrary';
import FestivalTemplates from './components/FestivalTemplates';
import HowToUse from './components/HowToUse';
import './App.css';

function App() {
  const [groceryData, setGroceryData] = useState(null);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">🛒 Indian Meals Grocery Planner</h1>
            <nav className="nav">
              <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>📅 Planner</NavLink>
              <NavLink to="/grocery-list" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>🛍️ Grocery List</NavLink>
              <NavLink to="/pantry" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>🏠 Pantry</NavLink>
              <NavLink to="/recipes" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>📖 Recipes</NavLink>
              <NavLink to="/festivals" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>🎉 Festivals</NavLink>
              <NavLink to="/how-to-use" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>❓ How to Use</NavLink>
            </nav>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<WeeklyPlanner onGroceryGenerated={setGroceryData} />} />
            <Route path="/grocery-list" element={<GroceryList groceryData={groceryData} />} />
            <Route path="/pantry" element={<PantryTracker />} />
            <Route path="/recipes" element={<RecipeLibrary />} />
            <Route path="/festivals" element={<FestivalTemplates />} />
            <Route path="/how-to-use" element={<HowToUse />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
