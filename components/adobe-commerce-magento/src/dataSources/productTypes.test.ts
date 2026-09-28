import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { STORE_HOST, storeConnection } from "../testHelpers";
import { productTypes } from "./productTypes";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("productTypes", () => {
  test("maps name/label to key/label and orders by label; the body IS the array", async () => {
    nock(STORE_HOST)
      .get("/rest/default/V1/products/types")
      .reply(200, [
        { name: "simple", label: "Simple Product", extension_attributes: {} },
        { name: "bundle", label: "Bundle Product", extension_attributes: {} },
      ]);
    const result = await invokeDataSource(productTypes, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([
      { label: "Bundle Product", key: "bundle" },
      { label: "Simple Product", key: "simple" },
    ]);
  });
  test("returns an empty array rather than throwing when the store declares no types", async () => {
    nock(STORE_HOST).get("/rest/default/V1/products/types").reply(200, []);
    const result = await invokeDataSource(productTypes, {
      connectionInput: storeConnection(),
    });
    expect(result.result).toEqual([]);
  });
});
