require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const logger = require("./middleware/loggerMiddleware");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);
app.use("/api/tasks", taskRoutes);
app.get('/', (req, res, next) => {
    res.send("Hello World!!!");
})

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
