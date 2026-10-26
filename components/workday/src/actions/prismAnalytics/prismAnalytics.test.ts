import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getDataChangesByIdExamplePayload,
  getFilesByContainerIdExamplePayload,
  getTableByIdExamplePayload,
  listDataChangesExamplePayload,
  listTablesExamplePayload,
  postFileContainersExamplePayload,
  postFilesByContainerIdExamplePayload,
  postTableExamplePayload,
  updateTableByIdExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getDataChangesById } from "./getDataChangesById";
import { getFilesByContainerId } from "./getFilesByContainerId";
import { getTableById } from "./getTableById";
import { listDataChanges } from "./listDataChanges";
import { listTables } from "./listTables";
import { postFileContainers } from "./postFileContainers";
import { postFilesByContainerId } from "./postFilesByContainerId";
import { postTable } from "./postTable";
import { updateTableById } from "./updateTableById";
const SERVICE = "/ccx/api/prismAnalytics/v3/acme";
const tableFields = [
  { name: "employee_id", type: { id: "Schema_Field_Type=Text" } },
];
const additionalFields = {
  description: "Headcount table",
  documentation: "Loaded nightly",
  enableForAnalysis: true,
};
const tags = [{ id: "tag-1", name: undefined }];
const tableBody = {
  displayName: "Headcount",
  description: "Headcount table",
  documentation: "Loaded nightly",
  enableForAnalysis: true,
  name: "headcount",
  tags: [{ id: "tag-1" }],
  fields: tableFields,
};
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getDataChangesById", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    dataChangeId: "dc-1",
  };
  it("returns the data change", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/dataChanges/dc-1`)
      .reply(200, getDataChangesByIdExamplePayload.data);
    const { result } = await invoke(getDataChangesById, params);
    expect(result).toEqual(getDataChangesByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/dataChanges/dc-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getDataChangesById, params)).rejects.toThrow();
  });
});
describe("getFilesByContainerId", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    fileContainerId: "fc-1",
  };
  it("returns the files in the container", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/fileContainers/fc-1/files`)
      .reply(200, getFilesByContainerIdExamplePayload.data);
    const { result } = await invoke(getFilesByContainerId, params);
    expect(result).toEqual(getFilesByContainerIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/fileContainers/fc-1/files`)
      .reply(404, { error: "not found" });
    await expect(invoke(getFilesByContainerId, params)).rejects.toThrow();
  });
});
describe("getTableById", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    tableId: "tbl-1",
    extraParameters: { type: "full" },
  };
  it("returns the table with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/tables/tbl-1`)
      .query({ type: "full" })
      .reply(200, getTableByIdExamplePayload.data);
    const { result } = await invoke(getTableById, params);
    expect(result).toEqual(getTableByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/tables/tbl-1`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(invoke(getTableById, params)).rejects.toThrow();
  });
});
describe("listDataChanges", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    dataChangeType: "summary",
    dataChangeName: undefined,
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: undefined,
  };
  it("sends the data change type with one page of query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/dataChanges`)
      .query({ type: "summary", limit: 10, offset: 20 })
      .reply(200, listDataChangesExamplePayload.data);
    const { result } = await invoke(listDataChanges, params);
    expect(result).toEqual(listDataChangesExamplePayload);
  });
  it("sends the data change name", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/dataChanges`)
      .query({ name: "Monthly", limit: 10, offset: 20 })
      .reply(200, listDataChangesExamplePayload.data);
    await invoke(listDataChanges, {
      ...params,
      dataChangeType: undefined,
      dataChangeName: "Monthly",
    });
  });
  it("throws before calling Workday when neither type nor name is set", async () => {
    await expect(
      invoke(listDataChanges, {
        ...params,
        dataChangeType: undefined,
      }),
    ).rejects.toThrow("Set Data Change Type or Data Change Name");
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/dataChanges`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listDataChanges, params)).rejects.toThrow();
  });
});
describe("listTables", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { name: "headcount" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/tables`)
      .query({ name: "headcount", limit: 10, offset: 20 })
      .reply(200, listTablesExamplePayload.data);
    const { result } = await invoke(listTables, params);
    expect(result).toEqual(listTablesExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/tables`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listTables, params)).rejects.toThrow();
  });
});
describe("postFileContainers", () => {
  const params = { connection: oauthTestConnection(), tenant: "acme" };
  it("creates a file container", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/fileContainers`)
      .reply(201, postFileContainersExamplePayload.data);
    const { result } = await invoke(postFileContainers, params);
    expect(result).toEqual(postFileContainersExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/fileContainers`)
      .reply(403, { error: "forbidden" });
    await expect(invoke(postFileContainers, params)).rejects.toThrow();
  });
});
describe("postFilesByContainerId", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    fileContainerId: "fc-1",
    file: {
      data: Buffer.from("employee_id\n21001\n"),
      contentType: "text/csv",
    },
  };
  it("uploads the file as multipart form data", async () => {
    nock(TEST_HOST, {
      reqheaders: { "content-type": /^multipart\/form-data; boundary=/ },
    })
      .post(
        `${SERVICE}/fileContainers/fc-1/files`,
        (body: string) =>
          body.includes('name="file"') && body.includes("employee_id\n21001"),
      )
      .reply(201, postFilesByContainerIdExamplePayload.data);
    const { result } = await invoke(postFilesByContainerId, params);
    expect(result).toEqual(postFilesByContainerIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/fileContainers/fc-1/files`)
      .reply(400, { error: "invalid" });
    await expect(invoke(postFilesByContainerId, params)).rejects.toThrow();
  });
});
describe("postTable", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    displayName: "Headcount",
    name: "headcount",
    fields: tableFields,
    tags,
    additionalFields,
  };
  it("sends the mapped body and returns the table", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/tables`, tableBody)
      .reply(201, postTableExamplePayload.data);
    const { result } = await invoke(postTable, params);
    expect(result).toEqual(postTableExamplePayload);
  });
  it("does not throw when additionalFields is not set", async () => {
    const { additionalFields: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/tables`)
      .reply(201, postTableExamplePayload.data);
    const { result } = await invoke(postTable, withoutKey as typeof params);
    expect(result).toEqual(postTableExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST).post(`${SERVICE}/tables`).reply(400, { error: "invalid" });
    await expect(invoke(postTable, params)).rejects.toThrow();
  });
});
describe("updateTableById", () => {
  const params = {
    connection: oauthTestConnection(),
    tenant: "acme",
    tableId: "tbl-1",
    displayName: "Headcount",
    name: "headcount",
    fields: tableFields,
    tags,
    additionalFields,
  };
  it("sends the mapped body with PUT and returns the table", async () => {
    nock(TEST_HOST)
      .put(`${SERVICE}/tables/tbl-1`, tableBody)
      .reply(200, updateTableByIdExamplePayload.data);
    const { result } = await invoke(updateTableById, params);
    expect(result).toEqual(updateTableByIdExamplePayload);
  });
  it("does not throw when additionalFields is not set", async () => {
    const { additionalFields: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .put(`${SERVICE}/tables/tbl-1`)
      .reply(200, updateTableByIdExamplePayload.data);
    const { result } = await invoke(
      updateTableById,
      withoutKey as typeof params,
    );
    expect(result).toEqual(updateTableByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .put(`${SERVICE}/tables/tbl-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(updateTableById, params)).rejects.toThrow();
  });
});
