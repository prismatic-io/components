import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { productOptionTypes } from "./productOptionTypes";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("productOptionTypes", () => {
  test("maps code/label to key/label and orders by label; the body IS the array", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/products/options/types")
      .reply(200, [
        {
          code: "field",
          label: "Field",
          group: "Text",
          extension_attributes: {},
        },
        {
          code: "area",
          label: "Area",
          group: "Text",
          extension_attributes: {},
        },
      ]);
    const result = await invokeDataSource(productOptionTypes, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([
      { label: "Area", key: "area" },
      { label: "Field", key: "field" },
    ]);
  });
  test("returns an empty array rather than throwing when the store declares no option types", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/products/options/types")
      .reply(200, []);
    const result = await invokeDataSource(productOptionTypes, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([]);
  });
});
