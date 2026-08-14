import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CATEGORIES_PATH } from "../../constants";
import { updateCategoryExamplePayload } from "../../examplePayloads";
import { updateCategory } from "./updateCategory";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CATEGORY_ID = 54975;
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("updateCategory", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("sends both changed fields and returns the updated category", async () => {
    const scope = nock(BASE_URL)
      .put(`${CATEGORIES_PATH}/${CATEGORY_ID}`, {
        name: "Renamed Category",
        parentId: 12345,
      })
      .reply(200, updateCategoryExamplePayload.data);
    const { result } = await invoke(updateCategory, {
      connection,
      categoryId: CATEGORY_ID,
      categoryName: "Renamed Category",
      parentCategoryId: 12345,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(updateCategoryExamplePayload.data);
  });
  test("omits unset fields and surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .put(`${CATEGORIES_PATH}/${CATEGORY_ID}`, { name: "Renamed Category" })
      .reply(400, { message: "Bad Request" });
    await expect(
      invoke(updateCategory, {
        connection,
        categoryId: CATEGORY_ID,
        categoryName: "Renamed Category",
        parentCategoryId: undefined,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
