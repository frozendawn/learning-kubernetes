const request = require('supertest');
const app = require('../app');
const Task = require("../models/task");
const mongoose = require("mongoose");

describe('App.js', () => {
  afterAll(async () => {
    await Task.deleteMany();
    mongoose.connection.close();
  })

  it("POST /create-task - Should create a task", async () => {

    const body = {
      title: "Test title",
      description: "Test description"
    }

    const result = await request(app)
      .post("/create-task")
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    expect(result.statusCode).toBe(201);
    expect(result._body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: body.title,
        description: body.description
      })
    )
  })

  it("GET / - Should return all products", async () => {
    const task = await Task.create({
      title: "test task",
      description: "test task decription"
    })
    const result = await request(app)
      .get("/")
      .expect('Content-Type', /json/)

    expect(result._body.length).toBeGreaterThan(0);
    expect(result.statusCode).toBe(200);
  });

})