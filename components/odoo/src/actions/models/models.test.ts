import type { Connection } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { odooApiKey } from "../../connections/odooApiKey";
import {
  listModelFieldsExamplePayload,
  listModelsExamplePayload,
} from "../../examplePayloads";
import { listModelFields } from "./listModelFields";
import { listModels } from "./listModels";
nock.disableNetConnect();
const ODOO_ORIGIN = "https://odoo.example.com";
const API_KEY = "test-api-key";
const DB = "odoo_db";
const testConnection = createConnection(odooApiKey, {
  baseUrl: ODOO_ORIGIN,
  db: DB,
  apiKey: API_KEY,
}) as unknown as Connection;
const odooNock = (): nock.Scope =>
  nock(ODOO_ORIGIN, {
    reqheaders: {
      authorization: `Bearer ${API_KEY}`,
      "x-odoo-database": DB,
    },
  });
const IR_MODEL_SEARCH_READ = "/json/2/ir.model/search_read";
const noSearch = {
  connection: testConnection,
  fetchAll: false,
  pagination: { limit: undefined, offset: undefined },
  nameSearch: undefined,
  modelSearch: undefined,
};
describe("listModels", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of ir.model rows with the default page size and no filter", async () => {
    odooNock()
      .post(IR_MODEL_SEARCH_READ, {
        domain: [],
        fields: ["id", "name", "model", "state", "modules", "display_name"],
        limit: 100,
        offset: 0,
      })
      .reply(200, listModelsExamplePayload.data);
    const { result } = await invoke(listModels, noSearch);
    expect(result.data).toEqual(listModelsExamplePayload.data);
  });
  test("surfaces a 500 from the ir.model search_read call", async () => {
    odooNock()
      .post(IR_MODEL_SEARCH_READ)
      .reply(500, { error: "Internal Server Error" });
    await expect(invoke(listModels, noSearch)).rejects.toThrow();
  });
});
describe("listModelFields", () => {
  afterEach(() => nock.cleanAll());
  test("returns the fields_get metadata map untouched", async () => {
    odooNock()
      .post("/json/2/res.partner/fields_get", {
        allfields: [],
        attributes: [],
      })
      .reply(200, listModelFieldsExamplePayload.data);
    const { result } = await invoke(listModelFields, {
      connection: testConnection,
      model: "res.partner",
    });
    expect(result.data).toEqual(listModelFieldsExamplePayload.data);
  });
  test("surfaces a 400 from the fields_get call", async () => {
    odooNock()
      .post("/json/2/no.such.model/fields_get")
      .reply(400, { error: "Object no.such.model doesn't exist" });
    await expect(
      invoke(listModelFields, {
        connection: testConnection,
        model: "no.such.model",
      }),
    ).rejects.toThrow();
  });
});
