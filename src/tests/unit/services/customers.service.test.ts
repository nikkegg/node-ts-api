import supertest from "supertest";
import { customerService } from "@src/services/customers.service";
import { App } from "@src/app";
import { DB } from "@src/db/index";
import { CreateCustomerDto } from "@src/validators/createCustomer.validator";

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(async () => DB.close());

describe("customerService", () => {
  it("findCustomerById responds with customers data", async () => {
    customerService.findCustomerById = jest.fn().mockReturnValue({
      id: "ca48570d-6265-453a-b9da-ca9bc982bfee",
      email: "lemon@email.com",
      givenName: "A",
      familyName: "Citrus",
    });
    const app = supertest(await App.initApp());
    app
      .get("/customers/ca48570d-6265-453a-b9da-ca9bc982bfee")
      .expect(200)
      .then((response) => {
        expect(response.body.data.id).toBe(
          "ca48570d-6265-453a-b9da-ca9bc982bfee",
        );
      });
  });

  it("findAllCustomers responds with customers data", async () => {
    customerService.findAllCustomers = jest.fn().mockReturnValue([
      {
        id: "1",
        email: "lemon@email.com",
        givenName: "A",
        familyName: "Citrus",
      },
      {
        id: "2",
        email: "grapefruit@email.com",
        givenName: "B",
        familyName: "Citrus",
      },
      {
        id: "3",
        email: "orange@email.com",
        givenName: "C",
        familyName: "Citrus",
      },
    ]);
    const app = supertest(await App.initApp());
    await app
      .get("/customers")
      .expect(200)
      .then((response) => {
        expect(response.body.data).toHaveLength(3);
      });
  });

  it("createCustomer responds with customers data", async () => {
    const customerData: CreateCustomerDto = {
      email: "wtf@email.com",
      givenName: "Aaaa",
      familyName: "Citrus",
    };
    DB.Customers.findOne = jest.fn().mockReturnValue(null);
    customerService.createCustomer = jest.fn().mockReturnValue({
      id: "ca48570d-6265-453a-b9da-ca9bc982bfee",
      ...customerData,
    });
    const app = supertest(await App.initApp());
    app
      .post("/customers")
      .send(customerData)
      .expect(201)
      .then((response) => {
        expect(response.body.data.id).toBe(
          "ca48570d-6265-453a-b9da-ca9bc982bfee",
        );
      });
  });
});
