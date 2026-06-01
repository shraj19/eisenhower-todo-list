import { useState } from "react";
function Lists({items, setItems}) {

  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const toggleCheckbox = (id) => {
    setItems(
      prevItems => prevItems.map(item => item.id === id ? {...item, completed: !item.completed} : item)
    )
  }

  const deleteItem = (id) => {setItems(
    prevItems => prevItems.filter(item => item.id !== id)
  )};

  const saveEdit = (id) => {
    setItems(
      prevItems => prevItems.map(item => item.id === id ? {...item, text: editedText} : item)
    );
    setEditingId(null);
    setEditedText("");
  }

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
          {
            editingId == item.id ? (
              <input
                class = "task_edit_input"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                // onBlur={() => saveEdit(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(item.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                autoFocus
              />
            ) : (
              <span className="task_title" style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                {item.text}
              </span>
            )
          }

          {
            editingId == item.id ? (
              <button className="task_save" onClick={() => saveEdit(item.id)}>Save</button>
            ) : (
              <button className="task_edit" onClick={() => {setEditingId(item.id); setEditedText(item.text);}}>Edit</button>
            )
          }
          
          <button className="task_delete" onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul>

    </div>
  )
}

export default Lists;
