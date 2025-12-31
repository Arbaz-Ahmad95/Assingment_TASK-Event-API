const express = require("express");
const { connectDB } = require("./db");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/v3/app/events", require("./routes/eventsRoutes"));

// Task-2
app.use("/api/v3/app/nudges", require("./routes/nudgeRoutes"));

app.listen(5000, () => {
  console.log("Server running");
});
