import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  createCustomerExamplePayload,
  deleteCustomerExamplePayload,
  getCustomerExamplePayload,
  listCustomersExamplePayload,
  updateCustomerExamplePayload,
} from "../../examplePayloads/customers";
import { createCustomer } from "./createCustomer";
import { deleteCustomer } from "./deleteCustomer";
import { getCustomer } from "./getCustomer";
import { listCustomers } from "./listCustomers";
import { updateCustomer } from "./updateCustomer";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const CUSTOMER_ID = "cus_NffrFeUfNV2Hib";
const contactInfo = {
  customerName: "Jenny Rosen",
  customerEmail: "jenny.rosen@example.com",
  customerPhone: undefined,
};
const address = {
  customerAddress1: "354 Oyster Point Blvd",
  customerAddress2: undefined,
  customerCity: "South San Francisco",
  customerCountry: "US",
  customerPostal: "94080",
  customerState: "CA",
};
afterEach(() => nock.cleanAll());
describe("createCustomer", () => {
  it("creates the customer and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/customers")
      .reply(200, createCustomerExamplePayload.data);
    const { result } = await invoke(
      createCustomer,
      params({
        contactInfo,
        address,
        customerMetadata: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/customers")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Invalid email address",
        },
      });
    await expect(
      invoke(
        createCustomer,
        params({
          contactInfo: { ...contactInfo, customerEmail: "not-an-email" },
          address,
          customerMetadata: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("Invalid email address");
  });
});
describe("getCustomer", () => {
  it("returns the customer for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/customers/${CUSTOMER_ID}`)
      .reply(200, getCustomerExamplePayload.data);
    const { result } = await invoke(
      getCustomer,
      params({ customerId: CUSTOMER_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/customers/cus_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        getCustomer,
        params({ customerId: "cus_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("listCustomers", () => {
  it("returns the customer list", async () => {
    const scope = nock(BASE)
      .get("/v1/customers")
      .query({ limit: "10" })
      .reply(200, listCustomersExamplePayload.data);
    const { result } = await invoke(
      listCustomers,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listCustomersExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/customers")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(listCustomers, params({ pagination: {}, stripeConnection: conn })),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("updateCustomer", () => {
  it("updates the customer and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/customers/${CUSTOMER_ID}`)
      .reply(200, updateCustomerExamplePayload.data);
    const { result } = await invoke(
      updateCustomer,
      params({
        customerId: CUSTOMER_ID,
        contactInfo,
        address,
        customerMetadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/customers/cus_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        updateCustomer,
        params({
          customerId: "cus_missing",
          contactInfo,
          address,
          customerMetadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("deleteCustomer", () => {
  it("deletes the customer and returns the deletion confirmation", async () => {
    const scope = nock(BASE)
      .delete(`/v1/customers/${CUSTOMER_ID}`)
      .reply(200, deleteCustomerExamplePayload.data);
    const { result } = await invoke(
      deleteCustomer,
      params({ customerId: CUSTOMER_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(deleteCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .delete("/v1/customers/cus_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        deleteCustomer,
        params({ customerId: "cus_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
