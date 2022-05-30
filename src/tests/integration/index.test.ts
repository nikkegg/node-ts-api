import supertest from "supertest";
import { App } from "@src/app";

describe("GET /", () => {
  it("It should respond with a 200 status code", async () => {
    const app = await supertest(await App.initApp());
    await app.get("/").expect(200);
  });
});
