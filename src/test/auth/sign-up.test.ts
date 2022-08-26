import createServer from "../../api/utils/server";
import Express from "express";
import request from "supertest";
import mongoose from "mongoose";

let app: Express.Application;

beforeAll(async () => {
  app = await createServer();
})

afterAll(async ()=>{
  mongoose.disconnect();
})

describe("SignUp", () => {
  test("Sign-up", async () => {
    const body = {
      "email": "info@adaptivecode.io",
      "password": "Password123!2",
      "firstName": "Mayur",
      "lastName":"Kale"
    }
    const res = await request(app).post("/api/sign-up").send(body)
    expect(res.status).toBe(201)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe("User already exists")
    expect(res.body.token).toBeDefined()
  })
})