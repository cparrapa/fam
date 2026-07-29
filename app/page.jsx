"use client";

import React, { useState, useEffect } from "react";
import { Plus, Minus, Calendar as CalendarIcon, CheckSquare, Utensils, ShoppingCart, Box, Copy, ChevronDown, ChevronRight, X, Sparkles } from "lucide-react";

// --- INITIAL DATA (Used only on first load) ---
const INITIAL_INVENTORY = [
  // Vegetables
  { id: "i1", name: "Tomato", emoji: "🍅", count: 2, category: "Vegetables" },
  { id: "i3", name: "Avocado", emoji: "🥑", count: 4, category: "Vegetables" },
  { id: "i39", name: "Cucumber", emoji: "🥒", count: 0, category: "Vegetables" },
  { id: "i40", name: "Pumpkin", emoji: "🎃", count: 0, category: "Vegetables" },
  { id: "i20", name: "Carrots", emoji: "🥕", count: 0, category: "Vegetables" },
  { id: "i21", name: "Potatoes", emoji: "🥔", count: 5, category: "Vegetables" },
  { id: "i22", name: "Corn", emoji: "🌽", count: 0, category: "Vegetables" },
  { id: "i23", name: "Broccoli", emoji: "🥦", count: 0, category: "Vegetables" },
  { id: "i26", name: "Pepper", emoji: "🌶️", count: 0, category: "Vegetables" },
  { id: "i18", name: "Onions", emoji: "🧅", count: 3, category: "Vegetables" },
  { id: "i30", name: "Garlic", emoji: "🧄", count: 2, category: "Vegetables" },
  { id: "i31", name: "Eggplant", emoji: "🍆", count: 0, category: "Vegetables" },
  { id: "i38", name: "Cherry Tomatoes", emoji: "🍅", count: 0, category: "Vegetables" },
  // Fruits
  { id: "i35", name: "Banana", emoji: "🍌", count: 3, category: "Fruits" },
  { id: "i36", name: "Apple", emoji: "🍎", count: 4, category: "Fruits" },
  { id: "i17", name: "Lemons", emoji: "🍋", count: 2, category: "Fruits" },
  // Dairy & Eggs
  { id: "i2", name: "Cheese", emoji: "🧀", count: 2, category: "Dairy & Eggs" },
  { id: "i41", name: "Parmesan", emoji: "🧀", count: 1, category: "Dairy & Eggs" },
  { id: "i12", name: "Butter", emoji: "🧈", count: 1, category: "Dairy & Eggs" },
  { id: "i13", name: "Eggs", emoji: "🥚", count: 12, category: "Dairy & Eggs" },
  { id: "i15", name: "Yogurt", emoji: "🥛", count: 0, category: "Dairy & Eggs" },
  // Meat & Seafood
  { id: "i4", name: "Chicken", emoji: "🍗", count: 5, category: "Meat & Seafood" },
  { id: "i9", name: "Fish", emoji: "🐟", count: 2, category: "Meat & Seafood" },
  { id: "i10", name: "Ham", emoji: "🍖", count: 0, category: "Meat & Seafood" },
  { id: "i14", name: "Bacon", emoji: "🥓", count: 0, category: "Meat & Seafood" },
  { id: "i32", name: "Meat Balls", emoji: "🧆", count: 0, category: "Meat & Seafood" },
  { id: "i33", name: "Sausages", emoji: "🌭", count: 4, category: "Meat & Seafood" },
  // Carbs
  { id: "i5", name: "Tortilla", emoji: "🌮", count: 10, category: "Carbs" },
  { id: "i24", name: "Pasta", emoji: "🍝", count: 2, category: "Carbs" },
  { id: "i25", name: "Rice", emoji: "🍚", count: 1, category: "Carbs" },
  { id: "i37", name: "Bread", emoji: "🍞", count: 1, category: "Carbs" },
  { id: "i16", name: "Cereal", emoji: "🥣", count: 0, category: "Carbs" },
  { id: "i19", name: "Oatmeal", emoji: "🥣", count: 1, category: "Carbs" },
  // Drinks
  { id: "i8", name: "Beer", emoji: "🍺", count: 6, category: "Drinks" },
  { id: "d1", name: "Water", emoji: "💧", count: 10, category: "Drinks" },
  { id: "d2", name: "Coffee", emoji: "☕", count: 5, category: "Drinks" },
  { id: "d3", name: "Tea", emoji: "🍵", count: 5, category: "Drinks" },
  { id: "d4", name: "Milk", emoji: "🥛", count: 2, category: "Drinks" },
  { id: "d5", name: "Juice", emoji: "🧃", count: 1, category: "Drinks" },
  { id: "d6", name: "Wine", emoji: "🍷", count: 1, category: "Drinks" },
  // Pantry
  { id: "i6", name: "Red Salsa", emoji: "🥫", count: 1, category: "Pantry" },
  { id: "i7", name: "Olives", emoji: "🫒", count: 1, category: "Pantry" },
  { id: "i11", name: "Hummus", emoji: "🧆", count: 0, category: "Pantry" },
  { id: "i27", name: "Mayonnaise", emoji: "🥚", count: 0, category: "Pantry" },
  { id: "i28", name: "Tartare", emoji: "🥣", count: 1, category: "Pantry" },
  { id: "i29", name: "Mustard", emoji: "🌭", count: 0, category: "Pantry" },
  { id: "i34", name: "Cilantro", emoji: "🌿", count: 1, category: "Pantry" },
];

const INITIAL_RECIPES = [
  { id: "r1", name: "Spaghetti", emoji: "🍝", time: "20 min", temp: "100°C", note: "Al dente is best", ingredients: { "i24": 1, "i1": 4, "i41": 1 } },
  { id: "r2", name: "Nachos", emoji: "🌮", time: "15 min", temp: "200°C", note: "Don't burn the chips!", ingredients: { "i5": 2, "i2": 2, "i6": 1, "i3": 2 } },
  { id: "r3", name: "Chicken Curry", emoji: "🍗", time: "45 min", temp: "Medium", note: "Add extra spice", ingredients: { "i4": 2, "i25": 1, "i18": 1 } },
  { id: "r4", name: "Tacos", emoji: "🌮", time: "20 min", temp: "Stove", note: "Double layer tortillas", ingredients: { "i5": 4, "i4": 2, "i2": 1, "i6": 1, "i3": 1, "i34": 1 } },
  { id: "r5", name: "Mac & Cheese", emoji: "🧀", time: "25 min", temp: "Stove", note: "Extra creamy", ingredients: { "i24": 1, "i2": 2, "i41": 1, "i12": 1, "d4": 1 } },
  { id: "r6", name: "Avocado Toast", emoji: "🥑", time: "5 min", temp: "Toaster", note: "Squeeze lemon on top", ingredients: { "i37": 2, "i3": 1, "i13": 2, "i17": 1 } },
  { id: "r7", name: "Fish & Chips", emoji: "🐟", time: "30 min", temp: "220°C", note: "Serve with extra tartare", ingredients: { "i9": 2, "i21": 4, "i17": 1, "i28": 1 } },
  { id: "r8", name: "Sausage & Mash", emoji: "🌭", time: "35 min", temp: "Stove", note: "Lots of butter in mash", ingredients: { "i33": 4, "i21": 5, "i18": 2, "i12": 1 } },
  { id: "r9", name: "Baked Eggplant", emoji: "🍆", time: "45 min", temp: "180°C", note: "Layer like lasagna", ingredients: { "i31": 2, "i1": 3, "i2": 2, "i41": 1, "i30": 1 } },
  { id: "r10", name: "Oatmeal Bowl", emoji: "🥣", time: "10 min", temp: "Warm", note: "Top with fresh fruit", ingredients: { "i19": 1, "d4": 1, "i35": 1, "i36": 1 } },
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
  const [events, setEvents] = useState(INITIAL_EVENTS);
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'calendar' && <CalendarView events={events} setEvents={setEvents} showToast={showToast} />}
        {activeTab === 'tasks' && <MatrixView tasks={tasks} setTasks={setTasks} showToast={showToast} />}
        {activeTab === 'planner' && <PlannerView mealPlan={mealPlan} setMealPlan={setMealPlan} recipes={recipes} setRecipes={setRecipes} inventory={inventory} setInventory={setInventory} showToast={showToast} />}
        {activeTab === 'inventory' && <InventoryView inventory={inventory} updateInventory={updateInventory} showToast={showToast} />}
        {activeTab === 'shopping' && <ShoppingView mealPlan={mealPlan} inventory={inventory} recipes={recipes} updateInventory={updateInventory} showToast={showToast} />}
      </main>
    </div>
  );
}

function CalendarView({ events, setEvents, showToast }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026 default
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  
  // Event form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [formTitle, setFormTitle] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date(); 
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDateStr(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
  };

  const getDayStr = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const displayedEvents = selectedDateStr 
    ? events.filter(e => e.date === selectedDateStr)
    : events.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));

  const openModal = (evt = null) => {
    if (evt) {
      setEditEventId(evt.id);
      setFormTitle(evt.title);
    } else {
      setEditEventId(null);
      setFormTitle("");
    }
    setIsModalOpen(true);
  };

  const saveEvent = () => {
    if (!formTitle.trim() || !selectedDateStr) return;
    if (editEventId) {
      setEvents(events.map(e => e.id === editEventId ? { ...e, title: formTitle } : e));
      showToast("Event updated!");
    } else {
      setEvents([...events, { id: "evt" + Date.now(), date: selectedDateStr, title: formTitle }]);
      showToast("Event added!");
    }
    setIsModalOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    showToast("Event deleted!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Calendar Grid */}
      <div className="lg:col-span-2 border-4 border-black bg-white shadow-[8px_8px_0_0_#000] p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b-4 border-black pb-4 mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handlePrevMonth} className="border-4 border-black bg-[#F4F0E6] px-3 py-1 font-black text-xl shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#FFD500]">&lt;</button>
            <h2 className="text-2xl md:text-4xl font-black uppercase w-48 text-center">{monthNames[month]} {year}</h2>
            <button onClick={handleNextMonth} className="border-4 border-black bg-[#F4F0E6] px-3 py-1 font-black text-xl shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#FFD500]">&gt;</button>
          </div>
          <button onClick={handleToday} className="border-4 border-black bg-[#4ADE80] px-4 py-2 font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-black hover:text-white">Today</button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center font-black uppercase text-xs md:text-sm mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="bg-black text-white py-1">{d}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {Array.from({ length: startDay }).map((_, i) => <div key={`blank-${i}`} className="h-16 md:h-24 bg-gray-200 border-4 border-black opacity-30"></div>)}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const d = i + 1;
            const dateStr = getDayStr(d);
            const hasEvent = events.some(e => e.date === dateStr);
            const isSelected = selectedDateStr === dateStr;
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            return (
              <div 
                key={d}
                onClick={() => setSelectedDateStr(isSelected ? null : dateStr)}
                className={`h-16 md:h-24 border-4 border-black p-1 md:p-2 flex flex-col justify-between cursor-pointer transition-all hover:bg-[#FFD500] 
                  ${isSelected ? 'bg-[#FF90E8] shadow-[inset_4px_4px_0_0_#000]' : 'bg-[#F4F0E6]'}
                  ${isToday && !isSelected ? 'ring-4 ring-inset ring-[#FFD500]' : ''}
                `}
              >
                <span className="font-black text-sm md:text-lg">{d}</span>
                {hasEvent && <div className="h-2 md:h-3 w-full bg-black mt-1"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events Feed Sidebar */}
      <div className="border-4 border-black bg-[#FFD500] shadow-[8px_8px_0_0_#000] flex flex-col h-[600px]">
        <div className="p-4 border-b-4 border-black bg-white">
          <h2 className="text-2xl font-black uppercase">{selectedDateStr ? `Events for ${selectedDateStr}` : 'Month Overview'}</h2>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {displayedEvents.length === 0 ? (
            <div className="p-4 border-4 border-black bg-white font-bold text-center uppercase">No events found.</div>
          ) : (
            displayedEvents.map(evt => (
              <div key={evt.id} className="border-4 border-black bg-white p-3 shadow-[4px_4px_0_0_#000] relative group">
                {!selectedDateStr && (
                  <div className="absolute -top-3 -left-3 bg-black text-white font-black text-[10px] px-2 py-1 uppercase border-2 border-black">
                    {evt.date}
                  </div>
                )}
                <h3 className="text-lg font-black mt-1">{evt.title}</h3>
                <div className="mt-2 flex gap-2">
                   <button onClick={() => openModal(evt)} className="text-[10px] bg-[#FFD500] border-2 border-black font-black px-2 py-1 uppercase hover:bg-black hover:text-white">Edit</button>
                   <button onClick={() => deleteEvent(evt.id)} className="text-[10px] bg-[#FF8A8A] border-2 border-black font-black px-2 py-1 uppercase hover:bg-black hover:text-white">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-white border-t-4 border-black">
          <button 
            disabled={!selectedDateStr}
            onClick={() => openModal()}
            className={`w-full border-4 border-black py-3 font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-colors
              ${selectedDateStr ? 'bg-[#4ADE80] hover:bg-black hover:text-white cursor-pointer' : 'bg-gray-300 cursor-not-allowed opacity-50'}`}
          >
            {selectedDateStr ? "+ Add Event to Day" : "Select Day to Add"}
          </button>
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-sm p-6 relative transform -rotate-1">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 bg-red-400 border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-black uppercase mb-6">{editEventId ? 'Edit Event' : 'New Event'}</h2>
            <div className="mb-6">
              <label className="block font-black uppercase text-sm mb-2">Event Title / Emoji</label>
              <input 
                type="text" 
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                autoFocus
                placeholder="🎂 Birthday Party"
                className="w-full border-4 border-black p-3 font-black text-lg focus:outline-none focus:bg-[#FFD500] shadow-[4px_4px_0_0_#000]" 
              />
            </div>
            <button onClick={saveEvent} className="w-full bg-[#4ADE80] border-4 border-black py-3 font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white uppercase">
              Save Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatrixView({ tasks, setTasks, showToast }) {
  const [newTaskInput, setNewTaskInput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const quadrants = [
    { id: "do", title: "Do First", bg: "bg-[#FF8A8A]", desc: "Urgent & Important" },
    { id: "schedule", title: "Schedule", bg: "bg-[#93C5FD]", desc: "Not Urgent, Important" },
    { id: "delegate", title: "Delegate", bg: "bg-[#FDE047]", desc: "Urgent, Not Important" },
    { id: "eliminate", title: "Don't Do", bg: "bg-[#E5E7EB]", desc: "Not Urgent, Not Important" },
  ];

  const handleAddTask = () => {
    if(newTaskInput.trim()) {
      setTasks([...tasks, { id: "t" + Date.now(), text: newTaskInput, quadrant: "do", completed: false }]);
      setNewTaskInput("");
      showToast("Task added to DO First!");
    }
  };

  const handleMagicSort = async () => {
    if (!newTaskInput.trim()) {
        showToast("Type some messy tasks first!");
        return;
    }
    
    setIsAiLoading(true);
    try {
        const prompt = `
        Act as a productivity expert using the Eisenhower Matrix.
        I am going to give you a brain dump of tasks. I want you to separate them into distinct tasks and categorize them into one of these four quadrants: "do", "schedule", "delegate", or "eliminate".
        Tasks: "${newTaskInput}"
        
        Respond ONLY with a valid JSON array using this schema:
        [
          { "text": "Task description (short)", "quadrant": "do|schedule|delegate|eliminate" }
        ]
        `;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            }
        };

        const jsonString = await callGeminiAPI(payload);
        const newTasks = JSON.parse(jsonString);
        
        if (Array.isArray(newTasks)) {
            const mappedTasks = newTasks.map(t => ({
                id: "t_ai_" + Math.random().toString(36).substr(2, 9),
                text: t.text,
                quadrant: t.quadrant || 'do',
                completed: false
            }));
            
            setTasks([...tasks, ...mappedTasks]);
            setNewTaskInput("");
            showToast(`Magic Sort complete! Added ${mappedTasks.length} tasks.`);
        }
    } catch (error) {
        console.error(error);
        showToast("Magic sort failed. Try again.");
    } finally {
        setIsAiLoading(false);
    }
  };

  // Drag and drop mechanics
  const onDragStart = (e, taskId) => e.dataTransfer.setData("taskId", taskId);
  const onDrop = (e, quadId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if(taskId) setTasks(tasks.map(t => t.id === taskId ? { ...t, quadrant: quadId } : t));
  };

  // Mobile Tap-to-move mechanics
  const [selectedMobileTask, setSelectedMobileTask] = useState(null);
  const handleMobileQuadTap = (quadId) => {
      if(selectedMobileTask) {
          setTasks(tasks.map(t => t.id === selectedMobileTask ? { ...t, quadrant: quadId } : t));
          setSelectedMobileTask(null);
          showToast("Task moved!");
      }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 border-4 border-black bg-white p-4 shadow-[8px_8px_0_0_#000]">
         <label className="block font-black uppercase mb-2">Brain Dump / Add Task</label>
         <textarea 
           placeholder="Type a single task OR dump a messy paragraph of things you need to do..." 
           value={newTaskInput}
           onChange={e => setNewTaskInput(e.target.value)}
           className="w-full border-4 border-black p-3 font-bold text-lg focus:outline-none focus:bg-[#FFD500] shadow-[inset_4px_4px_0_0_#000] min-h-[100px] resize-y mb-4" 
         />
         <div className="flex flex-col sm:flex-row gap-4">
             <button onClick={handleAddTask} className="flex-1 border-4 border-black bg-white py-3 font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-black hover:text-white transition-colors">
                 + Add Normal
             </button>
             <button onClick={handleMagicSort} disabled={isAiLoading} className="flex-1 border-4 border-black bg-[#FF90E8] py-3 font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-black hover:text-[#FF90E8] transition-colors flex justify-center items-center gap-2">
                 {isAiLoading ? <span className="animate-spin">🌀</span> : <Wand2 size={20} />} 
                 {isAiLoading ? "Thinking..." : "✨ Magic Sort"}
             </button>
         </div>
      </div>
      
      {selectedMobileTask && (
          <div className="bg-black text-[#FFD500] p-3 font-black uppercase text-center border-4 border-black mb-4 animate-pulse md:hidden">
              Tap a quadrant to drop task!
          </div>
      )}

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {quadrants.map(q => (
          <div 
            key={q.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, q.id)}
            onClick={() => handleMobileQuadTap(q.id)}
            className={`border-4 border-black ${q.bg} p-4 shadow-[8px_8px_0_0_#000] flex flex-col min-h-[250px] ${selectedMobileTask ? 'cursor-pointer hover:opacity-80 ring-4 ring-black ring-inset' : ''}`}
          >
            <div className="border-b-4 border-black pb-2 mb-4">
              <h2 className="text-2xl font-black uppercase">{q.title}</h2>
              <p className="text-xs font-bold opacity-80 uppercase">{q.desc}</p>
            </div>
            
            <div className="flex-1 flex flex-wrap gap-3 content-start">
              {tasks.filter(t => t.quadrant === q.id).map(task => (
                <div 
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  onClick={(e) => { e.stopPropagation(); setSelectedMobileTask(task.id === selectedMobileTask ? null : task.id); }}
                  className={`relative group border-4 border-black p-3 shadow-[4px_4px_0_0_#000] cursor-grab active:cursor-grabbing w-full sm:w-[200px] flex items-start gap-3 transition-transform
                    ${task.completed ? 'bg-gray-300 opacity-60 scale-95' : 'bg-[#FFD500] hover:-translate-y-1 hover:-rotate-1'}
                    ${selectedMobileTask === task.id ? 'ring-4 ring-black ring-offset-2 scale-105 z-10' : ''}
                  `}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); setTasks(tasks.filter(x => x.id !== task.id)); showToast("Deleted"); }}
                    className="absolute -top-3 -right-3 bg-[#FF8A8A] border-4 border-black w-8 h-8 items-center justify-center font-black text-sm hidden group-hover:flex hover:bg-black hover:text-white z-10"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div 
                    onClick={(e) => { e.stopPropagation(); setTasks(tasks.map(x => x.id === task.id ? {...x, completed: !x.completed} : x)); }}
                    className="w-6 h-6 border-4 border-black bg-white flex-shrink-0 cursor-pointer flex items-center justify-center mt-0.5 hover:bg-black transition-colors"
                  >
                    {task.completed && <div className="w-3 h-3 bg-black"></div>}
                  </div>
                  <p className={`font-bold text-sm leading-tight break-words ${task.completed ? 'line-through opacity-70' : ''}`}>
                    {task.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerView({ mealPlan, setMealPlan, recipes, setRecipes, inventory, setInventory, showToast }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedRecipeForDetails, setSelectedRecipeForDetails] = useState(null);
  
  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isManualCreatorOpen, setIsManualCreatorOpen] = useState(false);

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Manual Recipe State
  const [newRName, setNewRName] = useState("");
  const [newREmoji, setNewREmoji] = useState("🍽");
  const [newRTime, setNewRTime] = useState("");
  const [newRTemp, setNewRTemp] = useState("");
  const [newRNote, setNewRNote] = useState("");
  const [newRIngredients, setNewRIngredients] = useState({});

  // Drag Drop & Drinks
  const [selectedMobileRecipe, setSelectedMobileRecipe] = useState(null);
  const drinksList = useMemo(() => inventory.filter(i => i.category === "Drinks"), [inventory]);

  const assignMeal = (day, meal, recipeId) => {
    setMealPlan(prev => ({ ...prev, [day]: { ...prev[day], [meal]: recipeId } }));
  };

  const assignDrink = (day, mealDrinkField, drinkId) => {
    setMealPlan(prev => ({ ...prev, [day]: { ...prev[day], [mealDrinkField]: drinkId } }));
  };

  const onDragStart = (e, recipeId) => e.dataTransfer.setData("recipeId", recipeId);
  const onDrop = (e, day, mealType) => {
    e.preventDefault();
    const recipeId = e.dataTransfer.getData("recipeId");
    if(recipeId) {
        assignMeal(day, mealType, recipeId);
        showToast(`Assigned to ${day}!`);
    }
  };

  const handleSlotClick = (day, mealType) => {
      if(selectedMobileRecipe) {
          assignMeal(day, mealType, selectedMobileRecipe);
          setSelectedMobileRecipe(null);
          showToast(`Assigned to ${day}!`);
      }
  };

  // --- MANUAL RECIPE BUILDER LOGIC ---
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

  const saveManualRecipe = () => {
    if (!newRName.trim()) {
      showToast("Need a recipe name!");
      return;
    }
    setRecipes([...recipes, {
      id: "r_man_" + Date.now(),
      name: newRName,
      emoji: newREmoji,
      ingredients: newRIngredients,
      time: newRTime || "N/A",
      temp: newRTemp || "N/A",
      note: newRNote || ""
    }]);
    setIsManualCreatorOpen(false);
    setNewRName(""); setNewREmoji("🍽"); setNewRTime(""); setNewRTemp(""); setNewRNote(""); setNewRIngredients({});
    showToast(`Created ${newRName}!`);
  };

  // --- AI CHEF LOGIC ---
  const handleMagicRecipe = async () => {
      if(!aiPrompt.trim()) return;
      setIsAiLoading(true);

      try {
        const inventoryContext = inventory.map(i => `{"id": "${i.id}", "name": "${i.name}"}`).join(", ");
        
        const prompt = `
        Act as a creative family chef. Create a recipe based on this request: "${aiPrompt}".
        You have access to this inventory: [${inventoryContext}]. Try to use these ingredient IDs if they fit.
        If you need an ingredient NOT in the inventory, create a new item for it with an id starting with "new_" (e.g. "new_beans").
        
        Respond ONLY with a valid JSON object matching this exact schema:
        {
          "name": "Recipe Name (short)",
          "emoji": "Single emoji representing the dish",
          "time": "e.g., 30 min",
          "temp": "e.g., 200°C or Stove",
          "note": "Short tip for cooking",
          "ingredients": [
            { "id": "existing id or new_id", "name": "Ingredient Name", "qty": Integer quantity needed }
          ]
        }
        `;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        };

        const jsonString = await callGeminiAPI(payload);
        const generatedRecipe = JSON.parse(jsonString);

        const newRecipeId = "r_ai_" + Date.now();
        const finalIngredientsMap = {};
        const newInventoryItems = [];

        generatedRecipe.ingredients.forEach(ing => {
            let finalId = ing.id;
            if (finalId.startsWith("new_") || !inventory.find(inv => inv.id === finalId)) {
                finalId = "i_ai_" + Math.random().toString(36).substr(2, 9);
                newInventoryItems.push({
                    id: finalId,
                    name: ing.name,
                    emoji: "📦", 
                    count: 0,
                    category: "Pantry"
                });
            }
            finalIngredientsMap[finalId] = ing.qty;
        });

        if (newInventoryItems.length > 0) {
            setInventory(prev => [...prev, ...newInventoryItems]);
        }

        const fullRecipe = {
            id: newRecipeId,
            name: generatedRecipe.name,
            emoji: generatedRecipe.emoji,
            time: generatedRecipe.time,
            temp: generatedRecipe.temp,
            note: generatedRecipe.note,
            ingredients: finalIngredientsMap
        };

        setRecipes([...recipes, fullRecipe]);
        setIsAiModalOpen(false);
        setAiPrompt("");
        showToast(`Created ✨ ${fullRecipe.name}!`);

      } catch(error) {
          console.error(error);
          showToast("AI Chef burned the meal. Try again!");
      } finally {
          setIsAiLoading(false);
      }
  };

  const MealSlot = ({ day, title, icon, mealType, drinkField, bgClass }) => (
    <div 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => onDrop(e, day, mealType)} 
        onClick={() => handleSlotClick(day, mealType)}
        className={`flex-1 border-b-4 border-black p-2 ${bgClass} bg-opacity-40 flex flex-col group ${selectedMobileRecipe ? 'hover:bg-opacity-100 cursor-pointer' : ''}`}
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-black uppercase">{icon} {title}</span>
        {/* Drink Selector */}
        <select 
          value={mealPlan[day][drinkField] || ""}
          onChange={(e) => { e.stopPropagation(); assignDrink(day, drinkField, e.target.value); }}
          className="text-[10px] font-black uppercase bg-white border-2 border-black outline-none px-1 py-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="">Drink?</option>
          {drinksList.map(d => <option key={d.id} value={d.id}>{d.emoji} {d.name}</option>)}
        </select>
      </div>

      {mealPlan[day][mealType] ? (
        <div className="bg-white border-4 border-black p-2 shadow-[4px_4px_0_0_#000] relative cursor-pointer hover:scale-105 transition-transform mt-1" onClick={(e) => { e.stopPropagation(); setSelectedRecipeForDetails(recipes.find(r=>r.id === mealPlan[day][mealType])); }}>
           <button onClick={(e) => { e.stopPropagation(); assignMeal(day, mealType, null); }} className="absolute -top-3 -right-3 bg-[#FF8A8A] border-4 border-black text-black w-8 h-8 flex items-center justify-center font-black text-sm hidden group-hover:flex hover:bg-black hover:text-white z-10"><X size={16}/></button>
           <span className="text-3xl block text-center mb-1">{recipes.find(r=>r.id === mealPlan[day][mealType])?.emoji}</span>
           <span className="font-bold text-xs uppercase block text-center truncate">{recipes.find(r=>r.id === mealPlan[day][mealType])?.name}</span>
        </div>
      ) : (
        <div className="flex-1 border-4 border-dashed border-black opacity-30 flex items-center justify-center text-[10px] font-black uppercase text-center p-2 mt-1">Drop Recipe</div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Recipe Library Sidebar */}
      <div className="w-full xl:w-1/4 border-4 border-black bg-white shadow-[8px_8px_0_0_#000] flex flex-col h-[85vh]">
        <div className="bg-[#A7F3D0] p-4 border-b-4 border-black flex flex-col gap-3">
          <h2 className="text-2xl font-black uppercase text-center">Recipes</h2>
          <div className="flex flex-col gap-2">
            <button onClick={() => setIsAiModalOpen(true)} className="w-full bg-[#FF90E8] text-black border-4 border-black font-black px-3 py-2 hover:bg-black hover:text-[#FF90E8] uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 transition-all">
              <Wand2 size={18}/> ✨ AI Chef
            </button>
            <button onClick={() => setIsManualCreatorOpen(true)} className="w-full bg-white text-black border-4 border-black font-black px-3 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 transition-all">
              <BookOpen size={18}/> + Manual
            </button>
          </div>
        </div>
        
        {selectedMobileRecipe && (
             <div className="bg-black text-[#4ADE80] p-2 text-center font-black uppercase text-xs animate-pulse">
                 Tap a Day slot to drop recipe!
             </div>
        )}

        <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-[#F4F0E6]">
          {recipes.map(recipe => (
            <div 
              key={recipe.id}
              draggable
              onDragStart={(e) => onDragStart(e, recipe.id)}
              onClick={() => setSelectedMobileRecipe(recipe.id === selectedMobileRecipe ? null : recipe.id)}
              className={`border-4 border-black bg-white p-3 flex flex-col gap-2 cursor-grab active:cursor-grabbing hover:bg-[#FFD500] transition-transform group
                ${selectedMobileRecipe === recipe.id ? 'ring-4 ring-black ring-offset-2 scale-105 z-10 bg-[#FFD500]' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{recipe.emoji}</span>
                  <span className="font-black uppercase text-lg leading-tight">{recipe.name}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setSelectedRecipeForDetails(recipe); }} className="border-4 border-black bg-white font-black text-xs uppercase px-2 py-1 shadow-[2px_2px_0_0_#000] hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none hidden sm:block">View</button>
              </div>
              <div className="text-xs font-bold uppercase border-t-2 border-black border-dashed pt-2 mt-1 opacity-60 flex justify-between">
                <span>Drag or Tap &rarr;</span>
                <span className="sm:hidden block underline" onClick={(e) => { e.stopPropagation(); setSelectedRecipeForDetails(recipe); }}>Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Weekly Board */}
      <div className="w-full xl:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {days.map(day => (
          <div key={day} className="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] flex flex-col">
            <h3 className="bg-black text-white text-center font-black uppercase py-2 text-lg border-b-4 border-black">{day}</h3>
            
            <MealSlot day={day} title="Breakfast" icon="🌅" mealType="breakfast" drinkField="breakfastDrink" bgClass="bg-[#FDE047]" />
            <MealSlot day={day} title="Lunch" icon="☀" mealType="lunch" drinkField="lunchDrink" bgClass="bg-[#FFD500]" />
            <MealSlot day={day} title="Dinner" icon="🌙" mealType="dinner" drinkField="dinnerDrink" bgClass="bg-[#93C5FD]" />
            
          </div>
        ))}
      </div>

      {/* AI Recipe Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-lg p-6 relative">
            <button onClick={() => !isAiLoading && setIsAiModalOpen(false)} className="absolute top-4 right-4 bg-[#FF8A8A] border-4 border-black w-10 h-10 flex items-center justify-center font-black hover:bg-black hover:text-white"><X size={20}/></button>
            <div className="flex items-center gap-3 mb-6 border-b-4 border-black pb-4">
                <Wand2 size={32} className="text-[#FF90E8]" />
                <h2 className="text-3xl font-black uppercase">Magic Chef</h2>
            </div>
            
            <label className="block font-black uppercase text-sm mb-2">What do you want to eat?</label>
            <textarea 
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="E.g. A quick vegan pasta, or something spicy using the chicken we have..."
                className="w-full border-4 border-black p-3 font-bold mb-6 focus:bg-[#FFD500] outline-none min-h-[120px] shadow-[inset_4px_4px_0_0_#000]"
                disabled={isAiLoading}
            />
            <button 
                onClick={handleMagicRecipe}
                disabled={isAiLoading}
                className="w-full bg-[#FF90E8] border-4 border-black py-4 font-black text-xl uppercase shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-[#FF90E8] transition-colors flex items-center justify-center gap-2"
            >
                {isAiLoading ? <span className="animate-spin">🌀</span> : <Wand2 size={24} />}
                {isAiLoading ? "Cooking..." : "Generate Recipe"}
            </button>
          </div>
        </div>
      )}

      {/* Manual Recipe Creator Modal */}
      {isManualCreatorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-2xl p-6 relative h-[90vh] flex flex-col">
            <button onClick={() => setIsManualCreatorOpen(false)} className="absolute top-4 right-4 bg-[#FF8A8A] border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white"><X size={20}/></button>
            <h2 className="text-3xl font-black uppercase mb-4 border-b-4 border-black pb-2">Create Manual Recipe</h2>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <div className="flex gap-4">
                <div className="w-1/4">
                  <label className="block font-black uppercase text-xs mb-1">Emoji</label>
                  <input type="text" value={newREmoji} onChange={e=>setNewREmoji(e.target.value)} className="w-full border-4 border-black p-2 font-black text-2xl text-center focus:bg-[#FFD500] outline-none shadow-[4px_4px_0_0_#000]" />
                </div>
                <div className="flex-1">
                  <label className="block font-black uppercase text-xs mb-1">Name</label>
                  <input type="text" placeholder="e.g. Tacos" value={newRName} onChange={e=>setNewRName(e.target.value)} className="w-full border-4 border-black p-2 font-black uppercase focus:bg-[#FFD500] outline-none shadow-[4px_4px_0_0_#000]" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-black uppercase text-xs mb-1">Time (Optional)</label>
                  <input type="text" placeholder="20 min" value={newRTime} onChange={e=>setNewRTime(e.target.value)} className="w-full border-4 border-black p-2 font-black uppercase focus:bg-[#FFD500] outline-none shadow-[4px_4px_0_0_#000]" />
                </div>
                <div className="flex-1">
                  <label className="block font-black uppercase text-xs mb-1">Temp (Optional)</label>
                  <input type="text" placeholder="200°C" value={newRTemp} onChange={e=>setNewRTemp(e.target.value)} className="w-full border-4 border-black p-2 font-black uppercase focus:bg-[#FFD500] outline-none shadow-[4px_4px_0_0_#000]" />
                </div>
              </div>
              <div>
                <label className="block font-black uppercase text-xs mb-1">Notes</label>
                <input type="text" placeholder="Secret ingredient..." value={newRNote} onChange={e=>setNewRNote(e.target.value)} className="w-full border-4 border-black p-2 font-black uppercase focus:bg-[#FFD500] outline-none shadow-[4px_4px_0_0_#000]" />
              </div>

              <div className="border-4 border-black bg-[#F4F0E6] p-4 shadow-[4px_4px_0_0_#000]">
                <h3 className="font-black uppercase mb-2">Build Ingredients</h3>
                {/* Selected Ingredients List */}
                <div className="mb-4 space-y-2">
                  {Object.entries(newRIngredients).map(([iId, qty]) => {
                    const inv = inventory.find(i => i.id === iId);
                    return (
                      <div key={iId} className="flex justify-between items-center bg-white border-2 border-black p-2 font-bold uppercase text-sm">
                        <span>{inv?.emoji} {inv?.name}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => removeIngredientQty(iId)} className="w-6 h-6 bg-[#FF8A8A] border-2 border-black hover:bg-black hover:text-white flex items-center justify-center font-black">-</button>
                          <span className="font-black w-4 text-center">{qty}</span>
                          <button onClick={() => toggleIngredient(iId)} className="w-6 h-6 bg-[#4ADE80] border-2 border-black hover:bg-black hover:text-white flex items-center justify-center font-black">+</button>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(newRIngredients).length === 0 && <p className="text-xs font-bold uppercase opacity-50">No ingredients selected.</p>}
                </div>
                
                {/* Available Stash Picker */}
                <div className="border-t-4 border-black pt-4 max-h-48 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2">
                  {inventory.map(inv => (
                    <button key={inv.id} onClick={() => toggleIngredient(inv.id)} className="border-2 border-black bg-white p-2 hover:bg-[#FFD500] text-sm font-black uppercase flex items-center gap-2 text-left active:translate-y-0.5">
                       <span className="text-xl">{inv.emoji}</span> <span className="truncate">{inv.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t-4 border-black pt-4">
              <button onClick={saveManualRecipe} className="w-full bg-[#4ADE80] border-4 border-black py-4 font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white uppercase active:translate-x-1 active:translate-y-1 active:shadow-none">
                Save New Recipe
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Recipe Details Modal */}
      {selectedRecipeForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-lg p-6 relative transform rotate-1 flex flex-col max-h-[90vh]">
            <button onClick={() => setSelectedRecipeForDetails(null)} className="absolute top-4 right-4 bg-[#FF8A8A] border-4 border-black w-10 h-10 flex items-center justify-center font-black hover:bg-black hover:text-white"><X size={20}/></button>
            <div className="flex flex-col sm:flex-row items-center gap-4 border-b-4 border-black pb-4 mb-4 text-center sm:text-left">
              <span className="text-6xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">{selectedRecipeForDetails.emoji}</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase leading-tight">{selectedRecipeForDetails.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4 shrink-0">
              <div className="border-4 border-black bg-[#FFD500] p-3 text-center shadow-[4px_4px_0_0_#000]">
                <span className="block text-xs font-black uppercase opacity-80">Time</span>
                <span className="font-black text-lg">{selectedRecipeForDetails.time}</span>
              </div>
              <div className="border-4 border-black bg-[#FF8A8A] p-3 text-center shadow-[4px_4px_0_0_#000]">
                <span className="block text-xs font-black uppercase opacity-80">Temp</span>
                <span className="font-black text-lg">{selectedRecipeForDetails.temp}</span>
              </div>
            </div>
            {selectedRecipeForDetails.note && (
              <div className="border-4 border-black bg-[#A7F3D0] p-4 mb-6 shadow-[4px_4px_0_0_#000] shrink-0">
                <span className="block text-xs font-black uppercase mb-1 opacity-80">Chef's Note</span>
                <span className="font-bold text-sm uppercase">{selectedRecipeForDetails.note}</span>
              </div>
            )}
            <h3 className="font-black uppercase mb-3 text-lg border-b-4 border-black inline-block shrink-0">Ingredients:</h3>
            <div className="border-4 border-black p-4 space-y-3 bg-[#F4F0E6] overflow-y-auto flex-1">
              {Object.entries(selectedRecipeForDetails.ingredients).map(([iId, qty]) => {
                const inv = inventory.find(i => i.id === iId);
                return (
                  <div key={iId} className="flex justify-between items-center font-black uppercase text-sm border-b-2 border-black border-dashed pb-2">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">{inv?.emoji || "❓"}</span> 
                        <span>{inv?.name || "Unknown"}</span>
                    </div>
                    <span className="bg-black text-white px-3 py-1 border-2 border-black">x{qty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryView({ inventory, updateInventory, showToast }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Group inventory by category
  const categories = useMemo(() => {
    const grouped = {};
    inventory.forEach(item => {
      const cat = item.category || "Uncategorized";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    // Sort categories alphabetically
    return Object.keys(grouped).sort().map(cat => ({
      name: cat,
      items: grouped[cat]
    }));
  }, [inventory]);

  const handleUpdate = (id, delta) => {
      updateInventory(id, delta);
      if(delta > 0) showToast("Item Added to Bag");
  };

  const toggleCategory = (catName) => {
      setCollapsedCategories(prev => ({ ...prev, [catName]: !prev[catName] }));
  };

  // Get live selected item for the modal
  const selectedItem = selectedItemId ? inventory.find(i => i.id === selectedItemId) : null;

  return (
    <div>
      <div className="bg-[#4ADE80] border-4 border-black p-4 md:p-6 shadow-[8px_8px_0_0_#000] mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase">Stash (Bag)</h2>
          <p className="font-bold text-sm uppercase mt-1 opacity-90">Categorized inventory. Tap headers to collapse.</p>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(cat => {
          const isCollapsed = collapsedCategories[cat.name];
          return (
            <div key={cat.name} className="border-4 border-black bg-white shadow-[4px_4px_0_0_#000]">
              <div 
                className="bg-[#FF90E8] border-b-4 border-black p-3 cursor-pointer flex items-center justify-between hover:bg-[#FFD500] transition-colors"
                onClick={() => toggleCategory(cat.name)}
              >
                <h3 className="text-xl font-black uppercase">{cat.name} <span className="bg-black text-white px-2 py-0.5 text-sm ml-2">{cat.items.length}</span></h3>
                {isCollapsed ? <ChevronRight size={24} /> : <ChevronDown size={24} />}
              </div>
              
              {!isCollapsed && (
                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 bg-[#F4F0E6]">
                  {cat.items.map(item => (
                    <div 
                      key={item.id} 
                      className="group border-4 border-black bg-white aspect-square flex flex-col items-center justify-between p-2 md:p-4 shadow-[4px_4px_0_0_#000] hover:bg-[#FFD500] hover:-translate-y-2 transition-all cursor-pointer relative"
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      <div className="absolute top-1 right-1 flex flex-col sm:flex-row gap-1 z-10" onClick={e => e.stopPropagation()}>
                         <button onClick={() => handleUpdate(item.id, -1)} className="w-6 h-6 border-2 border-black bg-[#FF8A8A] flex items-center justify-center font-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">-</button>
                         <button onClick={() => handleUpdate(item.id, 1)} className="w-6 h-6 border-2 border-black bg-[#4ADE80] flex items-center justify-center font-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">+</button>
                      </div>
                      
                      <span className="text-4xl md:text-5xl mt-6 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{item.emoji}</span>
                      <div className="flex flex-col items-center w-full mt-2">
                        <span className="font-black uppercase text-center text-[10px] md:text-xs truncate w-full">{item.name}</span>
                        <span className={`font-black px-2 py-0.5 md:px-3 md:py-1 border-2 border-black text-xs md:text-sm mt-1 ${item.count === 0 ? 'bg-white text-red-500' : 'bg-black text-white'}`}>x{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Item Detail Modal - LIVE UPDATING */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-sm p-6 relative transform -rotate-1">
            <button 
              onClick={() => setSelectedItemId(null)}
              className="absolute top-4 right-4 bg-[#FF8A8A] border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center gap-4 border-b-4 border-black pb-6 mb-6">
              <span className="text-8xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">{selectedItem.emoji}</span>
              <div>
                <h2 className="text-3xl font-black uppercase">{selectedItem.name}</h2>
                <span className="bg-[#FF90E8] border-2 border-black font-black text-xs px-2 py-1 mt-1 inline-block uppercase">{selectedItem.category}</span>
                <br/>
                <span className={`border-4 border-black font-black text-xl px-6 py-2 mt-3 inline-block shadow-[4px_4px_0_0_#000] ${selectedItem.count > 0 ? 'bg-[#4ADE80]' : 'bg-[#FF8A8A]'}`}>
                   In Bag: {selectedItem.count}
                </span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => handleUpdate(selectedItem.id, -1)} className="flex-1 bg-[#FF8A8A] border-4 border-black py-4 font-black text-3xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-[#FF8A8A] active:translate-x-1 active:translate-y-1 active:shadow-none transition-colors">-</button>
              <button onClick={() => handleUpdate(selectedItem.id, 1)} className="flex-1 bg-[#4ADE80] border-4 border-black py-4 font-black text-3xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-[#4ADE80] active:translate-x-1 active:translate-y-1 active:shadow-none transition-colors">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShoppingView({ mealPlan, inventory, recipes, updateInventory, showToast }) {
  
  const shoppingList = useMemo(() => {
    const required = {};
    
    // Check Breakfast, Lunch, Dinner recipes, AND their Drinks
    Object.values(mealPlan).forEach(day => {
      // 1. Check Recipe Ingredients
      [day.breakfast, day.lunch, day.dinner].forEach(recipeId => {
        if (recipeId) {
          const recipe = recipes.find(r => r.id === recipeId);
          if (recipe && recipe.ingredients) {
            Object.entries(recipe.ingredients).forEach(([itemId, qty]) => {
              required[itemId] = (required[itemId] || 0) + qty;
            });
          }
        }
      });
      // 2. Check Drinks (1 unit per meal if selected)
      [day.breakfastDrink, day.lunchDrink, day.dinnerDrink].forEach(drinkId => {
          if (drinkId) {
             required[drinkId] = (required[drinkId] || 0) + 1;
          }
      });
    });

    const missing = [];
    Object.entries(required).forEach(([itemId, reqQty]) => {
      const invItem = inventory.find(i => i.id === itemId);
      const currentCount = invItem ? invItem.count : 0;
      if (currentCount < reqQty) {
        missing.push({
          item: invItem || { id: itemId, name: "Unknown AI Item", emoji: "❓", category: "Unknown" },
          needed: reqQty - currentCount,
          totalRequired: reqQty,
          inStock: currentCount
        });
      }
    });

    return missing;
  }, [mealPlan, inventory, recipes]);

  const handleCopyList = () => {
    const text = shoppingList.map(s => `[ ] ${s.item.emoji} ${s.item.name} (x${s.needed})`).join('\n');
    navigator.clipboard.writeText(`🛒 Shopping List:\n${text}`);
    showToast("List copied to clipboard!");
  };

  const handleBuyItem = (itemId, amountNeeded) => {
    updateInventory(itemId, amountNeeded);
    showToast("Bought and added to Bag!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#FF8A8A] border-4 border-black p-4 md:p-6 shadow-[8px_8px_0_0_#000] mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase">Automated List</h2>
          <p className="font-bold text-sm uppercase mt-1">Calculated from missing planner items and drinks.</p>
        </div>
        {shoppingList.length > 0 && (
          <button onClick={handleCopyList} className="bg-black text-[#FFD500] border-4 border-black px-6 py-3 font-black text-lg uppercase shadow-[4px_4px_0_0_#FFD500] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
            <Copy size={20} /> Copy Text
          </button>
        )}
      </div>

      {shoppingList.length === 0 ? (
        <div className="border-4 border-black bg-[#4ADE80] p-12 text-center shadow-[8px_8px_0_0_#000] transform -rotate-1">
          <span className="text-6xl md:text-8xl block mb-6 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">🎉</span>
          <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight">Fully Stocked!</h3>
          <p className="font-bold uppercase mt-4 text-lg bg-black text-white p-2 inline-block border-2 border-black">You have everything you need.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shoppingList.map((miss, idx) => (
            <div key={idx} className="border-4 border-black bg-white flex flex-col sm:flex-row items-center justify-between p-4 shadow-[4px_4px_0_0_#000] hover:bg-[#FFD500] transition-colors gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-4xl w-12 text-center drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{miss.item.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black uppercase leading-none">{miss.item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-[#FF90E8] border border-black px-1 font-black uppercase">{miss.item.category}</span>
                      <p className="text-[10px] font-black uppercase opacity-60">Req: {miss.totalRequired} | Bag: {miss.inStock}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t-2 sm:border-t-0 border-black border-dashed pt-4 sm:pt-0">
                <div className="bg-black text-white font-black px-4 py-2 border-4 border-black text-lg uppercase flex items-center gap-2">
                  <span>Buy</span>
                  <span className="bg-[#FFD500] text-black px-3 py-1 border-2 border-black">{miss.needed}</span>
                </div>
                <button 
                  onClick={() => handleBuyItem(miss.item.id, miss.needed)}
                  className="w-16 h-16 border-4 border-black bg-[#4ADE80] hover:bg-black hover:text-[#4ADE80] flex items-center justify-center font-black shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:-translate-y-1"
                  title="Mark as bought and add to stash"
                >
                  <CheckSquare size={32} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}