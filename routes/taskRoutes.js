const express = require("express");
const router = express.Router();
const taskController = require("../models/controllers/taskController");
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getSingleTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
module.exports = router;
