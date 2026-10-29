import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { salesforceOAuth } from "../../connections";
import { DEFAULT_SF_VERSION } from "../../constants";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { validateConnection } from "./validateConnection";

const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";
const BASE_PATH = `/services/data/v${DEFAULT_SF_VERSION}`;

const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);

const identityUrl = new URL(getCurrentUserExamplePayload.data.id);

describe("validateConnection", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());

  test("returns true when the identity lookup succeeds", async () => {
    const base = nock(INSTANCE_URL)
      .get(BASE_PATH)
      .reply(200, { identity: getCurrentUserExamplePayload.data.id });
    const identity = nock(identityUrl.origin)
      .get(identityUrl.pathname)
      .query({ format: "json", oauth_token: ACCESS_TOKEN })
      .reply(200, getCurrentUserExamplePayload.data);

    const { result } = await invoke(validateConnection, {
      connection,
      version: DEFAULT_SF_VERSION,
    });

    expect(base.isDone()).toBe(true);
    expect(identity.isDone()).toBe(true);
    expect(result.data).toStrictEqual(true);
  });

  test("returns false when Salesforce rejects the token with 401", async () => {
    const base = nock(INSTANCE_URL)
      .get(BASE_PATH)
      .reply(401, [
        {
          message: "Session expired or invalid",
          errorCode: "INVALID_SESSION_ID",
        },
      ]);

    const { result } = await invoke(validateConnection, {
      connection,
      version: DEFAULT_SF_VERSION,
    });

    expect(base.isDone()).toBe(true);
    expect(result.data).toStrictEqual(false);
  });
});
