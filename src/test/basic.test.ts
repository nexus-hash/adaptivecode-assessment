import createServer from "../api/utils/server";
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

describe("server", () => {
  it("should be defined", () => {
    request(app).get("/").expect(200);
  })
})