import type { Connection, Element } from "@prismatic-io/spectral";
import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { odooApiKey } from "../connections/odooApiKey";
import {
  listModelsExamplePayload,
  listRecordsExamplePayload,
} from "../examplePayloads";
import { selectModel } from "./selectModel";
import { selectRecordById } from "./selectRecordById";
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
const asElements = (result: (string | Element)[]): Element[] =>
  result.map((entry) => {
    if (typeof entry === "string") {
      throw new Error(`Expected an Element, received the string "${entry}"`);
    }
    return entry;
  });
describe("selectModel", () => {
  afterEach(() => nock.cleanAll());
  test("maps ir.model rows to key/label elements sorted by label", async () => {
    odooNock()
      .post("/json/2/ir.model/search_read")
      .reply(200, listModelsExamplePayload.data);
    const { result } = await invokeDataSource(selectModel, {
      connection: testConnection,
      nameSearch: undefined,
      modelSearch: undefined,
    });
    const elements = asElements(result);
    expect(elements).toEqual([
      { key: "res.partner.bank", label: "Bank Accounts (res.partner.bank)" },
      { key: "res.partner.industry", label: "Industry (res.partner.industry)" },
    ]);
    for (const element of elements) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("returns an empty list when no models match", async () => {
    odooNock().post("/json/2/ir.model/search_read").reply(200, []);
    const { result } = await invokeDataSource(selectModel, {
      connection: testConnection,
      nameSearch: undefined,
      modelSearch: undefined,
    });
    expect(result).toEqual([]);
  });
});
describe("selectRecordById", () => {
  afterEach(() => nock.cleanAll());
  test("maps records to key/label elements with the id stringified", async () => {
    odooNock()
      .post("/json/2/res.partner/search_read")
      .reply(200, listRecordsExamplePayload.data);
    const { result } = await invokeDataSource(selectRecordById, {
      connection: testConnection,
      model: "res.partner",
    });
    expect(asElements(result)).toEqual([{ key: "12", label: "John Doe" }]);
  });
  test("falls back through name, then display_name, then a placeholder label", async () => {
    odooNock()
      .post("/json/2/res.partner/search_read")
      .reply(200, [
        { id: 3 },
        { id: 2, display_name: "Bravo Display" },
        { id: 1, name: "Alpha Name", display_name: "Ignored Display" },
      ]);
    const { result } = await invokeDataSource(selectRecordById, {
      connection: testConnection,
      model: "res.partner",
    });
    expect(asElements(result)).toEqual([
      { key: "3", label: "(record with no name field)" },
      { key: "1", label: "Alpha Name" },
      { key: "2", label: "Bravo Display" },
    ]);
  });
  test("returns an empty list when the model has no records", async () => {
    odooNock().post("/json/2/res.partner/search_read").reply(200, []);
    const { result } = await invokeDataSource(selectRecordById, {
      connection: testConnection,
      model: "res.partner",
    });
    expect(result).toEqual([]);
  });
});
