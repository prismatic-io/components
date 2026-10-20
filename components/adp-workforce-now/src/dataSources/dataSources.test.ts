import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../constants";
import {
  listPersonalContactsExamplePayload,
  listWorkersExamplePayload,
} from "../examplePayloads";
import { selectPersonalContact } from "./selectPersonalContact";
import { selectWorker } from "./selectWorker";
const BASE = "https://api.adp.com";
const TOKEN_HOST = "https://accounts.adp.com";
const TOKEN = "ds-token";
const AOID = "G3R47DSRZK5TRCFJ";
const connection = createConnection(adpOauth2, {
  endpoint: API_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  clientId: "client-id",
  clientSecret: "client-secret",
  sslCert: "-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----",
  sslKey: "-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----",
});
const mockToken = () =>
  nock(TOKEN_HOST)
    .post("/auth/oauth/v2/token")
    .query({
      grant_type: "client_credentials",
      client_id: "client-id",
      client_secret: "client-secret",
    })
    .reply(200, { access_token: TOKEN, expires_in: 3600 });
const api = () =>
  nock(BASE, { reqheaders: { authorization: `Bearer ${TOKEN}` } });
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("selectWorker", () => {
  const workers = listWorkersExamplePayload.data.workers;
  const params = { connection, $filter: "", $select: "" };
  test("maps workers to label/key elements", async () => {
    mockToken();
    api()
      .get("/hr/v2/workers")
      .query({ count: "true" })
      .reply(200, listWorkersExamplePayload.data);
    api()
      .get("/hr/v2/workers")
      .query((q) => q.$skip === "0" && q.$top === "100")
      .reply(200, listWorkersExamplePayload.data);
    const { result } = await invokeDataSource(selectWorker, params);
    expect(result).toEqual(
      workers.map((worker) => ({
        label: `${worker.person.legalName.formattedName} (${worker.workerID.idValue})`,
        key: worker.associateOID,
      })),
    );
    expect(nock.isDone()).toBe(true);
  });
  test("forwards the filter on every page request", async () => {
    const $filter = "workers/workerStatus/statusCode/codeValue eq 'Active'";
    mockToken();
    api()
      .get("/hr/v2/workers")
      .query({ count: "true" })
      .reply(200, listWorkersExamplePayload.data);
    api()
      .get("/hr/v2/workers")
      .query((q) => q.$filter === $filter && q.$skip === "0")
      .reply(200, listWorkersExamplePayload.data);
    const { result } = await invokeDataSource(selectWorker, {
      ...params,
      $filter,
    });
    expect(result).toHaveLength(workers.length);
    expect(nock.isDone()).toBe(true);
  });
  test("returns an empty list when there are no workers", async () => {
    mockToken();
    api()
      .get("/hr/v2/workers")
      .query({ count: "true" })
      .reply(200, { workers: [], meta: { totalNumber: 0 } });
    const { result } = await invokeDataSource(selectWorker, params);
    expect(result).toEqual([]);
    expect(nock.isDone()).toBe(true);
  });
});
describe("selectPersonalContact", () => {
  const contacts = listPersonalContactsExamplePayload.data.personalContacts;
  const params = { connection, aoid: AOID, $select: "" };
  const PATH = `/hr/v2/associates/${AOID}/personal-contacts`;
  test("maps personal contacts to label/key elements", async () => {
    mockToken();
    api()
      .get(PATH)
      .query({ count: "true" })
      .reply(200, {
        ...listPersonalContactsExamplePayload.data,
        meta: { totalNumber: contacts.length },
      });
    api()
      .get(PATH)
      .query((q) => q.$skip === "0" && q.$top === "100")
      .reply(200, listPersonalContactsExamplePayload.data);
    const { result } = await invokeDataSource(selectPersonalContact, params);
    expect(result).toEqual(
      contacts.map((contact) => ({
        label: contact.personName.formattedName,
        key: contact.itemID,
      })),
    );
    expect(nock.isDone()).toBe(true);
  });
  test("returns an empty list when the worker has no contacts", async () => {
    mockToken();
    api()
      .get(PATH)
      .query({ count: "true" })
      .reply(200, { personalContacts: [], meta: { totalNumber: 0 } });
    const { result } = await invokeDataSource(selectPersonalContact, params);
    expect(result).toEqual([]);
    expect(nock.isDone()).toBe(true);
  });
});
