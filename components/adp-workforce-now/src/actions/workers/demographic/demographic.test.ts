import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../../constants";
import {
  getWorkerDemographicsExamplePayload,
  listWorkersDemographicsExamplePayload,
} from "../../../examplePayloads";
import { getWorkerDemographics } from "./getWorkerDemographics";
import { listWorkersDemographics } from "./listWorkersDemographics";

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

describe("getWorkerDemographics", () => {
  test("happy path returns the worker demographics", async () => {
    api()
      .get(`/hr/v2/worker-demographics/${AOID}`)
      .query({ $select: "workers/person" })
      .reply(200, getWorkerDemographicsExamplePayload.data);
    const { result } = await invoke(
      getWorkerDemographics,
      { connection, aoid: AOID, $select: "workers/person" },
      context(),
    );
    expect(result).toEqual(getWorkerDemographicsExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .get(`/hr/v2/worker-demographics/${AOID}`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(
      invoke(
        getWorkerDemographics,
        { connection, aoid: AOID, $select: "" },
        context(),
      ),
    ).rejects.toThrow();
  });
});

describe("listWorkersDemographics", () => {
  const params = {
    connection,
    fetchAll: false,
    $filter: "",
    $select: "",
    queryParams: {},
    pagination: { $skip: 5, $top: 10 },
  };
  const fixture = listWorkersDemographicsExamplePayload.data as {
    workers: unknown[];
  };

  test("happy path returns one page wrapped in workers/meta/confirmMessage", async () => {
    api()
      .get("/hr/v2/worker-demographics")
      .query({ $filter: "", $select: "", $skip: "5", $top: "10" })
      .reply(200, fixture);
    const { result } = await invoke(listWorkersDemographics, params, context());
    expect(result).toEqual(listWorkersDemographicsExamplePayload);
  });

  test("error path rejects", async () => {
    api()
      .get("/hr/v2/worker-demographics")
      .query(true)
      .reply(500, { error: "boom" });
    await expect(
      invoke(listWorkersDemographics, params, context()),
    ).rejects.toThrow();
  });
});
