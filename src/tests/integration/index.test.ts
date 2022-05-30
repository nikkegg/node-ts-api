import supertest from "supertest";
import { App } from "@src/app";
import { DB } from "@src/db";
import { resetDB } from "@src/tests/helpers/resetDB";

afterAll(async () => {
  await resetDB();
  await DB.close();
});

beforeEach(async () => {
  await resetDB();
});

describe("GET /", () => {
  it("It should respond with a 200 status code", async () => {
    const app = await supertest(await App.initApp());
    await app.get("/").expect(200);
  });
});
