import supertest from "supertest";
import { DB } from "@src/db";
import { resetDB } from "@src/tests/helpers/resetDB";
import { App } from "@src/app";
import { CustomerInstance } from "@src/models/customer.model";

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

describe("GET /customers/:id", () => {
  it("returns a customer if customer exists", async () => {
    const customer: CustomerInstance = await DB.Customers.create({
      givenName: "Agent",
      familyName: "Smith",
      email: "evil@matrix.com",
    });

    const id = customer.getDataValue("id");
    const email = customer.getDataValue("email");
    const givenName = customer.getDataValue("givenName");
    const familyName = customer.getDataValue("familyName");

    const app = supertest(await App.initApp());
    await app
      .get(`/customers/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.id).toBe(id);
        expect(response.body.data.email).toBe(email);
        expect(response.body.data.givenName).toBe(givenName);
        expect(response.body.data.familyName).toBe(familyName);
        expect(response.body.success).toBe(true);
      });
  });

  it("throws an exception if id is null", async () => {
    const id = null;

    const app = supertest(await App.initApp());
    await app.get(`/customers/${id}`).expect(404);
  });

  it("returns 404 if param is not uuid", async () => {
    const app = supertest(await App.initApp());
    await app.get(`/customers/not-an-id`).expect(404);
  });
});
