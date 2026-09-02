import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listCategoriesExamplePayload } from "../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../testHelpers";
import { selectCategory } from "./selectCategory";
const CATEGORIES_LIST = `${V1}/categories/list`;
describe("selectCategory", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key pairs for the selected board", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(CATEGORIES_LIST, matcher)
      .reply(200, listCategoriesExamplePayload.data);
    const { result } = await invokeDataSource(selectCategory, {
      connection: testConnection,
      boardId: "553c3ef8b8cdcd1501ba1234",
    });
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
      skip: 0,
      limit: 100,
    });
    expect(result).toStrictEqual([
      { label: "Example Category Name", key: "553c3ef8b8cdcd1501ba12bb" },
    ]);
  });
  test("returns an empty picklist when the board has no categories", async () => {
    nock(CANNY_HOST)
      .post(CATEGORIES_LIST)
      .reply(200, { categories: [], hasMore: false });
    const { result } = await invokeDataSource(selectCategory, {
      connection: testConnection,
      boardId: "553c3ef8b8cdcd1501ba1234",
    });
    expect(result).toStrictEqual([]);
  });
});
