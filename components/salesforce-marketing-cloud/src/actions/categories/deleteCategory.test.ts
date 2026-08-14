import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CATEGORIES_PATH } from "../../constants";
import { deleteCategoryExamplePayload } from "../../examplePayloads";
import { deleteCategory } from "./deleteCategory";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CATEGORY_ID = 54975;
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("deleteCategory", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("returns the plain-text body from a successful delete", async () => {
    const scope = nock(BASE_URL)
      .delete(`${CATEGORIES_PATH}/${CATEGORY_ID}`)
      .reply(200, "OK", { "Content-Type": "text/plain" });
    const { result } = await invoke(deleteCategory, {
      connection,
      categoryId: CATEGORY_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteCategoryExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .delete(`${CATEGORIES_PATH}/${CATEGORY_ID}`)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(deleteCategory, { connection, categoryId: CATEGORY_ID }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
