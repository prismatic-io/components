import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../constants";
import {
  getPaymentDistributionsExamplePayload,
  getWorkerPaymentDistributionsMetaExamplePayload,
  updateWorkerPayDistributionExamplePayload,
} from "../../examplePayloads";
import { getPaymentDistributions } from "./getPaymentDistributions";
import { getWorkerPaymentDistributionsMeta } from "./getWorkerPaymentDistributionsMeta";
import { updateWorkerPayDistribution } from "./updateWorkerPayDistribution";
const BASE = "https://api.adp.com";
const TOKEN = "test-token";
const AOID = "G3R47DSRZK5TRCFJ";
const connection = createConnection(adpOauth2, {
  endpoint: API_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  clientId: "client-id",
  clientSecret: "client-secret",
  sslCert: "-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----",
  sslKey: "-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----",
});
const context = () => ({
  executionState: {
    [`ADP - ${connection.configVarKey}`]: {
      accessToken: TOKEN,
      expiresDate: Date.now() / 1000 + 3600,
    },
  },
});
const api = () =>
  nock(BASE, { reqheaders: { authorization: `Bearer ${TOKEN}` } });
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("getPaymentDistributions", () => {
  test("happy path returns the pay distributions", async () => {
    api()
      .get(`/payroll/v2/workers/${AOID}/pay-distributions`)
      .query({ $select: "payDistributions", $filter: "x eq 'y'" })
      .reply(200, getPaymentDistributionsExamplePayload.data);
    const { result } = await invoke(
      getPaymentDistributions,
      {
        connection,
        aoid: AOID,
        $select: "payDistributions",
        $filter: "x eq 'y'",
      },
      context(),
    );
    expect(result).toEqual(getPaymentDistributionsExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get(`/payroll/v2/workers/${AOID}/pay-distributions`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(
      invoke(
        getPaymentDistributions,
        { connection, aoid: AOID, $select: "", $filter: "" },
        context(),
      ),
    ).rejects.toThrow();
  });
});
describe("getWorkerPaymentDistributionsMeta", () => {
  test("happy path returns the metadata", async () => {
    api()
      .get("/events/payroll/v1/worker.pay-distribution.change/meta")
      .query({ $select: "meta" })
      .reply(200, getWorkerPaymentDistributionsMetaExamplePayload.data);
    const { result } = await invoke(
      getWorkerPaymentDistributionsMeta,
      { connection, $select: "meta" },
      context(),
    );
    expect(result).toEqual(getWorkerPaymentDistributionsMetaExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get("/events/payroll/v1/worker.pay-distribution.change/meta")
      .query(true)
      .reply(500, { error: "boom" });
    await expect(
      invoke(
        getWorkerPaymentDistributionsMeta,
        { connection, $select: "" },
        context(),
      ),
    ).rejects.toThrow();
  });
});
describe("updateWorkerPayDistribution", () => {
  const paymentDistribution = {
    payDistribution: { distributionInstructions: [] },
  };
  const params = {
    connection,
    aoid: AOID,
    workAssignmentId: "WA-1",
    paymentDistribution,
  };
  test("happy path posts the change event and returns the response", async () => {
    api()
      .post("/events/payroll/v1/worker.pay-distribution.change", {
        events: [
          {
            data: {
              eventContext: {
                worker: { associateOID: AOID },
                payDistribution: { itemID: "WA-1" },
              },
              transform: paymentDistribution,
            },
          },
        ],
      })
      .reply(200, updateWorkerPayDistributionExamplePayload.data);
    const { result } = await invoke(
      updateWorkerPayDistribution,
      params,
      context(),
    );
    expect(result).toEqual(updateWorkerPayDistributionExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .post("/events/payroll/v1/worker.pay-distribution.change")
      .reply(422, { error: "invalid" });
    await expect(
      invoke(updateWorkerPayDistribution, params, context()),
    ).rejects.toThrow();
  });
});
