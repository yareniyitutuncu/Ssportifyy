import React, { useState } from "react";
import "./Calendar.css";
import Header from './Header'; // Header bileşenini import ediyoruz

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [tasks, setTasks] = useState({});  // Store tasks in an object
  const [newTask, setNewTask] = useState(""); // Input for new task

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= date.getDate(); i++) {
      days.push(i);
    }
    return days;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  const handleMonthChange = (event) => {
    setCurrentMonth(Number(event.target.value));
  };

  const handleYearChange = (event) => {
    setCurrentYear(Number(event.target.value));
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks({
      ...tasks,
      [selectedDate]: [...(tasks[selectedDate] || []), newTask],  // Add task to the correct date
    });
    setNewTask("");  // Clear input after adding
  };

  const handleDeleteTask = (taskIndex) => {
    setTasks({
      ...tasks,
      [selectedDate]: tasks[selectedDate].filter((_, index) => index !== taskIndex),
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div>
      <Header backButton={true} title="Calendar"/> {/* Header burada doğru şekilde render ediliyor */}

      <div className="calendar-container">
        <div className="calendar-header">
          <select onChange={handleMonthChange} value={currentMonth}>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
              <option value={index} key={index}>
                {month}
              </option>
            ))}
          </select>
          <select onChange={handleYearChange} value={currentYear}>
            {[2024, 2025, 2026, 2027].map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="calendar-grid">
          {daysInMonth.map((day) => (
            <div
              key={day}
              className={`calendar-day ${selectedDate === day ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>

        {selectedDate && (
          <div className="to-do-list">
            <h3>To-Do List for {currentMonth + 1}/{selectedDate}/{currentYear}</h3>
            <ul>
              {tasks[selectedDate]?.map((task, index) => (
                <li key={index}>
                  {task}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(index)} // Silme butonuna tıklanması durumunda görevi sil
                  >
                    -
                  </button>
                </li>
              ))}
            </ul>

            {/* Input and Button to add task */}
            <div className="task-input">
              <input
                type="text"
                placeholder="Add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button className="add-task-btn" onClick={handleAddTask}>+</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
