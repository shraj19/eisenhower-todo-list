import { useState } from "react";
function Lists({items, setItems}) {

  const toggleCheckbox = (id) => {
    setItems(
      prevItems => prevItems.map(item => item.id === id ? {...item, completed: !item.completed} : item)
    )
  }

  const deleteItem = (id) => {setItems(
    prevItems => prevItems.filter(item => item.id !== id)
  )};

  return (
    <div className="list_container">
    <ul className="task_list">
      {items.map((item) => (
        <li draggable 
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", String(item.id));
              // console.log("dragging", item.id);
            }}
            key={item.id}>
          <input type="checkbox" checked={item.completed} onChange={() => toggleCheckbox(item.id)}/>
          <span className="task_title" style={{ textDecoration: item.completed ? "line-through" : "none" }}>
            {item.text}
          </span>
          <button className="task_delete" onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>

    </div>
  )
}

export default Lists;
