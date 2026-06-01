import Lists from "./Lists.jsx";
import {useState, useEffect} from "react";


function getIncompleteCount(items) {
  return items.filter(item => !item.completed).length;
}


function app() {

  const [tasks, setTasks] = useState (() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [error, setError] = useState("");

  const moveTask = (id, important, urgent) => {
    // console.log(`Moving task ${id} to important: ${important}, urgent: ${urgent}`);
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        return {...task, important, urgent};
      }
      return task;
    }));
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [newTask, setNewTask] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim() === "") {
      setError("Task cannot be empty");
      return;
    };

    setError("");

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
      <div className="do" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
        const id = parseInt(e.dataTransfer.getData("text/plain"));
        moveTask(id, true, true);
      }}>
        <h2 className="quadrant-title" >
          🔥 Do ({urgentImportantTasks.length}{urgentImportantTasks.length > 0 &&  ` • ${getIncompleteCount(urgentImportantTasks)} left`})
        </h2>
        <Lists items={urgentImportantTasks} setItems={setTasks} />
      </div>

      <div className="schedule" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
        const id = parseInt(e.dataTransfer.getData("text/plain"));
        moveTask(id, true, false);
      }}>
        <h2 className="quadrant-title">
          📅 Schedule ({notUrgentImportantTasks.length}{notUrgentImportantTasks.length > 0 && ` • ${getIncompleteCount(notUrgentImportantTasks)} left`})
        </h2>
        <Lists items={notUrgentImportantTasks} setItems={setTasks} />
      </div>

      <div className="vertical header">Not Important</div>
      <div className="delegate" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
        const id = parseInt(e.dataTransfer.getData("text/plain"));
        moveTask(id, false, true);
      }}>
        <h2 className="quadrant-title">
          🤝 Delegate ({urgentNotImportantTasks.length}{urgentNotImportantTasks.length > 0 && ` • ${getIncompleteCount(urgentNotImportantTasks)} left`})
        </h2>
        <Lists items={urgentNotImportantTasks} setItems={setTasks} />
      </div>
      <div className="eliminate" onDragOver={(e) => e.preventDefault()} onDrop={(e) => {
        const id = parseInt(e.dataTransfer.getData("text/plain"));
        moveTask(id, false, false);
      }}>
        <h2 className="quadrant-title">
          🗑️ Eliminate ({notUrgentNotImportantTasks.length}{notUrgentNotImportantTasks.length > 0 && ` • ${getIncompleteCount(notUrgentNotImportantTasks)} left`})
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
      ></input>
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