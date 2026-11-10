import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import {
  listSupportedLanguagesExamplePayload,
  listSupportedTimezonesExamplePayload,
} from "../../examplePayloads";
import {
  CLIENT_CREDENTIALS_USER_ID,
  clientCredentialsConnection,
  delegatedConnection,
  GRAPH_HOST,
} from "../../testHelpers";
import { listSupportedLanguages } from "./listSupportedLanguages";
import { listSupportedTimezones } from "./listSupportedTimezones";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe.each([
  [
    "listSupportedTimezones",
    listSupportedTimezones,
    "supportedTimeZones",
    listSupportedTimezonesExamplePayload,
  ],
  [
    "listSupportedLanguages",
    listSupportedLanguages,
    "supportedLanguages",
    listSupportedLanguagesExamplePayload,
  ],
] as const)("%s", (_name, action, path, payload) => {
  test("calls /me for a delegated connection", async () => {
    const scope = nock(GRAPH_HOST).get(`/v1.0/me/outlook/${path}`).reply(200, payload.data);

    const { result } = await invoke(action, { connection: delegatedConnection() });

    expect(result).toEqual(payload);
    expect(scope.isDone()).toBe(true);
  });

  test("calls /users/{userId} for a client-credentials connection", async () => {
    const scope = nock(GRAPH_HOST)
      .get(`/v1.0/users/${CLIENT_CREDENTIALS_USER_ID}/outlook/${path}`)
      .reply(200, payload.data);

    await invoke(action, { connection: clientCredentialsConnection() });

    expect(scope.isDone()).toBe(true);
  });
});
