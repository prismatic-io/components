import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  closeDisputeExamplePayload,
  getDisputeExamplePayload,
  listDisputesExamplePayload,
  updateDisputeExamplePayload,
} from "../../examplePayloads/disputes";
import { closeDispute } from "./closeDispute";
import { getDispute } from "./getDispute";
import { listDisputes } from "./listDisputes";
import { updateDispute } from "./updateDispute";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const DISPUTE_ID = "dp_1MtJUT2eZvKYlo2CNaw2HvEv";
afterEach(() => nock.cleanAll());
describe("getDispute", () => {
  it("returns the dispute for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/disputes/${DISPUTE_ID}`)
      .reply(200, getDisputeExamplePayload.data);
    const { result } = await invoke(
      getDispute,
      params({ disputeId: DISPUTE_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getDisputeExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/disputes/dp_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such dispute" },
      });
    await expect(
      invoke(
        getDispute,
        params({ disputeId: "dp_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such dispute");
  });
});
describe("listDisputes", () => {
  it("returns the dispute list", async () => {
    const scope = nock(BASE)
      .get("/v1/disputes")
      .query({ limit: "10" })
      .reply(200, listDisputesExamplePayload.data);
    const { result } = await invoke(
      listDisputes,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listDisputesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/disputes")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "No such charge" },
      });
    await expect(
      invoke(
        listDisputes,
        params({
          chargeId: "ch_missing",
          pagination: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such charge");
  });
});
describe("updateDispute", () => {
  it("updates the dispute and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/disputes/${DISPUTE_ID}`)
      .reply(200, updateDisputeExamplePayload.data);
    const { result } = await invoke(
      updateDispute,
      params({
        disputeId: DISPUTE_ID,
        evidence: { customer_name: "Jenny Rosen" },
        metadata: {},
        submit: false,
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateDisputeExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/disputes/dp_missing")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "This dispute is already closed",
        },
      });
    await expect(
      invoke(
        updateDispute,
        params({
          disputeId: "dp_missing",
          metadata: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("already closed");
  });
});
describe("closeDispute", () => {
  it("closes the dispute and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/disputes/${DISPUTE_ID}/close`)
      .reply(200, closeDisputeExamplePayload.data);
    const { result } = await invoke(
      closeDispute,
      params({ disputeId: DISPUTE_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(closeDisputeExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/disputes/dp_missing/close")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "This dispute is already closed",
        },
      });
    await expect(
      invoke(
        closeDispute,
        params({ disputeId: "dp_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("already closed");
  });
});
