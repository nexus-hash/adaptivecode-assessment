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

describe("SignIn", () => {
  test("SignIn", async () => {
    const body = {
      "email": "info@adaptivecode.io",
      "password": "NewPassword",
    }
    const res = await request(app).post("/api/sign-in").send(body)
    expect(res.status).toBe(200)
    expect(res.body.status).toBe(true)
    expect(res.body.message).toBe("User signed in successfully")
    expect(res.body.token).toBeDefined()
  })
})