import supertest from "supertest";
import express from "express";

describe("GET /", () => {
  it("It should respond with a 200 status code", async () => {
    const app = await supertest(express());
    await app.get("/").expect(200);
  });
});
