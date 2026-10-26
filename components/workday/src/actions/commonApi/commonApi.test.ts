import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getCustomerByIdExamplePayload,
  getOrganizationByIdExamplePayload,
  getWorkerBusinessTitleChangesExamplePayload,
  listOrganizationsExamplePayload,
  postJobChangesExamplePayload,
  postWorkerBusinessTitleChangeExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getCustomerById } from "./getCustomerById";
import { getOrganizationById } from "./getOrganizationById";
import { getWorkerBusinessTitleChanges } from "./getWorkerBusinessTitleChanges";
import { listOrganizations } from "./listOrganizations";
import { postJobChanges } from "./postJobChanges";
import { postWorkerBusinessTitleChange } from "./postWorkerBusinessTitleChange";
const SERVICE = "/ccx/api/common/v1";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getCustomerById", () => {
  const params = { connection: oauthTestConnection(), customerId: "cu-1" };
  it("returns the customer", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/customers/cu-1`)
      .reply(200, getCustomerByIdExamplePayload.data);
    const { result } = await invoke(getCustomerById, params);
    expect(result).toEqual(getCustomerByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/customers/cu-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getCustomerById, params)).rejects.toThrow();
  });
});
describe("getOrganizationById", () => {
  const params = {
    connection: oauthTestConnection(),
    organizationTypeId: undefined,
    organizationId: "org-1",
  };
  it("returns the organization", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/organizations/org-1`)
      .reply(200, getOrganizationByIdExamplePayload.data);
    const { result } = await invoke(getOrganizationById, params);
    expect(result).toEqual(getOrganizationByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/organizations/org-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getOrganizationById, params)).rejects.toThrow();
  });
});
describe("getWorkerBusinessTitleChanges", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 0 },
  };
  it("returns one page of business title changes", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/businessTitleChanges`)
      .query({ limit: 10, offset: 0 })
      .reply(200, getWorkerBusinessTitleChangesExamplePayload.data);
    const { result } = await invoke(getWorkerBusinessTitleChanges, params);
    expect(result).toEqual(getWorkerBusinessTitleChangesExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/businessTitleChanges`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(
      invoke(getWorkerBusinessTitleChanges, params),
    ).rejects.toThrow();
  });
});
describe("listOrganizations", () => {
  const params = {
    connection: oauthTestConnection(),
    organizationTypeId: "orgtype-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { type: "Supervisory" },
  };
  it("returns organizations with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/organizations`)
      .query({
        organizationType: "orgtype-1",
        type: "Supervisory",
        limit: 10,
        offset: 20,
      })
      .reply(200, listOrganizationsExamplePayload.data);
    const { result } = await invoke(listOrganizations, params);
    expect(result).toEqual(listOrganizationsExamplePayload);
  });
  it("reads every page with Fetch All", async () => {
    const [row] = listOrganizationsExamplePayload.data.data;
    nock(TEST_HOST)
      .get(`${SERVICE}/organizations`)
      .query({
        organizationType: "orgtype-1",
        type: "Supervisory",
        limit: 1,
        offset: 0,
      })
      .reply(200, { total: 2, data: [row] })
      .get(`${SERVICE}/organizations`)
      .query({
        organizationType: "orgtype-1",
        type: "Supervisory",
        limit: 1,
        offset: 1,
      })
      .reply(200, { total: 2, data: [row] });
    const { result } = await invoke(listOrganizations, {
      ...params,
      fetchAll: true,
      pagination: { limit: 1, offset: undefined },
    });
    expect(result).toEqual({ data: [row, row] });
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/organizations`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listOrganizations, params)).rejects.toThrow();
  });
});
describe("postJobChanges", () => {
  const proposedOrganizations = [{ id: "org-2", descriptor: "Sales" }];
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    supervisoryOrganizationId: "so-1",
    jobChangeReasonId: "jcr-1",
    moveManagersTeam: true,
    effective: new Date("2026-11-01T00:00:00.000Z"),
    proposedOrganizations: [
      ...proposedOrganizations,
      { id: undefined, descriptor: undefined },
    ],
    instanceId: "inst-1",
    instanceHref: "https://wd.example.com/inst-1",
    instanceDescriptor: "Job Change",
  };
  it("sends the mapped body and returns the job change", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/jobChanges`, {
        supervisoryOrganization: { id: "so-1" },
        jobChangeReason: { id: "jcr-1" },
        moveManagersTeam: true,
        effective: "2026-11-01T00:00:00.000Z",
        proposedOrganizations,
        id: "inst-1",
        href: "https://wd.example.com/inst-1",
        descriptor: "Job Change",
      })
      .reply(200, postJobChangesExamplePayload.data);
    const { result } = await invoke(postJobChanges, params);
    expect(result).toEqual(postJobChangesExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/jobChanges`)
      .reply(400, { error: "invalid" });
    await expect(invoke(postJobChanges, params)).rejects.toThrow();
  });
});
describe("postWorkerBusinessTitleChange", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    proposedBusinessTitle: "Staff Engineer",
    instanceId: "inst-1",
    instanceHref: "https://wd.example.com/inst-1",
    instanceDescriptor: "Title Change",
  };
  it("sends the proposed title and returns the change", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/businessTitleChanges`, {
        proposedBusinessTitle: "Staff Engineer",
        id: "inst-1",
        href: "https://wd.example.com/inst-1",
        descriptor: "Title Change",
      })
      .reply(200, postWorkerBusinessTitleChangeExamplePayload.data);
    const { result } = await invoke(postWorkerBusinessTitleChange, params);
    expect(result).toEqual(postWorkerBusinessTitleChangeExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/businessTitleChanges`)
      .reply(400, { error: "invalid" });
    await expect(
      invoke(postWorkerBusinessTitleChange, params),
    ).rejects.toThrow();
  });
});
