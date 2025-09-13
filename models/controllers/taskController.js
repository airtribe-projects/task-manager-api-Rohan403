const tasks = require("../../task.json");
const { writeTasks } = require("../utils/fileHandler");

// Get all tasks
const getAllTasks = (req, res) => {
  if  (req.query.completed !== undefined) {
    const isCompleted = req.query.completed === "true";
    const filteredTasks = tasks.tasks.filter(task => task.completed === isCompleted);
    return res.status(200).json(filteredTasks);
  }
  res.status(200).json(tasks);
};
// Get a single task by ID
const getSingleTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.tasks.find((t) => t.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};
// Create a new task
const createTask = (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.tasks.length > 0 ? tasks.tasks[tasks.tasks.length - 1].id + 1 : 1;
  tasks.tasks.push(newTask);
  writeTasks(tasks, (err) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    res.status(201).json(newTask);
  });
};
// Update an existing task by ID
const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks.tasks[taskIndex] = { ...tasks.tasks[taskIndex], ...req.body };
    writeTasks(tasks, (err) => {
      if (err) return res.status(500).json({ message: "Internal Server Error" });
      res.status(200).json(tasks.tasks[taskIndex]);
    }
    );
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};
// Delete a task by ID 
const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.tasks.splice(taskIndex, 1);
    writeTasks(tasks, (err) => {
      if (err) return res.status(500).json({ message: "Internal Server Error" });
      res.status(200).json(deletedTask[0]);
    });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};
module.exports = { getAllTasks, getSingleTask, createTask, updateTask, deleteTask };
