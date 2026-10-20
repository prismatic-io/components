import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../constants";
import {
  createScanPunchExamplePayload,
  getClockingTransactionExamplePayload,
  getTimeCardsExamplePayload,
  getWorkerExamplePayload,
  getWorkersMetadataExamplePayload,
  listWorkersExamplePayload,
  modifyTimeEntriesExamplePayload,
} from "../../examplePayloads";
import { createScanPunch } from "./createScanPunch";
import { getClockingTransaction } from "./getClockingTransaction";
import { getTimeCards } from "./getTimeCards";
import { getWorker } from "./getWorker";
import { getWorkersMetadata } from "./getWorkersMetadata";
import { listWorkers } from "./listWorkers";
import { modifyTimeEntries } from "./modifyTimeEntries";
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
describe("createScanPunch", () => {
  test("happy path posts the punch and returns the response", async () => {
    api()
      .post("/events/time/v1/data-collection-entries.process", (body) => {
        const entry =
          body.events[0].data.transform.dataCollectionEntries[0]
            .workerDataCollectionEntries[0];
        return entry.badgeID === "1234" && entry.actionCode.codeValue === "IN";
      })
      .reply(200, createScanPunchExamplePayload.data);
    const { result } = await invoke(
      createScanPunch,
      { connection, badgeID: "1234", clockingType: "IN" },
      context(),
    );
    expect(result).toEqual(createScanPunchExamplePayload);
    expect(nock.isDone()).toBe(true);
  });
  test("error path rejects", async () => {
    api()
      .post("/events/time/v1/data-collection-entries.process")
      .reply(400, { error: "bad" });
    await expect(
      invoke(
        createScanPunch,
        { connection, badgeID: "1234", clockingType: "IN" },
        context(),
      ),
    ).rejects.toThrow();
  });
});
describe("getClockingTransaction", () => {
  test("happy path returns the transaction", async () => {
    api()
      .get("/events/time/v1/data-collection-entries.process/evt-1")
      .reply(200, getClockingTransactionExamplePayload.data);
    const { result } = await invoke(
      getClockingTransaction,
      { connection, eventID: "evt-1" },
      context(),
    );
    expect(result).toEqual(getClockingTransactionExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get("/events/time/v1/data-collection-entries.process/evt-1")
      .reply(404, { error: "not found" });
    await expect(
      invoke(
        getClockingTransaction,
        { connection, eventID: "evt-1" },
        context(),
      ),
    ).rejects.toThrow();
  });
});
describe("getTimeCards", () => {
  const params = {
    connection,
    aoid: AOID,
    $filter: "timeCards/timePeriod/startDate eq '2020-12-28'",
    $expand: "dayEntries",
    pagination: { $skip: 0, $top: 10 },
  };
  test("happy path forwards pagination and returns time cards", async () => {
    api()
      .get(`/time/v2/workers/${AOID}/team-time-cards`)
      .query({
        $filter: params.$filter,
        $expand: "dayEntries",
        $skip: "0",
        $top: "10",
      })
      .reply(200, getTimeCardsExamplePayload.data);
    const { result } = await invoke(getTimeCards, params, context());
    expect(result).toEqual(getTimeCardsExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get(`/time/v2/workers/${AOID}/team-time-cards`)
      .query(true)
      .reply(500, { error: "boom" });
    await expect(invoke(getTimeCards, params, context())).rejects.toThrow();
  });
});
describe("getWorker", () => {
  test("happy path returns the worker", async () => {
    api()
      .get(`/hr/v2/workers/${AOID}`)
      .query({ $select: "workers/person" })
      .reply(200, getWorkerExamplePayload.data);
    const { result } = await invoke(
      getWorker,
      { connection, aoid: AOID, $select: "workers/person" },
      context(),
    );
    expect(result).toEqual(getWorkerExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get(`/hr/v2/workers/${AOID}`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(
      invoke(getWorker, { connection, aoid: AOID, $select: "" }, context()),
    ).rejects.toThrow();
  });
});
describe("getWorkersMetadata", () => {
  test("happy path returns the metadata", async () => {
    api()
      .get("/hr/v2/workers/meta")
      .query({ $filter: "x eq 'y'" })
      .reply(200, getWorkersMetadataExamplePayload.data);
    const { result } = await invoke(
      getWorkersMetadata,
      { connection, $filter: "x eq 'y'" },
      context(),
    );
    expect(result).toEqual(getWorkersMetadataExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get("/hr/v2/workers/meta")
      .query(true)
      .reply(403, { error: "forbidden" });
    await expect(
      invoke(getWorkersMetadata, { connection, $filter: "" }, context()),
    ).rejects.toThrow();
  });
});
describe("listWorkers", () => {
  const params = {
    connection,
    fetchAll: false,
    $count: "false",
    $filter: "",
    $select: "",
    queryParams: {},
    pagination: { $skip: 5, $top: 10 },
  };
  test("happy path returns one page wrapped in workers/meta/confirmMessage", async () => {
    api()
      .get("/hr/v2/workers")
      .query({
        count: "false",
        $filter: "",
        $select: "",
        $skip: "5",
        $top: "10",
      })
      .reply(200, listWorkersExamplePayload.data);
    const { result } = await invoke(listWorkers, params, context());
    expect(result).toEqual(listWorkersExamplePayload);
  });
  test("error path rejects", async () => {
    api().get("/hr/v2/workers").query(true).reply(500, { error: "boom" });
    await expect(invoke(listWorkers, params, context())).rejects.toThrow();
  });
});
describe("modifyTimeEntries", () => {
  const events = [{ data: { eventContext: {}, transform: {} } }];
  test("happy path posts the events and returns the response", async () => {
    api()
      .post("/events/time/v2/time-entries.modify", { events })
      .reply(200, modifyTimeEntriesExamplePayload.data);
    const { result } = await invoke(
      modifyTimeEntries,
      { connection, events },
      context(),
    );
    expect(result).toEqual(modifyTimeEntriesExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .post("/events/time/v2/time-entries.modify")
      .reply(422, { error: "invalid" });
    await expect(
      invoke(modifyTimeEntries, { connection, events }, context()),
    ).rejects.toThrow();
  });
});
