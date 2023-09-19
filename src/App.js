import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '' && dueDate !== '') {
      setTasks([...tasks, { task: newTask, dueDate: new Date(dueDate) }]);
      setNewTask('');
      setDueDate('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditing = (index, taskContent) => {
    setEditingIndex(index);
    setEditedTask(taskContent);
  };

  const finishEditing = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = tasks.map((taskObj, index) => {
        if (index === editingIndex) {
          return { ...taskObj, task: editedTask };
        }
        return taskObj;
      });
      setTasks(updatedTasks);
      setEditingIndex(-1);
      setEditedTask('');
    }
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={editingIndex === -1 ? addTask : finishEditing}>
          {editingIndex === -1 ? 'Add' : 'Save'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((taskObj, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
            ) : (
              <span>{taskObj.task}</span>
            )}
            <span>{taskObj.dueDate.toLocaleString()}</span>
            <div className="button-group">
              {editingIndex === index ? (
                <button onClick={finishEditing}>Save</button>
              ) : (
                <button onClick={() => startEditing(index, taskObj.task)}>Edit</button>
              )}
              <button className="remove-button" onClick={() => removeTask(index)}>
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
