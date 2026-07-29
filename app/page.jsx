"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus, Calendar as CalendarIcon, CheckSquare, Utensils, ShoppingCart, Box, Copy, ChevronDown, ChevronRight, X, Sparkles } from "lucide-react";

// --- INITIAL DATA (Used only on first load) ---
const INITIAL_INVENTORY = [
  { id: "i1", name: "Tomato", emoji: "🍅", count: 12, unit: "pcs", category: "Vegetables" },
  { id: "i2", name: "Cheese", emoji: "🧀", count: 2, unit: "blocks", category: "Dairy" },
  { id: "i3", name: "Avocado", emoji: "🥑", count: 4, unit: "pcs", category: "Vegetables" },
  { id: "i4", name: "Chicken", emoji: "🍗", count: 5, unit: "packs", category: "Meat" },
  { id: "i5", name: "Spaghetti", emoji: "🍝", count: 2, unit: "packs", category: "Carbs" },
  { id: "i6", name: "Lettuce", emoji: "🥬", count: 2, unit: "heads", category: "Vegetables" },
  { id: "i7", name: "Rice", emoji: "🌾", count: 1, unit: "kg", category: "Carbs" },
  { id: "i8", name: "Tortilla", emoji: "🌮", count: 10, unit: "pcs", category: "Carbs" },
  { id: "i9", name: "Red Salsa", emoji: "🥫", count: 1, unit: "jars", category: "Pantry" },
  { id: "i10", name: "Olives", emoji: "🫒", count: 1, unit: "jars", category: "Pantry" },
  { id: "i11", name: "Beer", emoji: "🍺", count: 6, unit: "bottles", category: "Drinks" },
  { id: "i12", name: "Fish", emoji: "🐟", count: 2, unit: "fillets", category: "Meat" },
  { id: "i13", name: "Milk", emoji: "🥛", count: 2, unit: "liters", category: "Dairy" },
  { id: "i14", name: "Orange Juice", emoji: "🧃", count: 1, unit: "cartons", category: "Drinks" },
];

const INITIAL_RECIPES = [
  { id: "r1", name: "Spaghetti", emoji: "🍝", time: "20m", temp: "Stovetop", notes: "Al dente", ingredients: { Spaghetti: 1, Tomato: 2, Cheese: 1 } },
  { id: "r2", name: "Nachos", emoji: "🌮", time: "10m", temp: "180°C", notes: "Don't burn cheese", ingredients: { Tortilla: 5, Cheese: 1, Avocado: 1, "Red Salsa": 1 } },
  { id: "r3", name: "Chicken Curry", emoji: "🍗", time: "45m", temp: "Stovetop", notes: "Spicy", ingredients: { Chicken: 2, Rice: 1 } },
  { id: "r4", name: "Caesar Salad", emoji: "🥗", time: "10m", temp: "Cold", notes: "Extra dressing", ingredients: { Lettuce: 1, Chicken: 1, Cheese: 1 } },
];

const INITIAL_TASKS = [
  { id: "t1", text: "🧺 Laundry", category: "do", completed: false },
  { id: "t2", text: "❤️ Wife date", category: "do", completed: false },
  { id: "t3", text: "💻 Finish website", category: "schedule", completed: false },
];

const INITIAL_EVENTS = [
  { id: "2026-08-15", title: "🎂 Birthday", category: "Family" },
  { id: "2026-08-21", title: "⚽ Football", category: "Sports" },
  { id: "2026-08-22", title: "🎬 Cinema", category: "Leisure" },
];

export default function FamilyDashboard() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState("");

  // State Management
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [weeklyMealPlan, setWeeklyMealPlan] = useState({
    Monday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
    Tuesday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
    Wednesday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
    Thursday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
    Friday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
    Saturday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
    Sunday: { breakfast: null, lunch: null, dinner: null, drinks: {} },
  });

  // Load from Local Storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("familyDashboardState");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setEvents(parsed.events || INITIAL_EVENTS);
      setTasks(parsed.tasks || INITIAL_TASKS);
      setInventory(parsed.inventory || INITIAL_INVENTORY);
      setRecipes(parsed.recipes || INITIAL_RECIPES);
      setWeeklyMealPlan(parsed.weeklyMealPlan || weeklyMealPlan);
    }
    setIsLoaded(true);
  }, []);

  // Save to Local Storage on change
  useEffect(() => {
    if (isLoaded) {
      setSaveIndicator("Saving...");
      const dataToSave = { events, tasks, inventory, recipes, weeklyMealPlan };
      localStorage.setItem("familyDashboardState", JSON.stringify(dataToSave));
      
      const timeout = setTimeout(() => setSaveIndicator("✓ Saved locally"), 1000);
      return () => clearTimeout(timeout);
    }
  }, [events, tasks, inventory, recipes, weeklyMealPlan, isLoaded]);

  // --- HELPER FUNCTIONS ---
  const updateInventoryCount = (id, delta) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item));
  };

  const assignRecipeToMeal = (day, mealType, recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    setWeeklyMealPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [mealType]: recipe || null }
    }));
  };

  const assignDrinkToMeal = (day, mealType, drinkName) => {
    setWeeklyMealPlan(prev => ({
      ...prev,
      [day]: { 
        ...prev[day], 
        drinks: { ...prev[day].drinks, [mealType]: drinkName } 
      }
    }));
  };

  const getDrinkOptions = () => inventory.filter(i => i.category === "Drinks").map(i => i.name);

  // --- RENDER ---
  if (!isLoaded) return <div className="min-h-screen bg-[#F4F0E6] flex justify-center items-center font-black text-2xl">LOADING DASHBOARD...</div>;

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-black font-sans p-2 md:p-8 overflow-x-hidden">
      {/* Header */}
      <header className="mb-8 border-4 border-black bg-[#FF90E8] p-4 md:p-6 shadow-[4px_4px_0px_0px_#000] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">Family Dashboard</h1>
          <p className="font-semibold text-sm flex justify-center md:justify-start items-center gap-2">
            Organized. Direct. Neo-Brutalist. 
            <span className="bg-white text-xs px-2 py-1 border-2 border-black">{saveIndicator}</span>
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-2">
          {[
            { id: "calendar", label: "Calendar", icon: CalendarIcon, color: "bg-[#FFD500]" },
            { id: "tasks", label: "Tasks", icon: CheckSquare, color: "bg-[#4ADE80]" },
            { id: "planner", label: "Planner", icon: Utensils, color: "bg-[#A7F3D0]" },
            { id: "inventory", label: "Inventory", icon: Box, color: "bg-[#6EE7B7]" },
            { id: "shopping", label: "Buy", icon: ShoppingCart, color: "bg-[#F472B6]" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-2 border-black px-3 py-2 md:px-4 font-bold shadow-[2px_2px_0px_0px_#000] transition-transform active:translate-x-1 active:translate-y-1 text-sm md:text-base ${
                activeTab === tab.id ? `${tab.color} translate-x-[2px] translate-y-[2px] shadow-none` : "bg-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* --- TAB CONTENT: PLANNER --- */}
      {activeTab === "planner" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {Object.keys(weeklyMealPlan).map(day => (
              <div key={day} className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_0px_#000] flex flex-col gap-2">
                <h4 className="font-black border-b-4 border-black pb-1 uppercase text-center bg-[#FFD500]">{day}</h4>
                
                {['breakfast', 'lunch', 'dinner'].map(meal => (
                  <div key={meal} className="border-2 border-black p-2 bg-[#F4F0E6] flex flex-col gap-1">
                    <span className="font-black text-[10px] text-gray-800 uppercase tracking-wider">{meal === 'breakfast' ? '☀' : meal === 'lunch' ? '🍽' : '🌙'} {meal}</span>
                    
                    {/* Meal Selector */}
                    <select 
                      value={weeklyMealPlan[day][meal]?.id || ""}
                      onChange={(e) => assignRecipeToMeal(day, meal, e.target.value)}
                      className="w-full bg-white border-2 border-black p-1 font-bold outline-none cursor-pointer text-xs"
                    >
                      <option value="">+ Assign Meal</option>
                      {recipes.map(r => <option key={r.id} value={r.id}>{r.emoji} {r.name}</option>)}
                    </select>

                    {/* Drink Selector */}
                    <select 
                      value={weeklyMealPlan[day].drinks[meal] || ""}
                      onChange={(e) => assignDrinkToMeal(day, meal, e.target.value)}
                      className="w-full bg-[#A7F3D0] border-2 border-black p-1 font-bold outline-none cursor-pointer text-xs mt-1"
                    >
                      <option value="">+ Add Drink</option>
                      {getDrinkOptions().map(drink => <option key={drink} value={drink}>🥤 {drink}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: INVENTORY --- */}
      {activeTab === "inventory" && (
        <div className="space-y-6">
          {["Vegetables", "Dairy", "Meat", "Carbs", "Drinks", "Pantry"].map(category => {
            const items = inventory.filter(i => i.category === category);
            if (items.length === 0) return null;
            
            return (
              <div key={category} className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_#000] p-4">
                <h3 className="font-black text-xl border-b-4 border-black pb-2 mb-4 uppercase bg-[#FF90E8] inline-block px-2">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {items.map(item => (
                    <div key={item.id} className="border-2 border-black bg-[#F4F0E6] p-4 flex flex-col items-center justify-between aspect-square relative">
                      <span className="text-4xl">{item.emoji}</span>
                      <span className="font-black text-center text-sm leading-tight mt-2">{item.name}</span>
                      
                      <div className="flex items-center gap-2 border-2 border-black bg-white px-2 py-1 w-full justify-between mt-2">
                        <button onClick={() => updateInventoryCount(item.id, -1)} className="hover:bg-red-200 active:bg-red-400 font-black px-2">-</button>
                        <span className="font-bold text-sm">{item.count}</span>
                        <button onClick={() => updateInventoryCount(item.id, 1)} className="hover:bg-green-200 active:bg-green-400 font-black px-2">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Fallback for other tabs - Minimal implementation to keep code short for the fix */}
      {activeTab !== "planner" && activeTab !== "inventory" && (
        <div className="border-4 border-black bg-white p-8 shadow-[4px_4px_0px_0px_#000] text-center font-black text-xl">
          {activeTab.toUpperCase()} MODULE LOADED - Swap between Planner and Inventory to see the main updates.
        </div>
      )}
    </div>
  );
}