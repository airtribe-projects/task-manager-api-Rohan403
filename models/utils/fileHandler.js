const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../task.json");

const writeTasks = (tasksData, callback) => {
  fs.writeFile(
    filePath,
    JSON.stringify(tasksData, null, 2), 
    "utf-8",
    (err) => {
      if (err) {
        console.error("Error writing tasks.json:", err);
        if (callback) callback(err);
      } else {
        if (callback) callback(null);
      }
    }
  );
};
module.exports = { writeTasks };