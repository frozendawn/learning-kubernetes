const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");
const bodyParser = require('body-parser')

const app = express();

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/task-k8s?directConnection=true&authSource=admin';

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json({ type: 'application/json' }))

app.get("/", async (req, res) => {
  try {
    const result = await Task.find();
    return res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})

app.post("/create-task", async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await Task.create({
      title,
      description
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

app.get("/error", async (req, res, next) => {
  try {
    throw new Error("Error from promise")
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).send('Internal server error')
})

module.exports = app;