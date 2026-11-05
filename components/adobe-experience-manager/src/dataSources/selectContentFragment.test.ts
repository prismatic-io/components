import { createConnection, invokeDataSource } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import { MAX_DATA_SOURCE_ITEMS, MAX_PAGE_LIMIT } from "../constants";
import {
  listContentFragmentsExamplePayload,
  selectContentFragmentExamplePayload,
} from "../examplePayloads";
import { selectContentFragment } from "./selectContentFragment";

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
const [fragment] = listContentFragmentsExamplePayload.data.items;

describe("selectContentFragment", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("returns each content fragment as a key/label element", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .query({ limit: "50" })
      .reply(200, { items: [fragment] });
    const result = await invokeDataSource(selectContentFragment, { connection, path: undefined });
    expect(result).toEqual(selectContentFragmentExamplePayload);
  });

  test("sends Path, falls back to the path label, and sorts by label", async () => {
    nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .query({ path: "/content/dam/wknd", limit: "50" })
      .reply(200, {
        items: [
          { ...fragment, id: "b", title: "Zebra", path: "/content/dam/wknd/zebra" },
          { ...fragment, id: "a", title: "", path: "/content/dam/wknd/alpha" },
        ],
      });
    const result = await invokeDataSource(selectContentFragment, {
      connection,
      path: "/content/dam/wknd",
    });
    expect(result).toEqual({
      result: [
        { key: "a", label: "/content/dam/wknd/alpha" },
        { key: "b", label: "Zebra (/content/dam/wknd/zebra)" },
      ],
    });
  });

  test("stops following the cursor once the item cap is reached", async () => {
    const pagesToCap = MAX_DATA_SOURCE_ITEMS / MAX_PAGE_LIMIT;
    let page = 0;
    const scope = nock(BASE)
      .get("/adobe/sites/cf/fragments")
      .query(true)
      .times(pagesToCap)
      .reply(200, () => {
        page++;
        return {
          items: Array.from({ length: MAX_PAGE_LIMIT }, (_, i) => ({
            ...fragment,
            id: `fragment-${page}-${i}`,
          })),
          cursor: `cursor-${page}`,
        };
      });
    const { result } = await invokeDataSource(selectContentFragment, {
      connection,
      path: undefined,
    });
    expect(result).toHaveLength(MAX_DATA_SOURCE_ITEMS);
    expect(scope.isDone()).toBe(true);
    expect(page).toBe(pagesToCap);
  });
});
