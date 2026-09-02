import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteCategoryExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { deleteCategory } from "./deleteCategory";
const PATH = `${V1}/categories/delete`;
const params = {
  connection: testConnection,
  categoryIdRequired: "553c3ef8b8cdcd1501ba12bb",
};
describe("deleteCategory", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a category", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, deleteCategoryExamplePayload.data);
    const { result } = await invoke(deleteCategory, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      categoryID: "553c3ef8b8cdcd1501ba12bb",
    });
    expect(result.data).toStrictEqual(deleteCategoryExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "category not found" });
    await expect(invoke(deleteCategory, params)).rejects.toThrow();
  });
});
