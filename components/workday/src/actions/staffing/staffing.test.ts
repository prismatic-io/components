import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getStaffingWorkerByIdExamplePayload,
  getStaffingWorkersExamplePayload,
  getWorkerExplicitSkillsExamplePayload,
  getWorkerServiceDatesExamplePayload,
  initiateJobChangeExamplePayload,
  initiateOrganizationAssignmentChangeExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getStaffingWorkerById } from "./getStaffingWorkerById";
import { getStaffingWorkers } from "./getStaffingWorkers";
import { getWorkerExplicitSkills } from "./getWorkerExplicitSkills";
import { getWorkerServiceDates } from "./getWorkerServiceDates";
import { initiateJobChange } from "./initiateJobChange";
import { initiateOrganizationAssignmentChange } from "./initiateOrganizationAssignmentChange";
const SERVICE = "/ccx/staffing/v7";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getStaffingWorkerById", () => {
  const params = { connection: oauthTestConnection(), workerId: "w-1" };
  it("returns the worker", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1`)
      .reply(200, getStaffingWorkerByIdExamplePayload.data);
    const { result } = await invoke(getStaffingWorkerById, params);
    expect(result).toEqual(getStaffingWorkerByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getStaffingWorkerById, params)).rejects.toThrow();
  });
});
describe("getStaffingWorkers", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { search: "Logan" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers`)
      .query({ search: "Logan", limit: 10, offset: 20 })
      .reply(200, getStaffingWorkersExamplePayload.data);
    const { result } = await invoke(getStaffingWorkers, params);
    expect(result).toEqual(getStaffingWorkersExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(getStaffingWorkers, params)).rejects.toThrow();
  });
});
describe("getWorkerExplicitSkills", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 0 },
    extraParameters: { skill: "TypeScript" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/explicitSkills`)
      .query({ skill: "TypeScript", limit: 10, offset: 0 })
      .reply(200, getWorkerExplicitSkillsExamplePayload.data);
    const { result } = await invoke(getWorkerExplicitSkills, params);
    expect(result).toEqual(getWorkerExplicitSkillsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/explicitSkills`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(invoke(getWorkerExplicitSkills, params)).rejects.toThrow();
  });
});
describe("getWorkerServiceDates", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 0 },
  };
  it("returns one page of service dates", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/serviceDates`)
      .query({ limit: 10, offset: 0 })
      .reply(200, getWorkerServiceDatesExamplePayload.data);
    const { result } = await invoke(getWorkerServiceDates, params);
    expect(result).toEqual(getWorkerServiceDatesExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/serviceDates`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(invoke(getWorkerServiceDates, params)).rejects.toThrow();
  });
});
describe("initiateJobChange", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    effectiveDate: new Date("2026-11-01T00:00:00.000Z"),
    jobId: "job-1",
    reasonId: "reason-1",
    supervisoryOrganizationId: "sup-org-1",
    locationId: "loc-1",
    extraBody: { template: { id: "tmpl-1" } },
  };
  it("sends the mapped body merged with Extra Body", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/jobChanges`, {
        date: "2026-11-01T00:00:00.000Z",
        worker: { id: "w-1" },
        job: { id: "job-1" },
        reason: { id: "reason-1" },
        supervisoryOrganization: { id: "sup-org-1" },
        location: { id: "loc-1" },
        template: { id: "tmpl-1" },
      })
      .reply(200, initiateJobChangeExamplePayload.data);
    const { result } = await invoke(initiateJobChange, params);
    expect(result).toEqual(initiateJobChangeExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/jobChanges`)
      .reply(400, { error: "invalid" });
    await expect(invoke(initiateJobChange, params)).rejects.toThrow();
  });
});
describe("initiateOrganizationAssignmentChange", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    effectiveDate: new Date("2026-11-01T00:00:00.000Z"),
    jobId: "job-2",
    positionId: "pos-1",
    extraBody: { descriptor: "Org change" },
  };
  it("sends the mapped body merged with Extra Body", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/organizationAssignmentChanges`, {
        date: "2026-11-01T00:00:00.000Z",
        worker: { id: "w-1" },
        job: { id: "job-2" },
        position: { id: "pos-1" },
        descriptor: "Org change",
      })
      .reply(200, initiateOrganizationAssignmentChangeExamplePayload.data);
    const { result } = await invoke(
      initiateOrganizationAssignmentChange,
      params,
    );
    expect(result).toEqual(initiateOrganizationAssignmentChangeExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/organizationAssignmentChanges`)
      .reply(400, { error: "invalid" });
    await expect(
      invoke(initiateOrganizationAssignmentChange, params),
    ).rejects.toThrow();
  });
});
