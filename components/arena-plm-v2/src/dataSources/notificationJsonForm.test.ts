import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../connections";
import { listQualityProcessStepAttributesExamplePayload } from "../examplePayloads";
import { createTestContext } from "../tests/testContext";
import { notificationJsonForm } from "./notificationJsonForm";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const ITEM_ENDPOINT = `${API}/settings/items/attributes`;
const CHANGE_ENDPOINT = `${API}/settings/changes/attributes`;
const REQUEST_ENDPOINT = `${API}/settings/requests/attributes`;
const QUALITY_ENDPOINT = `${API}/settings/qualityprocesses/attributes`;
const QUALITY_STEP_ENDPOINT = `${API}/settings/qualityprocesses/steps/attributes`;
const itemAttributesStub = {
  results: [
    { guid: "1AT11AT11AT11AT11AT11AT1", apiName: "name", name: "Name" },
  ],
  count: 1,
};
const changeAttributesStub = {
  results: [
    { guid: "2AT22AT22AT22AT22AT22AT2", apiName: "title", name: "Title" },
  ],
  count: 1,
};
const requestAttributesStub = {
  results: [
    { guid: "3AT33AT33AT33AT33AT33AT3", apiName: "summary", name: "Summary" },
  ],
  count: 1,
};
const qualityAttributesStub = {
  results: [
    { guid: "4AT44AT44AT44AT44AT44AT4", apiName: "severity", name: "Severity" },
  ],
  count: 1,
};
const EMPTY = { results: [], count: 0 };
const mockAttributeEndpoints = (bodies: {
  item: unknown;
  change: unknown;
  request: unknown;
  quality: unknown;
  qualityStep: unknown;
}) => {
  nock(ARENA_HOST).get(ITEM_ENDPOINT).reply(200, bodies.item);
  nock(ARENA_HOST).get(CHANGE_ENDPOINT).reply(200, bodies.change);
  nock(ARENA_HOST).get(REQUEST_ENDPOINT).reply(200, bodies.request);
  nock(ARENA_HOST).get(QUALITY_ENDPOINT).reply(200, bodies.quality);
  nock(ARENA_HOST).get(QUALITY_STEP_ENDPOINT).reply(200, bodies.qualityStep);
};
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
});
describe("notificationJsonForm", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("returns the schema, uiSchema and data triple a jsonForm requires", async () => {
    mockAttributeEndpoints({
      item: itemAttributesStub,
      change: changeAttributesStub,
      request: requestAttributesStub,
      quality: qualityAttributesStub,
      qualityStep: listQualityProcessStepAttributesExamplePayload.data,
    });
    const { result } = await invokeDataSource(
      notificationJsonForm,
      params(),
      createTestContext(),
    );
    expect(result).toEqual(
      expect.objectContaining({
        schema: expect.any(Object),
        uiSchema: expect.any(Object),
        data: expect.any(Object),
      }),
    );
    expect(result.data).toEqual({
      notificationEnabled: true,
      deliveryChannel: null,
      deliveryUrl: null,
      deliveryApiKey: null,
      resourceType: null,
      itemMessageFields: [],
      changeMessageFields: [],
      qualityMessageFields: [],
      requestMessageFields: [],
    });
    const properties = (
      result.schema as {
        properties: Record<string, unknown>;
      }
    ).properties;
    expect(properties.itemMessageFields).toMatchObject({
      type: "array",
      title: "Item Attributes",
      items: { oneOf: [{ const: "name", title: "Name" }] },
    });
    expect(properties.changeMessageFields).toMatchObject({
      items: { oneOf: [{ const: "title", title: "Title" }] },
    });
    expect(properties.requestMessageFields).toMatchObject({
      items: { oneOf: [{ const: "summary", title: "Summary" }] },
    });
    expect(properties.qualityMessageFields).toMatchObject({
      items: {
        oneOf: expect.arrayContaining([
          { const: "severity", title: "Severity" },
        ]),
      },
    });
  });
  it("still builds the form when no endpoint returns any attribute", async () => {
    mockAttributeEndpoints({
      item: EMPTY,
      change: EMPTY,
      request: EMPTY,
      quality: EMPTY,
      qualityStep: EMPTY,
    });
    const { result } = await invokeDataSource(
      notificationJsonForm,
      params(),
      createTestContext(),
    );
    const properties = (
      result.schema as {
        properties: Record<string, unknown>;
      }
    ).properties;
    expect(properties.itemMessageFields).toEqual({
      type: "array",
      title: "Item Attributes",
      uniqueItems: true,
      items: { type: "string" },
      default: [],
    });
    expect(result.data).toMatchObject({ itemMessageFields: [] });
  });
  it("propagates an HTTP failure instead of returning a partial form", async () => {
    nock(ARENA_HOST).get(ITEM_ENDPOINT).reply(200, itemAttributesStub);
    nock(ARENA_HOST).get(CHANGE_ENDPOINT).reply(200, changeAttributesStub);
    nock(ARENA_HOST).get(REQUEST_ENDPOINT).reply(200, requestAttributesStub);
    nock(ARENA_HOST)
      .get(QUALITY_ENDPOINT)
      .reply(403, { errors: [{ message: "Insufficient permissions" }] });
    nock(ARENA_HOST)
      .get(QUALITY_STEP_ENDPOINT)
      .reply(200, listQualityProcessStepAttributesExamplePayload.data);
    await expect(
      invokeDataSource(notificationJsonForm, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
