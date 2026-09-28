import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { productAttributeTypes } from "./productAttributeTypes";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("productAttributeTypes", () => {
  test("maps value/label to key/label and orders by label; the body IS the array", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/products/attributes/types")
      .reply(200, [
        { value: "text", label: "Text Field", extension_attributes: {} },
        { value: "date", label: "Date", extension_attributes: {} },
      ]);
    const result = await invokeDataSource(productAttributeTypes, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([
      { label: "Date", key: "date" },
      { label: "Text Field", key: "text" },
    ]);
  });
  test("returns an empty array rather than throwing when the store declares no attribute types", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/products/attributes/types")
      .reply(200, []);
    const result = await invokeDataSource(productAttributeTypes, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([]);
  });
});
