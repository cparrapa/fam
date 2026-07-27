"use client";
import React, { useState, useMemo } from 'react';

// --- MOCK DATA ---
const INITIAL_INVENTORY = [
  { id: "i1", name: "Tomato", emoji: "🍅", count: 2 },
  { id: "i2", name: "Cheese", emoji: "🧀", count: 2 },
  { id: "i3", name: "Avocado", emoji: "🥑", count: 4 },
  { id: "i4", name: "Chicken", emoji: "🍗", count: 5 },
  { id: "i5", name: "Milk", emoji: "🥛", count: 1 },
  { id: "i6", name: "Spaghetti", emoji: "🍝", count: 1 },
  { id: "i7", name: "Lettuce", emoji: "🥬", count: 0 },
  { id: "i8", name: "Beef", emoji: "🥩", count: 0 },
  { id: "i9", name: "Tortilla", emoji: "🌮", count: 0 },
  { id: "i10", name: "Red Salsa", emoji: "🥫", count: 0 },
  { id: "i11", name: "Olives", emoji: "🫒", count: 0 },
  { id: "i12", name: "Beer", emoji: "🍺", count: 2 },
  { id: "i13", name: "Fish", emoji: "🐟", count: 0 },
  { id: "i14", name: "Ham", emoji: "🍖", count: 0 },
  { id: "i15", name: "Hummus", emoji: "🧆", count: 0 },
  { id: "i16", name: "Butter", emoji: "🧈", count: 1 },
  { id: "i17", name: "Eggs", emoji: "🥚", count: 0 },
  { id: "i18", name: "Bacon", emoji: "🥓", count: 0 },
  { id: "i19", name: "Yogurt", emoji: "🥛", count: 0 },
  { id: "i20", name: "Cereal", emoji: "🥣", count: 0 },
  { id: "i21", name: "Lemons", emoji: "🍋", count: 0 },
  { id: "i22", name: "Onions", emoji: "🧅", count: 0 },
  { id: "i23", name: "Oatmeal", emoji: "🥣", count: 0 },
  { id: "i24", name: "Carrots", emoji: "🥕", count: 0 },
  { id: "i25", name: "Potatoes", emoji: "🥔", count: 0 },
  { id: "i26", name: "Corn", emoji: "🌽", count: 0 },
  { id: "i27", name: "Broccoli", emoji: "🥦", count: 0 },
  { id: "i28", name: "Pasta", emoji: "🍝", count: 0 },
  { id: "i29", name: "Rice", emoji: "🍚", count: 0 },
  { id: "i30", name: "Pepper", emoji: "🌶️", count: 0 },
  { id: "i31", name: "Mayonnaise", emoji: "🥚", count: 0 },
  { id: "i32", name: "Tartare", emoji: "🥣", count: 0 },
  { id: "i33", name: "Mustard", emoji: "🌭", count: 0 },
  { id: "i34", name: "Garlic", emoji: "🧄", count: 0 },
  { id: "i35", name: "Eggplant", emoji: "🍆", count: 0 },
  { id: "i36", name: "Meat Balls", emoji: "🧆", count: 0 },
  { id: "i37", name: "Sausages", emoji: "🌭", count: 0 },
  { id: "i38", name: "Cilantro", emoji: "🌿", count: 0 },
  { id: "i39", name: "Banana", emoji: "🍌", count: 0 },
  { id: "i40", name: "Apple", emoji: "🍎", count: 0 },
  { id: "i41", name: "Bread", emoji: "🍞", count: 0 },
  { id: "i42", name: "Cherry Tomatoes", emoji: "🍅", count: 0 },
  { id: "i43", name: "Cucumber", emoji: "🥒", count: 0 },
  { id: "i44", name: "Pumpkin", emoji: "🎃", count: 0 },
  { id: "i45", name: "Parmesan", emoji: "🧀", count: 0 },
];

const INITIAL_RECIPES = [
  { id: "r1", name: "Spaghetti", emoji: "🍝", prep: ["Boil water", "Cook pasta", "Add sauce"], ingredients: { "i1": 4, "i2": 1, "i6": 1, "i8": 1 }, time: "20 min", temp: "100°C", note: "Al dente is best" },
  { id: "r2", name: "Nachos", emoji: "🌮", prep: ["Layer chips", "Add cheese", "Bake", "Top with avocado & salsa"], ingredients: { "i2": 2, "i3": 2, "i9": 1, "i10": 1 }, time: "15 min", temp: "200°C", note: "Don't burn the chips!" },
  { id: "r3", name: "Chicken Curry", emoji: "🍗", prep: ["Chop chicken", "Simmer in sauce", "Serve with rice"], ingredients: { "i1": 2, "i4": 3, "i5": 1, "i29": 1 }, time: "45 min", temp: "Medium", note: "Add extra spice" },
  { id: "r4", name: "Caesar Salad", emoji: "🥗", prep: ["Chop lettuce", "Add dressing", "Top with chicken"], ingredients: { "i4": 1, "i7": 2, "i2": 1 }, time: "10 min", temp: "Cold", note: "Fresh lettuce only" },
];

const INITIAL_EVENTS = [
  { id: "e1", date: "2026-07-28", title: "⚽ Football", type: "sports" },
  { id: "e2", date: "2026-08-15", title: "🎂 Birthday", type: "event" },
  { id: "e3", date: "2026-08-18", title: "🎬 Cinema", type: "leisure" },
  { id: "e4", date: "2026-08-22", title: "🏖 Holiday", type: "holiday" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("calendar");
  
  // State for modules
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  
  const [tasks, setTasks] = useState([
    { id: "t1", text: "🧺 Laundry", quadrant: "do", completed: false },
    { id: "t2", text: "❤️ Wife date", quadrant: "do", completed: false },
    { id: "t3", text: "💻 Finish website", quadrant: "schedule", completed: false },
    { id: "t4", text: "📚 Czech", quadrant: "schedule", completed: false },
    { id: "t5", text: "🏃 Workout", quadrant: "eliminate", completed: false },
  ]);
  
  const [mealPlan, setMealPlan] = useState({
    Monday: { lunch: null, dinner: "r1" },
    Tuesday: { lunch: null, dinner: null },
    Wednesday: { lunch: "r4", dinner: null },
    Thursday: { lunch: null, dinner: null },
    Friday: { lunch: null, dinner: "r2" },
    Saturday: { lunch: null, dinner: null },
    Sunday: { lunch: null, dinner: null },
  });

  const updateInventory = (id, delta) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item
    ));
  };

  const assignMeal = (day, meal, recipeId) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: { ...prev[day], [meal]: recipeId }
    }));
  };

  const btnClass = "border-4 border-black font-black uppercase px-4 py-2 shadow-[4px_4px_0_0_#000] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer";

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-black font-sans selection:bg-[#FF90E8]">
      {/* Header */}
      <header className="border-b-4 border-black bg-[#FFD500] p-4 md:p-6 shadow-[0_4px_0_0_#000] sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Family Board</h1>
        </div>
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          {[
            { id: "calendar", label: "🗓 Calendar", bg: "bg-[#FF90E8]" },
            { id: "tasks", label: "✅ Matrix", bg: "bg-[#4ADE80]" },
            { id: "planner", label: "🍽 Planner", bg: "bg-[#A7F3D0]" },
            { id: "inventory", label: "🎒 Bag", bg: "bg-white" },
            { id: "shopping", label: "🛒 Buy", bg: "bg-[#FF8A8A]" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${btnClass} ${tab.bg} ${activeTab === tab.id ? 'translate-x-1 translate-y-1 !shadow-none' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        {activeTab === "calendar" && <CalendarView events={events} setEvents={setEvents} />}
        {activeTab === "tasks" && <MatrixView tasks={tasks} setTasks={setTasks} />}
        {activeTab === "planner" && <PlannerView mealPlan={mealPlan} assignMeal={assignMeal} recipes={recipes} setRecipes={setRecipes} inventory={inventory} />}
        {activeTab === "inventory" && <InventoryView inventory={inventory} updateInventory={updateInventory} />}
        {activeTab === "shopping" && <ShoppingView mealPlan={mealPlan} inventory={inventory} recipes={recipes} updateInventory={updateInventory} />}
      </main>
    </div>
  );
}

function CalendarView({ events, setEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 27)); // Set to July 27, 2026 based on context
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [formTitle, setFormTitle] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Calendar logic
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const startDay = (firstDayOfMonth + 6) % 7; // Convert to Mon (0) to Sun (6)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const blanks = Array.from({ length: startDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const getSelectedDateString = () => {
    if(!selectedDate) return null;
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
  };

  const selectedDateStr = getSelectedDateString();
  const displayedEvents = selectedDateStr 
    ? events.filter(e => e.date === selectedDateStr)
    : events.filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`));

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => {
    const today = new Date(2026, 6, 27); // Using hardcoded context today
    setCurrentDate(today);
    setSelectedDate(today.getDate());
  };

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
    } else {
      setEvents([...events, { id: Date.now().toString(), date: selectedDateStr, title: formTitle, type: "event" }]);
    }
    setIsModalOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Calendar Grid */}
      <div className="lg:col-span-2 border-4 border-black bg-white shadow-[8px_8px_0_0_#000] p-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b-4 border-black pb-4 mb-4 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={handlePrevMonth} className="border-4 border-black bg-white px-3 py-1 font-black text-xl shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">&lt;</button>
            <h2 className="text-3xl md:text-4xl font-black uppercase w-64 text-center">{monthNames[month]} {year}</h2>
            <button onClick={handleNextMonth} className="border-4 border-black bg-white px-3 py-1 font-black text-xl shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">&gt;</button>
          </div>
          <button onClick={handleToday} className="border-4 border-black bg-[#FFD500] px-4 py-2 font-bold uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">Today</button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-2 text-center font-black uppercase text-sm md:text-base">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="bg-black text-white py-1">{d}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {blanks.map(b => <div key={`blank-${b}`} className="h-20 bg-gray-200 border-4 border-black opacity-30"></div>)}
          {days.map(d => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const hasEvent = events.some(e => e.date === dateStr);
            const isToday = year === 2026 && month === 6 && d === 27; // Context today
            return (
              <div 
                key={d}
                onClick={() => setSelectedDate(selectedDate === d ? null : d)}
                className={`h-20 border-4 border-black p-1 md:p-2 flex flex-col justify-between cursor-pointer transition-all hover:bg-[#FFD500] 
                  ${selectedDate === d ? 'bg-[#FF90E8] shadow-[inset_4px_4px_0_0_#000]' : 'bg-[#F4F0E6]'}
                  ${isToday && selectedDate !== d ? 'ring-4 ring-inset ring-[#FFD500]' : ''}
                `}
              >
                <span className="font-black text-lg">{d}</span>
                {hasEvent && <div className="h-3 w-full bg-black mt-1"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Upcoming Events */}
      <div className="border-4 border-black bg-[#FF90E8] shadow-[8px_8px_0_0_#000] flex flex-col max-h-[80vh]">
        <div className="p-6 border-b-4 border-black bg-white">
          <h2 className="text-3xl font-black uppercase">{selectedDate ? `${monthNames[month].substring(0,3)} ${selectedDate}` : 'Month Events'}</h2>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-[#FF90E8]">
          {displayedEvents.length === 0 ? (
            <div className="p-4 border-4 border-black bg-white font-bold text-center">No events found.</div>
          ) : (
            displayedEvents.map(evt => (
              <div key={evt.id} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_0_#000] relative group">
                {!selectedDateStr && (
                  <div className="absolute -top-3 -left-3 bg-black text-white font-black text-xs px-2 py-1 uppercase border-2 border-black">
                    {evt.date}
                  </div>
                )}
                <h3 className="text-xl font-black mt-2">{evt.title}</h3>
                <div className="mt-4 flex gap-2">
                   <button onClick={() => openModal(evt)} className="text-xs bg-[#FFD500] border-2 border-black font-bold px-2 py-1 uppercase hover:bg-black hover:text-white">Edit</button>
                   <button onClick={() => deleteEvent(evt.id)} className="text-xs bg-red-400 border-2 border-black font-bold px-2 py-1 uppercase hover:bg-black hover:text-white">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 bg-white border-t-4 border-black">
          <button 
            disabled={!selectedDateStr}
            onClick={() => openModal()}
            className={`w-full border-4 border-black py-3 font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none 
              ${selectedDateStr ? 'bg-[#4ADE80] hover:bg-[#34d399] cursor-pointer' : 'bg-gray-300 cursor-not-allowed opacity-50'}`}
          >
            {selectedDateStr ? "+ Add Event to Selected Day" : "Select a day to add"}
          </button>
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-md p-8 relative transform -rotate-1">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 bg-red-400 border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none">X</button>
            <h2 className="text-3xl font-black uppercase mb-6">{editEventId ? 'Edit Event' : 'New Event'}</h2>
            <div className="mb-4">
              <label className="block font-bold uppercase text-sm mb-2">Event Title</label>
              <input 
                type="text" 
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                autoFocus
                className="w-full border-4 border-black p-3 font-black uppercase focus:outline-none focus:bg-[#FFD500] shadow-[4px_4px_0_0_#000]" 
              />
            </div>
            <button onClick={saveEvent} className="w-full bg-[#4ADE80] border-4 border-black py-3 font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white mt-4 uppercase">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatrixView({ tasks, setTasks }) {
  const [newTaskInput, setNewTaskInput] = useState("");

  const quadrants = [
    { id: "do", title: "Do First", bg: "bg-[#FF8A8A]", desc: "Urgent & Important" },
    { id: "schedule", title: "Schedule", bg: "bg-[#93C5FD]", desc: "Not Urgent, Important" },
    { id: "delegate", title: "Delegate", bg: "bg-[#FDE047]", desc: "Urgent, Not Important" },
    { id: "eliminate", title: "Don't Do", bg: "bg-[#E5E7EB]", desc: "Not Urgent, Not Important" },
  ];

  const handleAddTask = () => {
    if(newTaskInput.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTaskInput, quadrant: "do", completed: false }]);
      setNewTaskInput("");
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, quadId) => {
    const taskId = e.dataTransfer.getData("taskId");
    setTasks(tasks.map(t => t.id === taskId ? { ...t, quadrant: quadId } : t));
  };

  return (
    <div className="min-h-[75vh] flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
         <input 
           type="text" 
           placeholder="NEW TASK..." 
           value={newTaskInput}
           onChange={e => setNewTaskInput(e.target.value)}
           onKeyDown={e => e.key === 'Enter' && handleAddTask()}
           className="border-4 border-black p-3 font-black flex-1 uppercase focus:outline-none focus:bg-[#FFD500] shadow-[4px_4px_0_0_#000]" 
         />
         <button onClick={handleAddTask} className="border-4 border-black bg-[#4ADE80] px-6 py-3 font-black uppercase shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-black hover:text-white">Add Task</button>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map(q => (
          <div 
            key={q.id}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, q.id)}
            className={`border-4 border-black ${q.bg} p-4 shadow-[8px_8px_0_0_#000] flex flex-col`}
          >
            <div className="border-b-4 border-black pb-2 mb-4">
              <h2 className="text-2xl font-black uppercase">{q.title}</h2>
              <p className="text-sm font-bold opacity-80 uppercase">{q.desc}</p>
            </div>
            
            <div className="flex-1 flex flex-wrap gap-4 content-start">
              {tasks.filter(t => t.quadrant === q.id).map(task => (
                <div 
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  className={`relative group border-4 border-black p-3 shadow-[4px_4px_0_0_#000] cursor-grab active:cursor-grabbing transform hover:-translate-y-1 transition-transform rotate-1 hover:rotate-0 w-[220px] flex items-start gap-3
                    ${task.completed ? 'bg-gray-300 opacity-60' : 'bg-[#FFD500]'}
                  `}
                >
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="absolute -top-3 -right-3 bg-red-500 border-2 border-black w-6 h-6 items-center justify-center font-black text-xs hidden group-hover:flex hover:bg-black hover:text-white z-10"
                  >
                    X
                  </button>
                  <div 
                    onClick={() => toggleComplete(task.id)}
                    className="w-6 h-6 border-4 border-black bg-white flex-shrink-0 cursor-pointer flex items-center justify-center mt-0.5 hover:bg-black group-checkbox"
                  >
                    {task.completed && <div className="w-3 h-3 bg-black"></div>}
                  </div>
                  <p className={`font-black text-lg leading-tight break-words ${task.completed ? 'line-through' : ''}`}>
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

function PlannerView({ mealPlan, assignMeal, recipes, setRecipes, inventory }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  
  // New Recipe Form State
  const [newRName, setNewRName] = useState("");
  const [newREmoji, setNewREmoji] = useState("🍽");
  const [newRTime, setNewRTime] = useState("");
  const [newRTemp, setNewRTemp] = useState("");
  const [newRNote, setNewRNote] = useState("");
  const [newRIngredients, setNewRIngredients] = useState({});

  const onDragStart = (e, recipeId) => e.dataTransfer.setData("recipeId", recipeId);
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e, day, mealType) => {
    e.preventDefault();
    const recipeId = e.dataTransfer.getData("recipeId");
    if(recipeId) assignMeal(day, mealType, recipeId);
  };

  const toggleIngredient = (invId) => {
    setNewRIngredients(prev => {
      const next = { ...prev };
      if (next[invId]) {
        next[invId] += 1;
      } else {
        next[invId] = 1;
      }
      return next;
    });
  };

  const removeIngredientQty = (invId) => {
    setNewRIngredients(prev => {
      const next = { ...prev };
      if (next[invId] > 1) {
        next[invId] -= 1;
      } else {
        delete next[invId];
      }
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
      note: newRNote || "",
      prep: []
    }]);
    setIsCreatorOpen(false);
    // Reset
    setNewRName(""); setNewREmoji("🍽"); setNewRTime(""); setNewRTemp(""); setNewRNote(""); setNewRIngredients({});
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Recipe Library Sidebar */}
      <div className="w-full lg:w-1/3 border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
        <div className="bg-[#A7F3D0] p-4 border-b-4 border-black flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase">Recipes</h2>
          <button onClick={() => setIsCreatorOpen(true)} className="bg-black text-white font-black px-3 py-1 text-sm border-2 border-black hover:bg-white hover:text-black uppercase shadow-[2px_2px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">+ New</button>
        </div>
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          {recipes.map(recipe => (
            <div 
              key={recipe.id}
              draggable
              onDragStart={(e) => onDragStart(e, recipe.id)}
              className="border-4 border-black bg-[#F4F0E6] p-3 flex flex-col gap-2 cursor-grab active:cursor-grabbing hover:bg-[#FFD500] transition-colors shadow-[4px_4px_0_0_#000] group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{recipe.emoji}</span>
                  <span className="font-black uppercase text-xl">{recipe.name}</span>
                </div>
                <button onClick={() => setSelectedRecipe(recipe)} className="border-2 border-black bg-white font-bold text-xs uppercase px-2 py-1 hidden group-hover:block hover:bg-black hover:text-white">View</button>
              </div>
              <div className="text-xs font-bold uppercase border-t-2 border-black pt-2 mt-2 opacity-60">
                Drag to plan &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Weekly Board */}
      <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map(day => (
          <div key={day} className="border-4 border-black bg-[#F4F0E6] shadow-[4px_4px_0_0_#000] flex flex-col">
            <h3 className="bg-black text-white text-center font-black uppercase py-2 border-b-4 border-black">{day}</h3>
            
            {/* Lunch Slot */}
            <div onDragOver={onDragOver} onDrop={(e) => onDrop(e, day, "lunch")} className="flex-1 border-b-4 border-black p-2 bg-[#FFD500] bg-opacity-30 flex flex-col group">
              <span className="text-xs font-black uppercase mb-1">☀ Lunch</span>
              {mealPlan[day].lunch ? (
                <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_#000] relative cursor-pointer hover:bg-gray-50" onClick={() => setSelectedRecipe(recipes.find(r=>r.id === mealPlan[day].lunch))}>
                   <button onClick={(e) => { e.stopPropagation(); assignMeal(day, "lunch", null); }} className="absolute -top-2 -right-2 bg-red-400 border-2 border-black text-black w-6 h-6 flex items-center justify-center font-black text-xs hidden group-hover:flex hover:bg-black hover:text-white">X</button>
                   <span className="text-2xl block text-center mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">{recipes.find(r=>r.id === mealPlan[day].lunch)?.emoji}</span>
                   <span className="font-bold text-xs uppercase block text-center truncate">{recipes.find(r=>r.id === mealPlan[day].lunch)?.name}</span>
                </div>
              ) : (
                <div className="flex-1 border-2 border-dashed border-black opacity-50 flex items-center justify-center text-xs font-bold uppercase text-center p-2">Drop Recipe</div>
              )}
            </div>

            {/* Dinner Slot */}
            <div onDragOver={onDragOver} onDrop={(e) => onDrop(e, day, "dinner")} className="flex-1 p-2 bg-[#93C5FD] bg-opacity-30 flex flex-col group">
              <span className="text-xs font-black uppercase mb-1">🌙 Dinner</span>
              {mealPlan[day].dinner ? (
                <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_#000] relative cursor-pointer hover:bg-gray-50" onClick={() => setSelectedRecipe(recipes.find(r=>r.id === mealPlan[day].dinner))}>
                   <button onClick={(e) => { e.stopPropagation(); assignMeal(day, "dinner", null); }} className="absolute -top-2 -right-2 bg-red-400 border-2 border-black text-black w-6 h-6 flex items-center justify-center font-black text-xs hidden group-hover:flex hover:bg-black hover:text-white">X</button>
                   <span className="text-2xl block text-center mb-1 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">{recipes.find(r=>r.id === mealPlan[day].dinner)?.emoji}</span>
                   <span className="font-bold text-xs uppercase block text-center truncate">{recipes.find(r=>r.id === mealPlan[day].dinner)?.name}</span>
                </div>
              ) : (
                <div className="flex-1 border-2 border-dashed border-black opacity-50 flex items-center justify-center text-xs font-bold uppercase text-center p-2">Drop Recipe</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-lg p-6 relative transform rotate-1">
            <button onClick={() => setSelectedRecipe(null)} className="absolute top-4 right-4 bg-red-400 border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white">X</button>
            <div className="flex items-center gap-4 border-b-4 border-black pb-4 mb-4">
              <span className="text-6xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">{selectedRecipe.emoji}</span>
              <h2 className="text-4xl font-black uppercase">{selectedRecipe.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border-4 border-black bg-[#FFD500] p-2 text-center shadow-[4px_4px_0_0_#000]">
                <span className="block text-xs font-black uppercase">Time</span>
                <span className="font-bold">{selectedRecipe.time}</span>
              </div>
              <div className="border-4 border-black bg-[#FF8A8A] p-2 text-center shadow-[4px_4px_0_0_#000]">
                <span className="block text-xs font-black uppercase">Temp</span>
                <span className="font-bold">{selectedRecipe.temp}</span>
              </div>
            </div>
            {selectedRecipe.note && (
              <div className="border-4 border-black bg-[#A7F3D0] p-3 mb-4 shadow-[4px_4px_0_0_#000]">
                <span className="block text-xs font-black uppercase mb-1">Note</span>
                <span className="font-bold text-sm uppercase">{selectedRecipe.note}</span>
              </div>
            )}
            <h3 className="font-black uppercase mb-2">Ingredients Needed:</h3>
            <div className="border-4 border-black p-4 space-y-2 bg-[#F4F0E6] max-h-48 overflow-y-auto">
              {Object.entries(selectedRecipe.ingredients).map(([iId, qty]) => {
                const inv = inventory.find(i => i.id === iId);
                return (
                  <div key={iId} className="flex justify-between font-bold uppercase text-sm border-b-2 border-black border-dashed pb-1">
                    <span>{inv?.emoji} {inv?.name}</span>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-2xl p-6 relative h-[90vh] flex flex-col">
            <button onClick={() => setIsCreatorOpen(false)} className="absolute top-4 right-4 bg-red-400 border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white">X</button>
            <h2 className="text-3xl font-black uppercase mb-4 border-b-4 border-black pb-2">Create Recipe</h2>
            
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
                          <button onClick={() => removeIngredientQty(iId)} className="w-6 h-6 bg-red-400 border-2 border-black hover:bg-black hover:text-white flex items-center justify-center">-</button>
                          <span>{qty}</span>
                          <button onClick={() => toggleIngredient(iId)} className="w-6 h-6 bg-[#4ADE80] border-2 border-black hover:bg-black hover:text-white flex items-center justify-center">+</button>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(newRIngredients).length === 0 && <p className="text-xs font-bold uppercase opacity-50">No ingredients selected.</p>}
                </div>
                
                {/* Available Stash Picker */}
                <div className="border-t-4 border-black pt-2 max-h-48 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-2">
                  {inventory.map(inv => (
                    <button key={inv.id} onClick={() => toggleIngredient(inv.id)} className="border-2 border-black bg-white p-1 hover:bg-[#FFD500] text-sm font-black uppercase flex items-center gap-1 text-left">
                       <span className="text-lg">{inv.emoji}</span> <span className="truncate">{inv.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t-4 border-black pt-4">
              <button onClick={saveRecipe} className="w-full bg-[#FF90E8] border-4 border-black py-4 font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white uppercase active:translate-x-1 active:translate-y-1 active:shadow-none">
                Save New Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryView({ inventory, updateInventory }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <div className="bg-[#4ADE80] border-4 border-black p-6 shadow-[8px_8px_0_0_#000] mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase">Stash (Inventory)</h2>
          <p className="font-bold text-sm uppercase opacity-80 mt-1">Manage your ingredients Breath of the Wild style.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {inventory.map(item => (
          <div 
            key={item.id} 
            className="group border-4 border-black bg-white aspect-square flex flex-col items-center justify-between p-4 shadow-[4px_4px_0_0_#000] hover:bg-[#FFD500] hover:-translate-y-2 transition-all cursor-pointer relative"
            onClick={() => setSelectedItem(item)}
          >
            <div className="absolute top-2 right-2 flex gap-1 z-10" onClick={e => e.stopPropagation()}>
               <button onClick={() => updateInventory(item.id, -1)} className="w-6 h-6 border-2 border-black bg-white flex items-center justify-center font-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">-</button>
               <button onClick={() => updateInventory(item.id, 1)} className="w-6 h-6 border-2 border-black bg-white flex items-center justify-center font-black hover:bg-black hover:text-white shadow-[2px_2px_0_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">+</button>
            </div>
            
            <span className="text-5xl mt-5 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{item.emoji}</span>
            <div className="flex flex-col items-center w-full mt-2">
              <span className="font-black uppercase text-center text-xs truncate w-full">{item.name}</span>
              <span className="bg-black text-white font-black px-3 py-1 border-2 border-black text-sm mt-1">x{item.count}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white border-4 border-black shadow-[16px_16px_0_0_#000] w-full max-w-md p-8 relative transform -rotate-1">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-red-400 border-4 border-black w-10 h-10 flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              X
            </button>
            
            <div className="flex items-center gap-6 border-b-4 border-black pb-6 mb-6">
              <span className="text-8xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">{selectedItem.emoji}</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase">{selectedItem.name}</h2>
                <span className="bg-[#4ADE80] border-2 border-black font-black px-4 py-1 mt-2 inline-block shadow-[2px_2px_0_0_#000]">In Stash: {selectedItem.count}</span>
              </div>
            </div>

            <div className="space-y-4 font-bold uppercase text-sm">
              <div className="flex justify-between border-b-2 border-black border-dashed pb-2">
                <span>Supplier</span>
                <span className="text-[#FF90E8] font-black underline cursor-pointer hover:text-black">Local Market</span>
              </div>
              <div className="flex justify-between border-b-2 border-black border-dashed pb-2">
                <span>Notes</span>
                <span>Basic ingredient</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Status</span>
                <span className={selectedItem.count > 0 ? "text-green-600" : "text-red-600"}>{selectedItem.count > 0 ? "Stocked" : "Empty"}</span>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button onClick={() => updateInventory(selectedItem.id, -1)} className="flex-1 bg-white border-4 border-black py-3 font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-[#FF8A8A] active:translate-x-1 active:translate-y-1 active:shadow-none">-</button>
              <button onClick={() => updateInventory(selectedItem.id, 1)} className="flex-1 bg-white border-4 border-black py-3 font-black text-xl shadow-[4px_4px_0_0_#000] hover:bg-[#A7F3D0] active:translate-x-1 active:translate-y-1 active:shadow-none">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShoppingView({ mealPlan, inventory, recipes, updateInventory }) {
  
  const shoppingList = useMemo(() => {
    const required = {};
    
    Object.values(mealPlan).forEach(day => {
      [day.lunch, day.dinner].forEach(recipeId => {
        if (recipeId) {
          const recipe = recipes.find(r => r.id === recipeId);
          if (recipe && recipe.ingredients) {
            Object.entries(recipe.ingredients).forEach(([itemId, qty]) => {
              required[itemId] = (required[itemId] || 0) + qty;
            });
          }
        }
      });
    });

    const missing = [];
    Object.entries(required).forEach(([itemId, reqQty]) => {
      const invItem = inventory.find(i => i.id === itemId);
      const currentCount = invItem ? invItem.count : 0;
      if (currentCount < reqQty) {
        missing.push({
          item: invItem || { id: itemId, name: "Unknown", emoji: "❓" },
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
    alert("Shopping list copied to clipboard!"); // using basic alert here as it's purely informative for a desktop action, but can build custom toast if strictly needed. Let's stick to simple copy feedback.
  };

  const handleBuyItem = (itemId, amountNeeded) => {
    updateInventory(itemId, amountNeeded);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#FF8A8A] border-4 border-black p-6 shadow-[8px_8px_0_0_#000] mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase">Automated List</h2>
          <p className="font-bold mt-2 uppercase">Based on planner & stash.</p>
        </div>
        {shoppingList.length > 0 && (
          <button onClick={handleCopyList} className="bg-black text-white border-2 border-black px-4 py-2 font-black uppercase hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none whitespace-nowrap">
            Copy List
          </button>
        )}
      </div>

      {shoppingList.length === 0 ? (
        <div className="border-4 border-black bg-[#4ADE80] p-12 text-center shadow-[8px_8px_0_0_#000]">
          <span className="text-6xl block mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">🎉</span>
          <h3 className="text-3xl font-black uppercase">Fully Stocked!</h3>
          <p className="font-bold uppercase mt-2">You have everything you need for this week's meals.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shoppingList.map((miss, idx) => (
            <div key={idx} className="border-4 border-black bg-white flex items-center justify-between p-4 shadow-[4px_4px_0_0_#000] hover:bg-[#F4F0E6] transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-4xl w-12 text-center drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">{miss.item.emoji}</span>
                <div>
                  <h3 className="text-2xl font-black uppercase">{miss.item.name}</h3>
                  <p className="text-xs font-bold uppercase opacity-60">Req: {miss.totalRequired} | Stash: {miss.inStock}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-black text-white font-black px-4 py-2 border-2 border-black text-lg uppercase flex items-center gap-2">
                  <span>Buy</span>
                  <span className="bg-[#FFD500] text-black px-2 py-0.5 border-2 border-black">{miss.needed}</span>
                </div>
                <button 
                  onClick={() => handleBuyItem(miss.item.id, miss.needed)}
                  className="w-12 h-12 border-4 border-black bg-[#4ADE80] hover:bg-black hover:text-white flex items-center justify-center font-black text-xl shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-colors"
                  title="Mark as bought and add to stash"
                >
                  ✓
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}