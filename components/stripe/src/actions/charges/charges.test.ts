import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  getChargeExamplePayload,
  listChargesExamplePayload,
  searchChargesExamplePayload,
  updateChargeExamplePayload,
} from "../../examplePayloads/charges";
import { getCharge } from "./getCharge";
import { listCharges } from "./listCharges";
import { searchCharges } from "./searchCharges";
import { updateCharge } from "./updateCharge";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const CHARGE_ID = "ch_3MmlLrLkdIwHu7ix0snN0B15";
afterEach(() => nock.cleanAll());
describe("getCharge", () => {
  it("returns the charge for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/charges/${CHARGE_ID}`)
      .reply(200, getChargeExamplePayload.data);
    const { result } = await invoke(
      getCharge,
      params({ chargeId: CHARGE_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getChargeExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/charges/ch_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such charge" },
      });
    await expect(
      invoke(
        getCharge,
        params({ chargeId: "ch_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such charge");
  });
});
describe("listCharges", () => {
  it("returns the charge list", async () => {
    const scope = nock(BASE)
      .get("/v1/charges")
      .query({ limit: "10" })
      .reply(200, listChargesExamplePayload.data);
    const { result } = await invoke(
      listCharges,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listChargesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/charges")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(
        listCharges,
        params({ pagination: { limit: 0 }, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("searchCharges", () => {
  it("returns the search result for the supplied query", async () => {
    const scope = nock(BASE)
      .get("/v1/charges/search")
      .query({
        query: "amount>999 AND metadata['order_id']:'6735'",
        limit: "10",
      })
      .reply(200, searchChargesExamplePayload.data);
    const { result } = await invoke(
      searchCharges,
      params({
        query: "amount>999 AND metadata['order_id']:'6735'",
        pagination: { limit: 10 },
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(searchChargesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/charges/search")
      .query(true)
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Invalid search query",
        },
      });
    await expect(
      invoke(
        searchCharges,
        params({ query: "bad query", pagination: {}, stripeConnection: conn }),
      ),
    ).rejects.toThrow("Invalid search query");
  });
});
describe("updateCharge", () => {
  it("updates the charge and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/charges/${CHARGE_ID}`)
      .reply(200, updateChargeExamplePayload.data);
    const { result } = await invoke(
      updateCharge,
      params({
        chargeId: CHARGE_ID,
        description: "Updated description",
        metadata: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateChargeExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/charges/ch_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such charge" },
      });
    await expect(
      invoke(
        updateCharge,
        params({
          chargeId: "ch_missing",
          metadata: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such charge");
  });
});
