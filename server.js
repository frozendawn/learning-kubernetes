const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");
const bodyParser = require('body-parser')

const app = express();

const PORT = 3000;
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo-service:27017/task-k8s?directConnection=true&authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json({ type: 'application/json' }))

app.get("/", async (req, res) => {
  const result = await Task.find();

  res.json(result);
})

app.post("/create-task", async (req, res) => {

  const { title, description } = req.body;
  const result = await Task.create({
    title,
    description
  });
  console.log("test: ", result);

  res.json(result);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
})
