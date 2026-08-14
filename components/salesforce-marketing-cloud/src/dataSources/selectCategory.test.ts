import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listCategoriesExamplePayload } from "../examplePayloads";
import { selectCategory } from "./selectCategory";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CATEGORIES_PATH = "/asset/v1/content/categories";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectCategory", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed categories to label and key elements", async () => {
    const body = {
      ...listCategoriesExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL).get(CATEGORIES_PATH).query(FETCH_ALL_QUERY).reply(200, body);
    const { result } = await invokeDataSource(selectCategory, { connection });
    expect(result).toEqual([{ label: "Content Builder", key: "54975" }]);
  });
  test("returns an empty array when the API reports no categories", async () => {
    nock(BASE_URL)
      .get(CATEGORIES_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const { result } = await invokeDataSource(selectCategory, { connection });
    expect(result).toEqual([]);
  });
});
