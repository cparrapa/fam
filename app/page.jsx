"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Plus, Minus, Calendar as CalendarIcon, CheckSquare, Utensils, ShoppingCart, Box, Trash2, Wand2, Copy, X, ChevronDown, ChevronRight, Download, Upload, Edit2, Check } from "lucide-react";

// Categorized Inventory
const INITIAL_INVENTORY = [
  // Vegetables
  { id: "i1", name: "Tomato", emoji: "🍅", count: 2, category: "Vegetables" },
  { id: "i8", name: "Cherry Tomato", emoji: "🍅", count: 0, category: "Vegetables" },
  { id: "i39", name: "Cucumber", emoji: "🥒", count: 0, category: "Vegetables" },
  { id: "i40", name: "Pumpkin", emoji: "🎃", count: 0, category: "Vegetables" },
  { id: "i20", name: "Carrot", emoji: "🥕", count: 0, category: "Vegetables" },
  { id: "i21", name: "Potato", emoji: "🥔", count: 0, category: "Vegetables" },
  { id: "i21b", name: "Sweet Potato", emoji: "🍠", count: 0, category: "Vegetables" },
  { id: "i22", name: "Corn", emoji: "🌽", count: 0, category: "Vegetables" },
  { id: "i23", name: "Broccoli", emoji: "🥦", count: 0, category: "Vegetables" },
  { id: "i56", name: "Cauliflower", emoji: "🥦", count: 0, category: "Vegetables" },
  { id: "i26", name: "Pepper", emoji: "🌶️", count: 0, category: "Vegetables" },
  { id: "i18", name: "Onions", emoji: "🧅", count: 0, category: "Vegetables" },
  { id: "i30", name: "Garlic", emoji: "🧄", count: 0, category: "Vegetables" },
  { id: "i31", name: "Eggplant", emoji: "🍆", count: 0, category: "Vegetables" },
  { id: "i38", name: "Mushroom", emoji: "🍄", count: 0, category: "Vegetables" },
  { id: "i57", name: "Spinach", emoji: "🍃", count: 0, category: "Vegetables" },
  { id: "i58", name: "Lettuce", emoji: "🥬", count: 0, category: "Vegetables" },
  { id: "i59", name: "Zucchini", emoji: "🥒", count: 0, category: "Vegetables" },
  { id: "i60", name: "Cabbage", emoji: "🥬", count: 0, category: "Vegetables" },
  { id: "i61", name: "Cilantro", emoji: "🌿", count: 0, category: "Vegetables" },
  { id: "i62", name: "Asparagus", emoji: "🌿", count: 0, category: "Vegetables" },
  { id: "i63", name: "Peas", emoji: "🫛", count: 0, category: "Vegetables" },
  { id: "i64", name: "Radish", emoji: "🫜", count: 0, category: "Vegetables" },
  { id: "i65", name: "Leek", emoji: "🥬", count: 0, category: "Vegetables" },
  
  // Fruits
  { id: "i35", name: "Banana", emoji: "🍌", count: 0, category: "Fruits" },
  { id: "i36", name: "Apple", emoji: "🍎", count: 0, category: "Fruits" },
  { id: "i46", name: "Orange", emoji: "🍊", count: 0, category: "Fruits" },
  { id: "i17", name: "Lemons", emoji: "🍋", count: 0, category: "Fruits" },
  { id: "i3", name: "Avocado", emoji: "🥑", count: 4, category: "Fruits" },
  { id: "i45", name: "Pineapple", emoji: "🍍", count: 0, category: "Fruits" },
  { id: "i47", name: "Pear", emoji: "🍐", count: 0, category: "Fruits" },
  { id: "i42", name: "Strawberries", emoji: "🍓", count: 0, category: "Fruits" },
  { id: "i43", name: "Blueberries", emoji: "🫐", count: 0, category: "Fruits" },  
  { id: "i50", name: "Grapes", emoji: "🍇", count: 0, category: "Fruits" },
  { id: "i44", name: "Kiwi", emoji: "🥝", count: 0, category: "Fruits" },
  { id: "i49", name: "Watermelon", emoji: "🍉", count: 0, category: "Fruits" },
  { id: "i51", name: "Pomegranate", emoji: "🫐", count: 0, category: "Fruits" },
  { id: "i53", name: "Mango", emoji: "🥭", count: 0, category: "Fruits" },
  { id: "i54", name: "Grapefruit", emoji: "🍊", count: 0, category: "Fruits" },
  { id: "i55", name: "Tangerine", emoji: "🍊", count: 0, category: "Fruits" },
  { id: "i52", name: "Coconut", emoji: "🥥", count: 0, category: "Fruits" },
  
  // Dairy
  { id: "i13", name: "Eggs", emoji: "🥚", count: 0, category: "Dairy" },
  { id: "i2", name: "Cheese", emoji: "🧀", count: 2, category: "Dairy" },
  { id: "i41", name: "Parmesan", emoji: "🧀", count: 0, category: "Dairy" },
  { id: "i66", name: "Mozzarella", emoji: "🧀", count: 0, category: "Dairy" },
  { id: "i12", name: "Butter", emoji: "🧈", count: 1, category: "Dairy" },
  { id: "i15", name: "Yogurt", emoji: "🥛", count: 0, category: "Dairy" },
  
  // Meat & Seafood
  { id: "i9", name: "Fish", emoji: "🐟", count: 0, category: "Meat" },
  { id: "i4", name: "Chicken", emoji: "🍗", count: 5, category: "Meat" },
  { id: "i67", name: "Chicken Wings", emoji: "🐔", count: 0, category: "Meat" },
  { id: "i68", name: "Beef", emoji: "🥩", count: 0, category: "Meat" },
  { id: "i69", name: "Pork", emoji: "🐷", count: 0, category: "Meat" },
  { id: "i10", name: "Ham", emoji: "🍖", count: 0, category: "Meat" },
  { id: "i14", name: "Bacon", emoji: "🥓", count: 0, category: "Meat" },
  { id: "i33", name: "Sausages", emoji: "🌭", count: 0, category: "Meat" },
  { id: "i32", name: "Meat Balls", emoji: "🧆", count: 0, category: "Meat" },
  
  // Carbs
  { id: "i5", name: "Tortilla", emoji: "🌮", count: 0, category: "Carbs" },
  { id: "i70", name: "Nachos", emoji: "🧀", count: 0, category: "Carbs" },
  { id: "i71", name: "Baguette", emoji: "🥖", count: 0, category: "Carbs" },
  { id: "i72", name: "Dumplings", emoji: "🥟", count: 0, category: "Carbs" },
  { id: "i24", name: "Pasta", emoji: "🍝", count: 0, category: "Carbs" },
  { id: "i25", name: "Rice", emoji: "🍚", count: 0, category: "Carbs" },
  { id: "i73", name: "Couscous", emoji: "🍚", count: 0, category: "Carbs" },
  { id: "i74", name: "Bulgur", emoji: "🍚", count: 0, category: "Carbs" },
  { id: "i37", name: "Bread", emoji: "🍞", count: 0, category: "Carbs" },
  { id: "i16", name: "Cereal", emoji: "🥣", count: 0, category: "Carbs" },
  { id: "i19", name: "Oatmeal", emoji: "🥣", count: 0, category: "Carbs" },
  
  // Pantry & Other
  { id: "i6", name: "Red Salsa", emoji: "🥫", count: 0, category: "Pantry" },
  { id: "i7", name: "Olives", emoji: "🫒", count: 0, category: "Pantry" },
  { id: "i11", name: "Hummus", emoji: "🧆", count: 0, category: "Pantry" },
  { id: "i27", name: "Mayonnaise", emoji: "🥚", count: 0, category: "Pantry" },
  { id: "i28", name: "Tartare", emoji: "🥣", count: 0, category: "Pantry" },
  { id: "i29", name: "Mustard", emoji: "🌭", count: 0, category: "Pantry" },
  { id: "i66b", name: "Beans", emoji: "🫘", count: 0, category: "Pantry" },
  { id: "i67b", name: "Nachos (Bag)", emoji: "🧀", count: 0, category: "Pantry" },
  { id: "i68b", name: "Waffles (Frozen)", emoji: "🧇", count: 0, category: "Pantry" },
  
  // Drinks
  { id: "d1", name: "Water", emoji: "💧", count: 10, category: "Drinks" },
  { id: "d2", name: "Coffee", emoji: "☕", count: 5, category: "Drinks" },
  { id: "d3", name: "Tea", emoji: "🍵", count: 5, category: "Drinks" },
  { id: "d4", name: "Milk", emoji: "🥛", count: 2, category: "Drinks" },
  { id: "d5", name: "Juice", emoji: "🧃", count: 1, category: "Drinks" },
  { id: "d6", name: "Wine", emoji: "🍷", count: 1, category: "Drinks" },
  { id: "d7", name: "Beer", emoji: "🍺", count: 2, category: "Drinks" },
];

const INITIAL_RECIPES = [
  { id: "r1", name: "Spaghetti", emoji: "🍝", time: "20 min", temp: "100°C", note: "Al dente is best", ingredients: { "i24": 1, "i1": 4, "i41": 1 } },
  { id: "r2", name: "Nachos", emoji: "🌮", time: "15 min", temp: "200°C", note: "Don't burn the chips!", ingredients: { "i5": 1, "i2": 2, "i6": 1, "i3": 2 } },
  { id: "r3", name: "Chicken Curry", emoji: "🍗", time: "45 min", temp: "Medium", note: "Add extra spice", ingredients: { "i4": 2, "i25": 1, "i18": 1 } },
  { id: "r4", name: "Avocado Toast", emoji: "🥑", time: "5 min", temp: "Toaster", note: "Add lemon", ingredients: { "i37": 2, "i3": 1, "i17": 1 } },
  { id: "r5", name: "Fish & Chips", emoji: "🐟", time: "30 min", temp: "200°C", note: "Crispy batter", ingredients: { "i9": 2, "i21": 4, "i17": 1 } },
  { id: "r6", name: "Mac & Cheese", emoji: "🧀", time: "25 min", temp: "180°C", note: "Extra cheesy", ingredients: { "i24": 1, "i2": 2, "d4": 1, "i12": 1 } },
  { id: "r7", name: "Oatmeal Bowl", emoji: "🥣", time: "10 min", temp: "Stovetop", note: "Top with fruits", ingredients: { "i19": 1, "d4": 1, "i35": 1, "i36": 1 } },
  { id: "r8", name: "Grilled Chicken Salad", emoji: "🥗", time: "15 min", temp: "Grill", note: "Fresh and light", ingredients: { "i4": 1, "i39": 1, "i38": 5, "i18": 1 } },
  { id: "r9", name: "Meat Balls", emoji: "🧆", time: "30 min", temp: "Medium", note: "Serve with sauce", ingredients: { "i32": 5, "i24": 1, "i1": 2 } },
  { id: "r10", name: "Eggs Benedict", emoji: "🥚", time: "20 min", temp: "Medium", note: "Perfect for brunch", ingredients: { "i13": 2, "i37": 2, "i12": 1, "i18": 1 } },
  { id: "r11", name: "Scrambled Eggs", emoji: "🥚", time: "10 min", temp: "Medium", note: "Add cheese for flavor", ingredients: { "i13": 3, "i2": 1, "i12": 1 } },
  { id: "r12", name: "Bacon & Eggs", emoji: "🥓🥚", time: "15 min", temp: "Medium", note: "Classic breakfast", ingredients: { "i14": 4, "i13": 2, "i37": 2 } },
  { id: "r13", name: "Waffles", emoji: "🧇", time: "15 min", temp: "200°C", note: "Serve with syrup", ingredients: { "i19": 1, "d4": 1, "i12": 1 } },
  { id: "r14", name: "Chili Con Carne", emoji: "🌶️", time: "40 min", temp: "Medium", note: "Spicy and hearty", ingredients: { "i4": 2, "i26": 1, "i6": 1, "i25": 1 } },
  { id: "r15", name: "Vegetable Stir Fry", emoji: "🥦", time: "20 min", temp: "High", note: "Quick and healthy", ingredients: { "i23": 1, "i20": 1, "i21": 1, "i18": 1 } }
];

const INITIAL_EVENTS = [
  { id: "e1", date: "2026-08-15", title: "🎂 Birthday" },
  { id: "e2", date: "2026-08-22", title: "🏖 Holiday" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [toastMessage, setToastMessage] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const [tasks, setTasks] = useState([
    { id: "t1", text: "🧺 Laundry", quadrant: "do", completed: false },
    { id: "t2", text: "❤️ Wife date", quadrant: "do", completed: false }
  ]);
  
  const [mealPlan, setMealPlan] = useState({
    Monday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null },
    Tuesday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null },
    Wednesday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null },
    Thursday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null },
    Friday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null },
    Saturday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null },
    Sunday: { breakfast: null, breakfastDrink: null, lunch: null, lunchDrink: null, dinner: null, dinnerDrink: null }
  });

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateInventory = (id, delta) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
    ));
    updateTimestamp();
  };

  const updateTimestamp = () => {
    const now = new Date();
    setLastUpdated(`${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
  };

  // Export Data as JSON
  const handleExport = () => {
    const data = { events, tasks, inventory, recipes, mealPlan };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `family-board-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    showToast("Data exported!");
  };

  // Import Data from JSON
  const handleImport = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
         const parsed = JSON.parse(evt.target.result);
         if(parsed.events) setEvents(parsed.events);
         if(parsed.tasks) setTasks(parsed.tasks);
         if(parsed.inventory) setInventory(parsed.inventory);
         if(parsed.recipes) setRecipes(parsed.recipes);
         if(parsed.mealPlan) setMealPlan(parsed.mealPlan);
         updateTimestamp();
         showToast("Data imported successfully!");
      } catch (err) { 
         showToast("Error: Invalid file format!"); 
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-black font-sans selection:bg-[#FF90E8] flex flex-col relative pb-24">
      <title>Family Dashboard</title>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFD500" />
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100] bg-black text-white border-2 border-black px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_0_#FFD500] animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* COMPACT HEADER */}
      <header className="border-b-4 border-black bg-[#FFD500] p-2 shadow-[4px_4px_0_0_#000] sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex justify-between items-center w-full sm:w-auto px-2">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">Family Board</h1>
            
            <div className="flex gap-2 sm:hidden">
              <button onClick={handleExport} className="p-1 bg-white border-2 border-black shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5"><Download size={16}/></button>
              <button onClick={() => fileInputRef.current.click()} className="p-1 bg-white border-2 border-black shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5"><Upload size={16}/></button>
            </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center gap-1 sm:gap-2 w-full sm:w-auto">
          {[
            { id: 'calendar', label: 'Dates', icon: CalendarIcon, color: 'bg-[#FF90E8]' },
            { id: 'tasks', label: 'Tasks', icon: CheckSquare, color: 'bg-[#4ADE80]' },
            { id: 'planner', label: 'Meals', icon: Utensils, color: 'bg-[#A7F3D0]' },
            { id: 'inventory', label: 'Bag', icon: Box, color: 'bg-white' },
            { id: 'shopping', label: 'Buy', icon: ShoppingCart, color: 'bg-[#FF8A8A]' },
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 border-2 border-black px-2 py-1 md:px-3 text-xs font-black uppercase shadow-[2px_2px_0_0_#000] transition-transform active:translate-x-0.5 active:translate-y-0.5
                ${activeTab === tab.id ? `${tab.color} translate-x-0.5 translate-y-0.5 !shadow-none` : tab.color}`}
            >
              <tab.icon size={14} className="hidden sm:block" /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex flex-col items-end gap-1 px-2">
            <div className="flex gap-2">
              <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
              <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-1 text-[10px] bg-white border-2 border-black px-2 py-0.5 font-bold uppercase hover:bg-black hover:text-white"><Upload size={12}/> Import</button>
              <button onClick={handleExport} className="flex items-center gap-1 text-[10px] bg-white border-2 border-black px-2 py-0.5 font-bold uppercase hover:bg-black hover:text-white"><Download size={12}/> Export</button>
            </div>
            {lastUpdated && <span className="text-[10px] font-bold opacity-60 uppercase">Updated: {lastUpdated}</span>}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-2 md:p-4 max-w-7xl mx-auto w-full">
        {activeTab === 'calendar' && <CalendarView events={events} setEvents={setEvents} showToast={showToast} updateTimestamp={updateTimestamp} />}
        {activeTab === 'tasks' && <MatrixView tasks={tasks} setTasks={setTasks} showToast={showToast} updateTimestamp={updateTimestamp} />}
        {activeTab === 'planner' && <PlannerView mealPlan={mealPlan} setMealPlan={setMealPlan} recipes={recipes} setRecipes={setRecipes} inventory={inventory} setInventory={setInventory} showToast={showToast} updateTimestamp={updateTimestamp} />}
        {activeTab === 'inventory' && <InventoryView inventory={inventory} updateInventory={updateInventory} showToast={showToast} />}
        {activeTab === 'shopping' && <ShoppingView mealPlan={mealPlan} inventory={inventory} recipes={recipes} updateInventory={updateInventory} showToast={showToast} />}
      </main>
    </div>
  );
}

function CalendarView({ events, setEvents, showToast, updateTimestamp }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); 
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [formTitle, setFormTitle] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = (firstDay + 6) % 7; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const quickEmojis = ['🎂', '🏖', '⚽', '🎬', '✈️', '🎉'];

  const getDayStr = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const displayedEvents = selectedDateStr ? events.filter(e => e.date === selectedDateStr) : events.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));

  const openModal = (evt = null) => {
    if (evt) { setEditEventId(evt.id); setFormTitle(evt.title); } 
    else { setEditEventId(null); setFormTitle(""); }
    setIsModalOpen(true);
  };

  const saveEvent = () => {
    if (!formTitle.trim() || !selectedDateStr) return;
    if (editEventId) {
      setEvents(events.map(e => e.id === editEventId ? { ...e, title: formTitle } : e));
    } else {
      setEvents([...events, { id: "evt" + Date.now(), date: selectedDateStr, title: formTitle }]);
    }
    updateTimestamp();
    setIsModalOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    updateTimestamp();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Smaller Calendar Grid */}
      <div className="lg:col-span-2 border-4 border-black bg-white shadow-[4px_4px_0_0_#000] p-3 md:p-4">
        <div className="flex justify-between items-center border-b-4 border-black pb-2 mb-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="border-2 border-black bg-[#F4F0E6] px-2 py-1 font-black shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5">&lt;</button>
            <h2 className="text-xl md:text-2xl font-black uppercase w-24 text-center">{monthNames[month]} {year}</h2>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="border-2 border-black bg-[#F4F0E6] px-2 py-1 font-black shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5">&gt;</button>
          </div>
          <button onClick={() => {const d=new Date(); setCurrentDate(new Date(d.getFullYear(), d.getMonth(), 1));}} className="border-2 border-black bg-[#4ADE80] px-3 py-1 font-black uppercase text-xs shadow-[2px_2px_0_0_#000]">Today</button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center font-black uppercase text-[10px] md:text-xs mb-1">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d} className="bg-black text-white py-1">{d}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDay }).map((_, i) => <div key={`blank-${i}`} className="h-10 md:h-14 bg-gray-200 border-2 border-black opacity-30"></div>)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const dateStr = getDayStr(d);
            const hasEvent = events.some(e => e.date === dateStr);
            const isSelected = selectedDateStr === dateStr;
            return (
              <div 
                key={d} onClick={() => setSelectedDateStr(isSelected ? null : dateStr)}
                className={`h-10 md:h-14 border-2 border-black p-1 flex flex-col justify-between cursor-pointer hover:bg-[#FFD500] 
                  ${isSelected ? 'bg-[#FF90E8] shadow-[inset_2px_2px_0_0_#000]' : 'bg-[#F4F0E6]'}`}
              >
                <span className="font-black text-xs md:text-sm leading-none">{d}</span>
                {hasEvent && <div className="h-1.5 w-full bg-black mt-1"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Sidebar */}
      <div className="border-4 border-black bg-[#FFD500] shadow-[4px_4px_0_0_#000] flex flex-col h-[400px] lg:h-[500px]">
        <div className="p-3 border-b-4 border-black bg-white flex justify-between items-center">
          <h2 className="text-lg font-black uppercase truncate">{selectedDateStr || 'Overview'}</h2>
          <button 
            disabled={!selectedDateStr}
            onClick={() => openModal()}
            className={`border-2 border-black px-2 py-1 font-black text-xs uppercase shadow-[2px_2px_0_0_#000] whitespace-nowrap
              ${selectedDateStr ? 'bg-[#4ADE80] active:translate-x-0.5 active:translate-y-0.5' : 'bg-gray-300 opacity-50'}`}
          >
            + Add
          </button>
        </div>
        
        <div className="p-3 flex-1 overflow-y-auto space-y-3">
          {displayedEvents.length === 0 ? (
            <div className="p-2 border-2 border-black bg-white font-bold text-xs uppercase text-center">No events</div>
          ) : (
            displayedEvents.map(evt => (
              <div key={evt.id} className="border-2 border-black bg-white p-2 shadow-[2px_2px_0_0_#000]">
                {!selectedDateStr && <div className="bg-black text-white font-black text-[9px] px-1 inline-block mb-1">{evt.date}</div>}
                <h3 className="text-sm font-black break-words">{evt.title}</h3>
                <div className="mt-2 flex gap-2">
                   <button onClick={() => openModal(evt)} className="text-[10px] bg-[#FFD500] border-2 border-black font-black px-2 py-0.5 uppercase">Edit</button>
                   <button onClick={() => deleteEvent(evt.id)} className="text-[10px] bg-[#FF8A8A] border-2 border-black font-black px-2 py-0.5 uppercase">Del</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Event Modal with Emoji Picker */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] w-full max-w-sm p-4 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 bg-red-400 border-2 border-black w-8 h-8 flex items-center justify-center font-black"><X size={16} /></button>
            <h2 className="text-xl font-black uppercase mb-4">{editEventId ? 'Edit Event' : 'New Event'}</h2>
            
            <div className="flex gap-2 mb-3">
               {quickEmojis.map(emo => (
                   <button key={emo} onClick={() => setFormTitle(prev => emo + " " + prev)} className="w-8 h-8 bg-[#F4F0E6] border-2 border-black text-sm hover:bg-[#FFD500] shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5">{emo}</button>
               ))}
            </div>

            <input 
              type="text" 
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              placeholder="Event Title..."
              className="w-full border-2 border-black p-2 font-black text-sm focus:outline-none focus:bg-[#FFD500] mb-4" 
            />
            <button onClick={saveEvent} className="w-full bg-[#4ADE80] border-2 border-black py-2 font-black text-sm uppercase shadow-[2px_2px_0_0_#000]">Save Event</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatrixView({ tasks, setTasks, updateTimestamp }) {
  const [newTaskInput, setNewTaskInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal] = useState("");

  const quadrants = [
    { id: "do", title: "Do First", bg: "bg-[#FF8A8A]" },
    { id: "schedule", title: "Schedule", bg: "bg-[#93C5FD]" },
    { id: "delegate", title: "Delegate", bg: "bg-[#FDE047]" },
    { id: "eliminate", title: "Don't Do", bg: "bg-[#E5E7EB]" },
  ];

  const handleAddTask = () => {
    if(newTaskInput.trim()) {
      setTasks([...tasks, { id: "t" + Date.now(), text: newTaskInput, quadrant: "do", completed: false }]);
      setNewTaskInput("");
      updateTimestamp();
    }
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editVal } : t));
    setEditingId(null);
    updateTimestamp();
  };

  const onDragStart = (e, taskId) => e.dataTransfer.setData("taskId", taskId);
  const onDrop = (e, quadId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if(taskId) { setTasks(tasks.map(t => t.id === taskId ? { ...t, quadrant: quadId } : t)); updateTimestamp(); }
  };

  // Mobile tap-to-move logic
  const [selectedMobileTask, setSelectedMobileTask] = useState(null);
  const handleMobileQuadTap = (quadId) => {
      if(selectedMobileTask) {
          setTasks(tasks.map(t => t.id === selectedMobileTask ? { ...t, quadrant: quadId } : t));
          setSelectedMobileTask(null);
          updateTimestamp();
      }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Compact Input Row */}
      <div className="flex gap-2">
         <input 
           placeholder="Add a new task..." 
           value={newTaskInput}
           onChange={e => setNewTaskInput(e.target.value)}
           onKeyDown={e => e.key === 'Enter' && handleAddTask()}
           className="flex-1 border-4 border-black p-2 font-bold text-sm focus:outline-none focus:bg-[#FFD500] shadow-[inset_2px_2px_0_0_#000]" 
         />
         <button onClick={handleAddTask} className="border-4 border-black bg-white px-4 font-black uppercase text-xs shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5">Add</button>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map(q => (
          <div 
            key={q.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, q.id)}
            onClick={() => handleMobileQuadTap(q.id)}
            className={`border-4 border-black ${q.bg} p-3 shadow-[4px_4px_0_0_#000] flex flex-col min-h-[200px] ${selectedMobileTask ? 'cursor-pointer hover:opacity-80 ring-2 ring-black' : ''}`}
          >
            <h2 className="text-lg font-black uppercase border-b-2 border-black pb-1 mb-3">{q.title}</h2>
            
            <div className="flex-1 flex flex-col gap-2">
              {tasks.filter(t => t.quadrant === q.id).map(task => (
                <div 
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  onClick={(e) => { e.stopPropagation(); setSelectedMobileTask(task.id === selectedMobileTask ? null : task.id); }}
                  className={`border-2 border-black p-2 shadow-[2px_2px_0_0_#000] flex items-center justify-between gap-2 transition-transform w-full
                    ${task.completed ? 'bg-gray-300 opacity-70' : 'bg-[#FFD500]'}
                    ${selectedMobileTask === task.id ? 'scale-105 z-10 ring-2 ring-white' : ''}
                  `}
                >
                  <div className="flex items-center gap-2 flex-1 overflow-hidden">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setTasks(tasks.map(x => x.id === task.id ? {...x, completed: !x.completed} : x)); updateTimestamp(); }}
                        className="w-5 h-5 border-2 border-black bg-white flex-shrink-0 flex items-center justify-center"
                    >
                        {task.completed && <Check size={14} strokeWidth={4} />}
                    </button>
                    
                    {editingId === task.id ? (
                        <input autoFocus value={editVal} onChange={e=>setEditVal(e.target.value)} onKeyDown={e=>e.key==='Enter' && saveEdit(task.id)} onBlur={()=>saveEdit(task.id)} onClick={e=>e.stopPropagation()} className="font-bold text-xs w-full bg-white px-1 outline-none border border-black" />
                    ) : (
                        <p className={`font-bold text-xs break-words truncate ${task.completed ? 'line-through' : ''}`}>{task.text}</p>
                    )}
                  </div>
                  
                  {/* Persistent Edit/Delete Actions */}
                  <div className="flex gap-1 flex-shrink-0" onClick={e=>e.stopPropagation()}>
                     <button onClick={() => { setEditingId(task.id); setEditVal(task.text); }} className="p-1 bg-white border border-black hover:bg-gray-200"><Edit2 size={12}/></button>
                     <button onClick={() => { setTasks(tasks.filter(x => x.id !== task.id)); updateTimestamp(); }} className="p-1 bg-[#FF8A8A] border border-black hover:bg-red-500"><Trash2 size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerView({ mealPlan, setMealPlan, recipes, setRecipes, inventory, updateTimestamp }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const drinksList = useMemo(() => inventory.filter(i => i.category === "Drinks"), [inventory]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  
  // New Recipe Form State
  const [newRName, setNewRName] = useState("");
  const [newREmoji, setNewREmoji] = useState("🍽");
  const [newRTime, setNewRTime] = useState("");
  const [newRTemp, setNewRTemp] = useState("");
  const [newRNote, setNewRNote] = useState("");
  const [newRIngredients, setNewRIngredients] = useState({});

  const assignMeal = (day, meal, recipeId) => {
    setMealPlan(prev => ({ ...prev, [day]: { ...prev[day], [meal]: recipeId } }));
    updateTimestamp();
  };
  
  const assignDrink = (day, mealDrinkField, drinkId) => {
    setMealPlan(prev => ({ ...prev, [day]: { ...prev[day], [mealDrinkField]: drinkId } }));
    updateTimestamp();
  };

  // Planner Drag and Drop (Library -> Board OR Board -> Board)
  const onDragStartRecipe = (e, recipeId) => {
      e.dataTransfer.setData("recipeId", recipeId);
  };
  
  const onDragStartBoardItem = (e, recipeId, sourceDay, sourceMeal) => {
      e.dataTransfer.setData("recipeId", recipeId);
      e.dataTransfer.setData("source", JSON.stringify({ day: sourceDay, meal: sourceMeal }));
  };

  const onDropToSlot = (e, targetDay, targetMeal) => {
    e.preventDefault();
    const recipeId = e.dataTransfer.getData("recipeId");
    const sourceDataStr = e.dataTransfer.getData("source");

    if(recipeId) {
        // Drop into new slot
        assignMeal(targetDay, targetMeal, recipeId);
        
        // If it came from the board, clear the old slot
        if(sourceDataStr) {
            const src = JSON.parse(sourceDataStr);
            if(src.day !== targetDay || src.meal !== targetMeal) {
                assignMeal(src.day, src.meal, null);
            }
        }
    }
  };

  // Recipe Creator Logic
  const toggleIngredient = (invId) => {
    setNewRIngredients(prev => {
      const next = { ...prev };
      if (next[invId]) next[invId] += 1;
      else next[invId] = 1;
      return next;
    });
  };

  const removeIngredientQty = (invId) => {
    setNewRIngredients(prev => {
      const next = { ...prev };
      if (next[invId] > 1) next[invId] -= 1;
      else delete next[invId];
      return next;
    });
  };

  const saveRecipe = () => {
    if (!newRName.trim()) return;
    setRecipes([...recipes, {
      id: "r" + Date.now(),
      name: newRName,
      emoji: newREmoji,
      ingredients: newRIngredients,
      time: newRTime || "N/A",
      temp: newRTemp || "N/A",
      note: newRNote || ""
    }]);
    updateTimestamp();
    setIsCreatorOpen(false);
    setNewRName(""); setNewREmoji("🍽"); setNewRTime(""); setNewRTemp(""); setNewRNote(""); setNewRIngredients({});
  };

  const MealSlot = ({ day, title, icon, mealType, drinkField, bgClass }) => (
    <div 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => onDropToSlot(e, day, mealType)} 
        className={`flex-1 border-b-2 border-black p-1 ${bgClass} bg-opacity-40 flex flex-col group`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] font-black uppercase tracking-tighter">{icon} {title}</span>
        <select 
          value={mealPlan[day][drinkField] || ""}
          onChange={(e) => assignDrink(day, drinkField, e.target.value)}
          className="text-[9px] font-black uppercase bg-white border border-black outline-none w-16 px-0.5"
        >
          <option value="">Drink</option>
          {drinksList.map(d => <option key={d.id} value={d.id}>{d.emoji}</option>)}
        </select>
      </div>

      {mealPlan[day][mealType] ? (
        <div 
            draggable 
            onDragStart={(e) => onDragStartBoardItem(e, mealPlan[day][mealType], day, mealType)}
            onClick={() => setSelectedRecipe(recipes.find(r=>r.id === mealPlan[day][mealType]))}
            className="bg-white border-2 border-black p-1 shadow-[2px_2px_0_0_#000] relative cursor-pointer hover:bg-gray-50 flex items-center justify-between"
        >
           <div className="flex items-center gap-1 overflow-hidden">
               <span className="text-sm">{recipes.find(r=>r.id === mealPlan[day][mealType])?.emoji}</span>
               <span className="font-bold text-[10px] uppercase truncate">{recipes.find(r=>r.id === mealPlan[day][mealType])?.name}</span>
           </div>
           <button onClick={(e) => {e.stopPropagation(); assignMeal(day, mealType, null);}} className="bg-[#FF8A8A] border border-black text-black w-4 h-4 flex items-center justify-center font-black text-[8px] hover:bg-black hover:text-white z-10"><X size={10}/></button>
        </div>
      ) : (
        <div className="flex-1 border-2 border-dashed border-black opacity-30 flex items-center justify-center text-[9px] font-black uppercase text-center p-1">Drop</div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Recipe Sidebar */}
      <div className="w-full lg:w-1/4 border-4 border-black bg-white shadow-[4px_4px_0_0_#000] flex flex-col h-64 lg:h-[70vh]">
        <div className="bg-[#A7F3D0] p-2 border-b-4 border-black flex justify-between items-center">
          <h2 className="text-sm font-black uppercase">Recipes</h2>
          <button onClick={() => setIsCreatorOpen(true)} className="bg-black text-white font-black px-2 py-0.5 text-[10px] border-2 border-black hover:bg-white hover:text-black uppercase shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5">+ New</button>
        </div>
        <div className="p-2 flex-1 overflow-y-auto space-y-2 bg-[#F4F0E6] flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden">
          {recipes.map(recipe => (
            <div 
              key={recipe.id} draggable onDragStart={(e) => onDragStartRecipe(e, recipe.id)}
              className="border-2 border-black bg-white p-2 flex items-center justify-between cursor-grab active:cursor-grabbing shadow-[2px_2px_0_0_#000] min-w-[140px] lg:min-w-0 group hover:bg-[#FFD500]"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                 <span className="text-xl">{recipe.emoji}</span>
                 <span className="font-black uppercase text-[10px] leading-tight truncate">{recipe.name}</span>
              </div>
              <button onClick={() => setSelectedRecipe(recipe)} className="border border-black bg-white font-bold text-[8px] uppercase px-1 py-0.5 hover:bg-black hover:text-white">View</button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Weekly Board */}
      <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="border-2 border-black bg-white shadow-[2px_2px_0_0_#000] flex flex-col">
            <h3 className="bg-black text-white text-center font-black uppercase py-1 text-[10px] border-b-2 border-black">{day.substring(0,3)}</h3>
            <MealSlot day={day} title="Bkfst" icon="☀" mealType="breakfast" drinkField="breakfastDrink" bgClass="bg-[#FDE047]" />
            <MealSlot day={day} title="Lunch" icon="🍽" mealType="lunch" drinkField="lunchDrink" bgClass="bg-[#FFD500]" />
            <MealSlot day={day} title="Dinnr" icon="🌙" mealType="dinner" drinkField="dinnerDrink" bgClass="bg-[#93C5FD]" />
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] w-full max-w-sm p-4 relative">
            <button onClick={() => setSelectedRecipe(null)} className="absolute top-2 right-2 bg-red-400 border-2 border-black w-8 h-8 flex items-center justify-center font-black"><X size={16} /></button>
            <div className="flex items-center gap-3 border-b-4 border-black pb-2 mb-3">
              <span className="text-4xl">{selectedRecipe.emoji}</span>
              <h2 className="text-2xl font-black uppercase truncate">{selectedRecipe.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="border-2 border-black bg-[#FFD500] p-1 text-center shadow-[2px_2px_0_0_#000]">
                <span className="block text-[10px] font-black uppercase">Time</span>
                <span className="font-bold text-sm">{selectedRecipe.time}</span>
              </div>
              <div className="border-2 border-black bg-[#FF8A8A] p-1 text-center shadow-[2px_2px_0_0_#000]">
                <span className="block text-[10px] font-black uppercase">Temp</span>
                <span className="font-bold text-sm">{selectedRecipe.temp}</span>
              </div>
            </div>
            {selectedRecipe.note && (
              <div className="border-2 border-black bg-[#A7F3D0] p-2 mb-3 shadow-[2px_2px_0_0_#000]">
                <span className="block text-[10px] font-black uppercase mb-1">Note</span>
                <span className="font-bold text-xs uppercase">{selectedRecipe.note}</span>
              </div>
            )}
            <h3 className="font-black uppercase text-xs mb-1">Ingredients Needed:</h3>
            <div className="border-2 border-black p-2 space-y-1 bg-[#F4F0E6] max-h-32 overflow-y-auto">
              {Object.entries(selectedRecipe.ingredients).map(([iId, qty]) => {
                const inv = inventory.find(i => i.id === iId);
                return (
                  <div key={iId} className="flex justify-between font-bold uppercase text-[10px] border-b border-black border-dashed pb-1">
                    <span>{inv?.emoji} {inv?.name || 'Unknown'}</span>
                    <span>x{qty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* New Recipe Creator Modal */}
      {isCreatorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] w-full max-w-lg p-4 relative flex flex-col h-[80vh]">
            <button onClick={() => setIsCreatorOpen(false)} className="absolute top-2 right-2 bg-red-400 border-2 border-black w-8 h-8 flex items-center justify-center font-black"><X size={16} /></button>
            <h2 className="text-xl font-black uppercase mb-3 border-b-4 border-black pb-1">Create Recipe</h2>
            
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              <div className="flex gap-2">
                <div className="w-16">
                  <label className="block font-black uppercase text-[10px] mb-1">Emoji</label>
                  <input type="text" value={newREmoji} onChange={e=>setNewREmoji(e.target.value)} className="w-full border-2 border-black p-1 font-black text-xl text-center focus:bg-[#FFD500] outline-none shadow-[2px_2px_0_0_#000]" />
                </div>
                <div className="flex-1">
                  <label className="block font-black uppercase text-[10px] mb-1">Name</label>
                  <input type="text" placeholder="e.g. Tacos" value={newRName} onChange={e=>setNewRName(e.target.value)} className="w-full border-2 border-black p-1 font-black uppercase text-sm focus:bg-[#FFD500] outline-none shadow-[2px_2px_0_0_#000]" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-black uppercase text-[10px] mb-1">Time</label>
                  <input type="text" placeholder="20 min" value={newRTime} onChange={e=>setNewRTime(e.target.value)} className="w-full border-2 border-black p-1 font-black uppercase text-sm focus:bg-[#FFD500] outline-none shadow-[2px_2px_0_0_#000]" />
                </div>
                <div className="flex-1">
                  <label className="block font-black uppercase text-[10px] mb-1">Temp</label>
                  <input type="text" placeholder="200°C" value={newRTemp} onChange={e=>setNewRTemp(e.target.value)} className="w-full border-2 border-black p-1 font-black uppercase text-sm focus:bg-[#FFD500] outline-none shadow-[2px_2px_0_0_#000]" />
                </div>
              </div>
              <div>
                <label className="block font-black uppercase text-[10px] mb-1">Notes</label>
                <input type="text" placeholder="Secret ingredient..." value={newRNote} onChange={e=>setNewRNote(e.target.value)} className="w-full border-2 border-black p-1 font-black uppercase text-sm focus:bg-[#FFD500] outline-none shadow-[2px_2px_0_0_#000]" />
              </div>

              <div className="border-2 border-black bg-[#F4F0E6] p-2 shadow-[2px_2px_0_0_#000]">
                <h3 className="font-black uppercase text-xs mb-2">Build Ingredients</h3>
                <div className="mb-2 space-y-1 max-h-24 overflow-y-auto">
                  {Object.entries(newRIngredients).map(([iId, qty]) => {
                    const inv = inventory.find(i => i.id === iId);
                    return (
                      <div key={iId} className="flex justify-between items-center bg-white border border-black p-1 font-bold uppercase text-[10px]">
                        <span>{inv?.emoji} {inv?.name}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => removeIngredientQty(iId)} className="w-4 h-4 bg-red-400 border border-black flex items-center justify-center">-</button>
                          <span>{qty}</span>
                          <button onClick={() => toggleIngredient(iId)} className="w-4 h-4 bg-[#4ADE80] border border-black flex items-center justify-center">+</button>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(newRIngredients).length === 0 && <p className="text-[10px] font-bold uppercase opacity-50">No ingredients selected.</p>}
                </div>
                
                {/* Available Stash Picker */}
                <div className="border-t-2 border-black pt-2 max-h-32 overflow-y-auto grid grid-cols-2 gap-1">
                  {inventory.map(inv => (
                    <button key={inv.id} onClick={() => toggleIngredient(inv.id)} className="border border-black bg-white p-1 hover:bg-[#FFD500] text-[10px] font-black uppercase flex items-center gap-1 text-left truncate">
                       <span>{inv.emoji}</span> <span className="truncate">{inv.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 border-t-4 border-black pt-2">
              <button onClick={saveRecipe} className="w-full bg-[#FF90E8] border-2 border-black py-2 font-black text-sm shadow-[2px_2px_0_0_#000] hover:bg-black hover:text-white uppercase active:translate-x-0.5 active:translate-y-0.5">
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryView({ inventory, updateInventory }) {
  const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Carbs", "Drinks", "Pantry"];
  const [collapsed, setCollapsed] = useState({});

  const toggleCategory = (cat) => {
    setCollapsed(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className="space-y-4 pb-12">
      {categories.map(category => {
        const items = inventory.filter(i => i.category === category);
        if (items.length === 0) return null;
        
        const isCollapsed = collapsed[category];

        return (
          <div key={category} className="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] overflow-hidden">
            <div 
              className="bg-[#FF90E8] border-b-4 border-black p-2 flex justify-between items-center cursor-pointer hover:bg-[#FFD500] transition-colors"
              onClick={() => toggleCategory(category)}
            >
              <h3 className="text-lg font-black uppercase flex items-center gap-2">
                <span className="bg-black text-white px-2 py-0.5 text-xs">{items.length}</span> {category}
              </h3>
              {isCollapsed ? <ChevronRight size={20} strokeWidth={3} /> : <ChevronDown size={20} strokeWidth={3} />}
            </div>
            
            {!isCollapsed && (
              <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 bg-[#F4F0E6]">
                {items.map(item => (
                  <div key={item.id} className="border-2 border-black bg-white flex flex-col items-center justify-between p-2 shadow-[2px_2px_0_0_#000] relative">
                    <span className="text-3xl mb-1">{item.emoji}</span>
                    <span className="font-black uppercase text-center text-[9px] truncate w-full" title={item.name}>{item.name}</span>
                    
                    <div className="flex items-center w-full justify-between mt-2 border-t border-dashed border-gray-400 pt-1">
                      <button onClick={() => updateInventory(item.id, -1)} className="w-5 h-5 bg-[#FF8A8A] border border-black flex items-center justify-center font-black text-xs active:bg-black active:text-white">-</button>
                      <span className="font-bold text-[10px]">{item.count}</span>
                      <button onClick={() => updateInventory(item.id, 1)} className="w-5 h-5 bg-[#4ADE80] border border-black flex items-center justify-center font-black text-xs active:bg-black active:text-white">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ShoppingView({ mealPlan, inventory, recipes, updateInventory, showToast }) {
  const shoppingList = useMemo(() => {
    const required = {};
    Object.values(mealPlan).forEach(day => {
      [day.breakfast, day.lunch, day.dinner].forEach(recipeId => {
        if (recipeId) {
          const recipe = recipes.find(r => r.id === recipeId);
          if (recipe && recipe.ingredients) {
            Object.entries(recipe.ingredients).forEach(([itemId, qty]) => { required[itemId] = (required[itemId] || 0) + qty; });
          }
        }
      });
      [day.breakfastDrink, day.lunchDrink, day.dinnerDrink].forEach(drinkId => {
          if (drinkId) required[drinkId] = (required[drinkId] || 0) + 1;
      });
    });

    const missing = [];
    Object.entries(required).forEach(([itemId, reqQty]) => {
      const invItem = inventory.find(i => i.id === itemId);
      const currentCount = invItem ? invItem.count : 0;
      if (currentCount < reqQty) {
        // Fallback for unknown items in case recipe references old id
        const itemInfo = invItem || { id: itemId, emoji: "❓", name: "Unknown Item" };
        missing.push({ item: itemInfo, needed: reqQty - currentCount, totalRequired: reqQty, inStock: currentCount });
      }
    });
    return missing;
  }, [mealPlan, inventory, recipes]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#FF8A8A] border-4 border-black p-4 shadow-[4px_4px_0_0_#000] mb-6 flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-black uppercase">Shopping List</h2>
        {shoppingList.length > 0 && (
          <button onClick={() => { navigator.clipboard.writeText(shoppingList.map(s => `[] ${s.item.emoji} ${s.item.name} (x${s.needed})`).join('\n')); showToast("Copied to clipboard!"); }} className="bg-white border-2 border-black px-2 py-1 text-xs font-black uppercase shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5"><Copy size={14} className="inline mr-1"/> Copy</button>
        )}
      </div>

      {shoppingList.length === 0 ? (
        <div className="border-4 border-black bg-[#4ADE80] p-8 text-center shadow-[4px_4px_0_0_#000]">
          <span className="text-4xl mb-2 block">🎉</span>
          <h3 className="text-2xl font-black uppercase">Fully Stocked!</h3>
        </div>
      ) : (
        <div className="space-y-2">
          {shoppingList.map((miss, idx) => (
            <div key={idx} className="border-2 border-black bg-white flex items-center justify-between p-2 shadow-[2px_2px_0_0_#000]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{miss.item.emoji}</span>
                <div>
                  <h3 className="text-sm font-black uppercase">{miss.item.name}</h3>
                  <p className="text-[9px] font-black uppercase opacity-60">Req: {miss.totalRequired} | Bag: {miss.inStock}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#FFD500] text-black px-2 py-1 border-2 border-black text-xs font-black">Buy {miss.needed}</span>
                <button onClick={() => {updateInventory(miss.item.id, miss.needed); showToast("Bought!");}} className="w-8 h-8 border-2 border-black bg-[#4ADE80] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5"><CheckSquare size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}