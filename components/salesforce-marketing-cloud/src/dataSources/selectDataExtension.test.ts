import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listDataExtensionsExamplePayload } from "../examplePayloads";
import { selectDataExtension } from "./selectDataExtension";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const DATA_EXTENSIONS_PATH = "/data/v1/customobjects";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectDataExtension", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed data extensions to label and key elements", async () => {
    const body = {
      ...listDataExtensionsExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL)
      .get(DATA_EXTENSIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, body);
    const { result } = await invokeDataSource(selectDataExtension, {
      connection,
    });
    expect(result).toEqual([
      {
        label: "facb9d48d7c44486a7b0715ef0b2f7a2",
        key: "36e73253-16a9-ee11-ac6c-0abc489251b9",
      },
    ]);
  });
  test("returns an empty array when the API reports no data extensions", async () => {
    nock(BASE_URL)
      .get(DATA_EXTENSIONS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const { result } = await invokeDataSource(selectDataExtension, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
