const express = require("express");
const {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
} = require("./models/controllers/taskController");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/tasks", getAllTasks);
app.get("/tasks/:id", getSingleTask);
app.post("/tasks", createTask);
app.put("/tasks/:id", updateTask);
app.delete("/tasks/:id", deleteTask);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
