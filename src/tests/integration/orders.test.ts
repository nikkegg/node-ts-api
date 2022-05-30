import supertest from "supertest";
import { DB } from "@src/db";
import { resetDB } from "@src/tests/helpers/resetDB";
import { App } from "@src/app";
import { CustomerInstance } from "@src/models/customer.model";
import { OrderInstance } from "@src/models/order.model";

afterAll(async () => {
  await resetDB();
  await DB.close();
});

beforeEach(async () => {
  await resetDB();
});

describe("GET /customers/:customerId/orders", () => {
  it("returns a list of orders for a given customer", async () => {
    const customer: CustomerInstance = await DB.Customers.create({
      givenName: "Agent",
      familyName: "Smith",
      email: "evil@matrix.com",
    });

    const customerId = customer.getDataValue("id");

    const order: OrderInstance = await DB.Orders.create({
      customerId,
    });
    const app = supertest(await App.initApp());
    await app
      .get(`/customers/${customerId}/orders`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.length).toEqual(1);

        expect(response.body.data[0].id).toBe(order.getDataValue("id"));
        expect(response.body.success).toBe(true);
      });
  });
});

describe("GET /customers/:customerId/orders/:orderId", () => {
  it("returns an order for a given customer", async () => {
    const customer: CustomerInstance = await DB.Customers.create({
      givenName: "Agent",
      familyName: "Smith",
      email: "evil@matrix.com",
    });

    const customerId = customer.getDataValue("id");
    const order: OrderInstance = await DB.Orders.create({
      customerId,
      date: "30-05-2022",
    });

    const orderId = order.getDataValue("id");

    const app = supertest(await App.initApp());
    await app
      .get(`/customers/${customerId}/orders/${orderId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.id).toBe(orderId);
        expect(response.body.data.date).toBe(order.getDataValue("date"));
        expect(response.body.success).toBe(true);
      });
  });

  describe("POST /orders", () => {
    it("creates and order for a customer", async () => {
      const customer: CustomerInstance = await DB.Customers.create({
        givenName: "Agent",
        familyName: "Smith",
        email: "evil@matrix.com",
      });

      const customerId = customer.getDataValue("id");
      const payload = {
        customerId,
      };

      const app = supertest(await App.initApp());
      await app
        .post(`/orders`)
        .send(payload)
        .expect(201)
        .then(async (response) => {
          expect(response.body.data.customerId).toBe(payload.customerId);
          expect(response.body.success).toBe(true);
          const order: OrderInstance | null = await DB.Orders.findByPk(
            response.body.id,
          );

          if (order) {
            expect(response.body.data.id).toBe(
              order.getDataValue("customerId"),
            );
          }
        });
    });
  });
});

describe("POST /orders", () => {
  it("creates and order for a customer", async () => {
    const customer: CustomerInstance = await DB.Customers.create({
      givenName: "Agent",
      familyName: "Smith",
      email: "evil@matrix.com",
    });

    const customerId = customer.getDataValue("id");
    const payload = {
      customerId,
    };

    const app = supertest(await App.initApp());
    await app
      .post(`/orders`)
      .send(payload)
      .expect(201)
      .then(async (response) => {
        expect(response.body.data.customerId).toBe(payload.customerId);
        expect(response.body.success).toBe(true);
        const order: OrderInstance | null = await DB.Orders.findByPk(
          response.body.id,
        );

        if (order) {
          expect(response.body.data.id).toBe(order.getDataValue("customerId"));
        }
      });
  });
});

it("returns 404 if param is not uuid", async () => {
  const app = supertest(await App.initApp());
  await app.get(`/customers/not-an-uuid/orders/als-not-and-uuid`).expect(404);
});
