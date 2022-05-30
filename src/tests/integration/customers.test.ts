import supertest from "supertest";
import { DB } from "@src/db";
import { resetDB } from "@src/tests/helpers/resetDB";
import { App } from "@src/app";

afterAll(async () => {
  await resetDB();
  await DB.close();
});

beforeEach(async () => {
  await resetDB();
});

describe("GET /customers", () => {
  it("returns a list of existing customers", async () => {
    const customerOne = await DB.Customers.create({
      givenName: "Agent",
      familyName: "Smith",
      email: "evil@matrix.com",
    });

    const customerTwo = await DB.Customers.create({
      givenName: "Thomas",
      familyName: "Anderson",
      email: "good@matrix.com",
    });

    const app = supertest(await App.initApp());
    await app
      .get("/customers")
      .expect(200)
      .then((response) => {
        expect(response.body.data.length).toEqual(2);

        expect(response.body.data[0].id).toBe(customerOne.getDataValue("id"));
        expect(response.body.data[1].id).toBe(customerTwo.getDataValue("id"));
        expect(response.body.success).toBe(true);
      });
  });
});
