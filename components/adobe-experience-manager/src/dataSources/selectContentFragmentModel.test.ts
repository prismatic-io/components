import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import {
  listContentFragmentModelsExamplePayload,
  selectContentFragmentModelExamplePayload,
} from "../examplePayloads";
import { selectContentFragmentModel } from "./selectContentFragmentModel";

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);

describe("selectContentFragmentModel", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns each model as a key/label element", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/models")
      .query({ limit: "50" })
      .reply(200, listContentFragmentModelsExamplePayload.data);
    const result = await invokeDataSource(selectContentFragmentModel, {
      connection,
    });
    expect(result).toEqual(selectContentFragmentModelExamplePayload);
  });

  test("returns an empty list when there are no models", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/models")
      .query({ limit: "50" })
      .reply(200, { items: [] });
    const result = await invokeDataSource(selectContentFragmentModel, {
      connection,
    });
    expect(result).toEqual({ result: [] });
  });
});
