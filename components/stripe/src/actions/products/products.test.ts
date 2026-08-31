import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  createProductExamplePayload,
  deleteProductExamplePayload,
  getProductExamplePayload,
  listProductsExamplePayload,
  updateProductExamplePayload,
} from "../../examplePayloads/products";
import { createProduct } from "./createProduct";
import { deleteProduct } from "./deleteProduct";
import { getProduct } from "./getProduct";
import { listProducts } from "./listProducts";
import { updateProduct } from "./updateProduct";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const PRODUCT_ID = "prod_NWjs8kKbJWmuuc";
afterEach(() => nock.cleanAll());
describe("createProduct", () => {
  it("creates the product and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/products")
      .reply(200, createProductExamplePayload.data);
    const { result } = await invoke(
      createProduct,
      params({
        productName: "T-shirt",
        productType: "service",
        active: true,
        description: "Comfortable cotton t-shirt",
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createProductExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/products")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "Missing required param: name.",
        },
      });
    await expect(
      invoke(
        createProduct,
        params({
          productName: "",
          active: true,
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("Missing required param: name.");
  });
});
describe("getProduct", () => {
  it("returns the product for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/products/${PRODUCT_ID}`)
      .reply(200, getProductExamplePayload.data);
    const { result } = await invoke(
      getProduct,
      params({ productId: PRODUCT_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getProductExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/products/prod_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such product" },
      });
    await expect(
      invoke(
        getProduct,
        params({ productId: "prod_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such product");
  });
});
describe("listProducts", () => {
  it("returns the product list", async () => {
    const scope = nock(BASE)
      .get("/v1/products")
      .query({ limit: "10" })
      .reply(200, listProductsExamplePayload.data);
    const { result } = await invoke(
      listProducts,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listProductsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/products")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(listProducts, params({ pagination: {}, stripeConnection: conn })),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("updateProduct", () => {
  it("updates the product and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/products/${PRODUCT_ID}`)
      .reply(200, updateProductExamplePayload.data);
    const { result } = await invoke(
      updateProduct,
      params({
        productId: PRODUCT_ID,
        updateProductName: "T-shirt (updated)",
        active: false,
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateProductExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/products/prod_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such product" },
      });
    await expect(
      invoke(
        updateProduct,
        params({
          productId: "prod_missing",
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such product");
  });
});
describe("deleteProduct", () => {
  it("deletes the product and returns the deletion confirmation", async () => {
    const scope = nock(BASE)
      .delete(`/v1/products/${PRODUCT_ID}`)
      .reply(200, deleteProductExamplePayload.data);
    const { result } = await invoke(
      deleteProduct,
      params({ productId: PRODUCT_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(deleteProductExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .delete("/v1/products/prod_missing")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message:
            "You cannot delete a product that has prices associated with it.",
        },
      });
    await expect(
      invoke(
        deleteProduct,
        params({ productId: "prod_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("cannot delete a product");
  });
});
