const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");
const bodyParser = require('body-parser')

const app = express();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/task-k8s?directConnection=true&authSource=admin';

// mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo-service:27017/task-k8s?directConnection=true&authSource=admin`, {
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json({ type: 'application/json' }))

app.get("/", async (req, res) => {
  const result = await Task.find();

  return res.status(200).json(result);
})

app.post("/create-task", async (req, res) => {

  const { title, description } = req.body;
  const result = await Task.create({
    title,
    description
  });
  console.log("test: ", result);

  return res.status(201).json(result);
})

module.exports = app;