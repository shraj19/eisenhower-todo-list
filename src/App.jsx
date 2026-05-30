import Lists from "./Lists.jsx";
import {useState, useEffect} from "react";

function app() {

  const [tasks, setTasks] = useState (() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [newTask, setNewTask] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      urgent: isUrgent,
      important: isImportant,
      completed: false
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
    setIsUrgent(false);
    setIsImportant(false);
  }

  const urgentImportantTasks = tasks.filter(task => task.urgent && task.important);
  const urgentNotImportantTasks = tasks.filter(task => task.urgent && !task.important);
  const notUrgentImportantTasks = tasks.filter(task => !task.urgent && task.important);
  const notUrgentNotImportantTasks = tasks.filter(task => !task.urgent && !task.important);
  

  return (
    <>
    <div className="matrix">
      <div></div>
      <div className="horizontal header">Urgent</div>
      <div className="horizontal header">Not Urgent</div>

      <div className="vertical header" >Important</div>
      <div className="do">
        <h2 className="quadrant-title">
          🔥 Do ({urgentImportantTasks.length})
        </h2>
        <Lists items={urgentImportantTasks} setItems={setTasks} />
      </div>
      <div className="schedule">
        <h2 className="quadrant-title">
          📅 Schedule ({notUrgentImportantTasks.length})
        </h2>
        <Lists items={notUrgentImportantTasks} setItems={setTasks} />
      </div>

      <div className="vertical header">Not Important</div>
      <div className="delegate">
        <h2 className="quadrant-title">
          🤝 Delegate ({urgentNotImportantTasks.length})
        </h2>
        <Lists items={urgentNotImportantTasks} setItems={setTasks} />
      </div>
      <div className="eliminate">
        <h2 className="quadrant-title">
          🗑️ Eliminate ({notUrgentNotImportantTasks.length})
        </h2>
        <Lists items={notUrgentNotImportantTasks} setItems={setTasks} />
      </div>
    </div>

    <form className="task_form" onSubmit={handleSubmit}>
    <h2>Add Task</h2>

    <div className="form_group">
      <label htmlFor="task">Task</label>
      <input
        type="text"
        id="task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="What needs to be done?"
        required
      />
    </div>

    <div className="options">
      <label className={`chip ${isUrgent ? "active" : ""}`}>
        <input
          type="checkbox"
          checked={isUrgent}
          onChange={(e) => setIsUrgent(e.target.checked)}
        />
        <span>⚡ Urgent</span>
      </label>

      <label className={`chip ${isImportant ? "active" : ""}`}>
        <input
          type="checkbox"
          checked={isImportant}
          onChange={(e) => setIsImportant(e.target.checked)}
        />
        <span>⭐ Important</span>
      </label>
    </div>

    <button className="task_add_btn" type="submit">
      Add Task
    </button>
  </form>
  </>
  )
}

export default app;