const request = require('supertest');
const app = require('../app');
const Task = require("../models/task");

describe('Sample Test', () => {

  describe("GET /", () => {
    it("Should return all products", async () => {
      const task = await Task.create({
        title: "test task",
        description: "test task decription"
      })

      console.log("task result: ", task);

      const result = await request(app)
      .get("/")
      .expect('Content-Type', /json/)

      expect(result._body.length).toBeGreaterThan(0);
      expect(result.statusCode).toBe(200)
    });
  });

})