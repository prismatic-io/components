import type { Connection } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { odooApiKey } from "../../connections/odooApiKey";
import {
  createRecordExamplePayload,
  deleteRecordByIdExamplePayload,
  getRecordByExternalIdExamplePayload,
  getRecordByIdExamplePayload,
  listRecordsExamplePayload,
  setExternalIdExamplePayload,
  updateRecordExamplePayload,
} from "../../examplePayloads";
import { createRecord } from "./createRecord";
import { deleteRecordById } from "./deleteRecordById";
import { getRecordByExternalId } from "./getRecordByExternalId";
import { getRecordById } from "./getRecordById";
import { listRecords } from "./listRecords";
import { setExternalId } from "./setExternalId";
import { updateRecord } from "./updateRecord";
nock.disableNetConnect();
const ODOO_ORIGIN = "https://odoo.example.com";
const API_KEY = "test-api-key";
const DB = "odoo_db";
const MODEL = "res.partner";
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
      "content-type": "application/json",
    },
  });
const ormPath = (model: string, ormMethod: string): string =>
  `/json/2/${model}/${ormMethod}`;
const scalarBody = (
  value: boolean,
): [
  string,
  {
    "content-type": string;
  },
] => [JSON.stringify(value), { "content-type": "application/json" }];
describe("record actions", () => {
  afterEach(() => nock.cleanAll());
  describe("createRecord", () => {
    test("returns the new record ID from the create reply", async () => {
      odooNock()
        .post(ormPath(MODEL, "create"), {
          vals_list: [{ name: "John Doe" }],
        })
        .reply(200, [createRecordExamplePayload.data]);
      const { result } = await invoke(createRecord, {
        connection: testConnection,
        model: MODEL,
        parameters: { name: "John Doe" },
        externalId: undefined,
      });
      expect(result.data).toBe(createRecordExamplePayload.data);
    });
    test("surfaces a 422 from the create call", async () => {
      odooNock()
        .post(ormPath(MODEL, "create"))
        .reply(422, { error: "Invalid field" });
      await expect(
        invoke(createRecord, {
          connection: testConnection,
          model: MODEL,
          parameters: { name: "John Doe" },
          externalId: undefined,
        }),
      ).rejects.toThrow();
    });
  });
  describe("updateRecord", () => {
    test("returns the boolean the write reply carries", async () => {
      odooNock()
        .post(ormPath(MODEL, "write"), {
          ids: [12],
          vals: { email: "new@example.com" },
        })
        .reply(200, ...scalarBody(updateRecordExamplePayload.data));
      const { result } = await invoke(updateRecord, {
        connection: testConnection,
        model: MODEL,
        id: 12,
        parameters: { email: "new@example.com" },
      });
      expect(result.data).toBe(updateRecordExamplePayload.data);
    });
    test("surfaces a 400 from the write call", async () => {
      odooNock()
        .post(ormPath(MODEL, "write"))
        .reply(400, { error: "Unknown field" });
      await expect(
        invoke(updateRecord, {
          connection: testConnection,
          model: MODEL,
          id: 12,
          parameters: { email: "new@example.com" },
        }),
      ).rejects.toThrow();
    });
  });
  describe("deleteRecordById", () => {
    test("returns the boolean the unlink reply carries", async () => {
      odooNock()
        .post(ormPath(MODEL, "unlink"), { ids: [12] })
        .reply(200, ...scalarBody(deleteRecordByIdExamplePayload.data));
      const { result } = await invoke(deleteRecordById, {
        connection: testConnection,
        model: MODEL,
        id: 12,
      });
      expect(result.data).toBe(deleteRecordByIdExamplePayload.data);
    });
    test("surfaces a 403 from the unlink call", async () => {
      odooNock()
        .post(ormPath(MODEL, "unlink"))
        .reply(403, { error: "Access denied" });
      await expect(
        invoke(deleteRecordById, {
          connection: testConnection,
          model: MODEL,
          id: 12,
        }),
      ).rejects.toThrow();
    });
  });
  describe("getRecordById", () => {
    test("unwraps the single row the read reply carries", async () => {
      odooNock()
        .post(ormPath(MODEL, "read"), { ids: [12], fields: null })
        .reply(200, [getRecordByIdExamplePayload.data]);
      const { result } = await invoke(getRecordById, {
        connection: testConnection,
        model: MODEL,
        id: 12,
      });
      expect(result.data).toEqual(getRecordByIdExamplePayload.data);
    });
    test("surfaces a 404 from the read call", async () => {
      odooNock()
        .post(ormPath(MODEL, "read"))
        .reply(404, { error: "Not found" });
      await expect(
        invoke(getRecordById, {
          connection: testConnection,
          model: MODEL,
          id: 12,
        }),
      ).rejects.toThrow();
    });
  });
  describe("getRecordByExternalId", () => {
    test("resolves the external ID, then reads the record it points at", async () => {
      const lookupRow = { res_id: 12, model: MODEL };
      odooNock()
        .post(ormPath("ir.model.data", "search_read"), {
          domain: [
            ["module", "=", "custom_partner"],
            ["name", "=", "abc_123"],
          ],
          fields: ["res_id", "model"],
          limit: 1,
        })
        .reply(200, [lookupRow]);
      odooNock()
        .post(ormPath(MODEL, "read"), { ids: [12], fields: null })
        .reply(200, [getRecordByExternalIdExamplePayload.data]);
      const { result } = await invoke(getRecordByExternalId, {
        connection: testConnection,
        externalId: "custom_partner.abc_123",
      });
      expect(result.data).toEqual(getRecordByExternalIdExamplePayload.data);
    });
    test("surfaces a 500 from the external ID lookup", async () => {
      odooNock()
        .post(ormPath("ir.model.data", "search_read"))
        .reply(500, { error: "Internal Server Error" });
      await expect(
        invoke(getRecordByExternalId, {
          connection: testConnection,
          externalId: "custom_partner.abc_123",
        }),
      ).rejects.toThrow();
    });
  });
  describe("listRecords", () => {
    test("returns one page honoring the Limit and Offset inputs", async () => {
      odooNock()
        .post(ormPath(MODEL, "search_read"), {
          domain: [],
          fields: null,
          limit: 5,
          offset: 10,
        })
        .reply(200, listRecordsExamplePayload.data);
      const { result } = await invoke(listRecords, {
        connection: testConnection,
        model: MODEL,
        fetchAll: false,
        pagination: { limit: 5, offset: 10 },
      });
      expect(result.data).toEqual(listRecordsExamplePayload.data);
    });
    test("surfaces a 500 from the search_read call", async () => {
      odooNock()
        .post(ormPath(MODEL, "search_read"))
        .reply(500, { error: "Internal Server Error" });
      await expect(
        invoke(listRecords, {
          connection: testConnection,
          model: MODEL,
          fetchAll: false,
          pagination: { limit: undefined, offset: undefined },
        }),
      ).rejects.toThrow();
    });
  });
  describe("setExternalId", () => {
    test("splits the external ID into module and name, then returns the new row ID", async () => {
      odooNock()
        .post(ormPath("ir.model.data", "create"), {
          vals_list: [
            {
              module: "custom_partner",
              name: "abc_123",
              model: MODEL,
              res_id: 25,
            },
          ],
        })
        .reply(200, [setExternalIdExamplePayload.data]);
      const { result } = await invoke(setExternalId, {
        connection: testConnection,
        model: MODEL,
        id: 25,
        externalId: "custom_partner.abc_123",
      });
      expect(result.data).toBe(setExternalIdExamplePayload.data);
    });
    test("surfaces a 422 from the ir.model.data create call", async () => {
      odooNock()
        .post(ormPath("ir.model.data", "create"))
        .reply(422, { error: "External ID already exists" });
      await expect(
        invoke(setExternalId, {
          connection: testConnection,
          model: MODEL,
          id: 25,
          externalId: "custom_partner.abc_123",
        }),
      ).rejects.toThrow();
    });
  });
});
