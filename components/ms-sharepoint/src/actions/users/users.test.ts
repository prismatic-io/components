import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import {
  getCurrentUserExamplePayload,
  listSharedDocumentsExamplePayload,
} from "../../examplePayloads";
import { getCurrentUser } from "./getCurrentUser";
import { listSharedDocuments } from "./listSharedDocuments";

const GRAPH = "https://graph.microsoft.com";
const connection = createConnection(
  oauth,
  {},
  { access_token: "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9" },
);
const unauthorized = {
  error: { code: "InvalidAuthenticationToken", message: "Access token has expired." },
};
const forbidden = {
  error: { code: "Authorization_RequestDenied", message: "Insufficient privileges." },
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("getCurrentUser", () => {
  test("returns the signed-in user", async () => {
    nock(GRAPH).get("/v1.0/me").reply(200, getCurrentUserExamplePayload.data);

    const { result } = await invoke(getCurrentUser, { connection });

    expect(result).toEqual(getCurrentUserExamplePayload);
  });

  test("rejects an expired token", async () => {
    nock(GRAPH).get("/v1.0/me").reply(401, unauthorized);

    await expect(invoke(getCurrentUser, { connection })).rejects.toThrow(
      "Request failed with status code 401",
    );
  });
});

describe("listSharedDocuments", () => {
  test("returns the documents shared with the user", async () => {
    nock(GRAPH).get("/v1.0/me/insights/shared").reply(200, listSharedDocumentsExamplePayload.data);

    const { result } = await invoke(listSharedDocuments, { connection });

    expect(result).toEqual(listSharedDocumentsExamplePayload);
  });

  test("rejects when the app lacks the insights permission", async () => {
    nock(GRAPH).get("/v1.0/me/insights/shared").reply(403, forbidden);

    await expect(invoke(listSharedDocuments, { connection })).rejects.toThrow(
      "Request failed with status code 403",
    );
  });
});
