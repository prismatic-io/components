import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createProductExamplePayload } from "../../examplePayloads";
import {
  debugModeContext,
  expectDebugLoggedRequest,
  mockGraphql,
  mockTokenExchange,
  recordingLogger,
  testConnection,
  useNockLifecycle,
} from "../../testHelpers";
import { createProduct } from "./createProduct";
const params = {
  connection: testConnection,
  productCatalogueRef: "FCRG:PC:MASTER",
  productRef: "TESTPRD3",
  productType: "STANDARD",
  productName: "Widget",
  productSummary: "Widgets: the new whatsits",
  gtin: "012345678905",
  priceCurrency: "USD",
  priceValue: 1300,
};
describe("createProduct", () => {
  useNockLifecycle();
  it("sends priceValue as a number and returns the data", async () => {
    mockTokenExchange();
    const graphql = mockGraphql(200, createProductExamplePayload);
    const { result } = await invoke(createProduct, params);
    expect(graphql.body()?.variables).toEqual({
      productCatalogueRef: "FCRG:PC:MASTER",
      productRef: "TESTPRD3",
      productType: "STANDARD",
      productName: "Widget",
      productSummary: "Widgets: the new whatsits",
      gtin: "012345678905",
      priceCurrency: "USD",
      priceValue: 1300,
    });
    expect(typeof graphql.body()?.variables?.priceValue).toBe("number");
    expect(result).toEqual({ data: createProductExamplePayload.data });
    expect(nock.isDone()).toBe(true);
  });
  it("logs the GraphQL mutation and its variables in Debug Mode", async () => {
    mockTokenExchange();
    mockGraphql(200, createProductExamplePayload);
    const logger = recordingLogger();
    await invoke(createProduct, params, debugModeContext(logger));
    expectDebugLoggedRequest(logger, ['"productRef":"TESTPRD3"']);
    expect(nock.isDone()).toBe(true);
  });
  it("rejects when the GraphQL endpoint returns a 4xx", async () => {
    mockTokenExchange();
    mockGraphql(422, { errors: [{ message: "Product ref already exists" }] });
    await expect(invoke(createProduct, params)).rejects.toThrow();
    expect(nock.isDone()).toBe(true);
  });
});
