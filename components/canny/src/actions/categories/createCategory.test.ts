import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createCategoryExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { createCategory } from "./createCategory";
const PATH = `${V1}/categories/create`;
const params = {
  connection: testConnection,
  boardIdRequired: "553c3ef8b8cdcd1501ba1234",
  categoryName: "UI Improvements",
  subscribeAdmins: true,
  parentCategoryId: undefined,
};
describe("createCategory", () => {
  afterEach(() => nock.cleanAll());
  test("creates a category and omits the unset parent ID", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, createCategoryExamplePayload.data);
    const { result } = await invoke(createCategory, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      name: "UI Improvements",
      subscribeAdmins: true,
    });
    expect(result.data).toStrictEqual(createCategoryExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid board" });
    await expect(invoke(createCategory, params)).rejects.toThrow();
  });
});
