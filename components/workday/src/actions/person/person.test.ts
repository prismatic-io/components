import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getPersonByIdExamplePayload,
  listPeopleExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getPersonById } from "./getPersonById";
import { listPeople } from "./listPeople";
const SERVICE = "/ccx/person/v4";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getPersonById", () => {
  const params = { connection: oauthTestConnection(), personId: "p-1" };
  it("returns the person", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/people/p-1`)
      .reply(200, getPersonByIdExamplePayload.data);
    const { result } = await invoke(getPersonById, params);
    expect(result).toEqual(getPersonByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/people/p-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getPersonById, params)).rejects.toThrow();
  });
});
describe("listPeople", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { search: "Logan" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/people`)
      .query({ search: "Logan", limit: 10, offset: 20 })
      .reply(200, listPeopleExamplePayload.data);
    const { result } = await invoke(listPeople, params);
    expect(result).toEqual(listPeopleExamplePayload);
  });
  it("pages through every person with Fetch All", async () => {
    const [person] = listPeopleExamplePayload.data.data;
    const firstPage = [
      { ...person, id: "p-1" },
      { ...person, id: "p-2" },
    ];
    const secondPage = [{ ...person, id: "p-3" }];
    nock(TEST_HOST)
      .get(`${SERVICE}/people`)
      .query({ search: "Logan", limit: 2, offset: 0 })
      .reply(200, { data: firstPage, total: 3 })
      .get(`${SERVICE}/people`)
      .query({ search: "Logan", limit: 2, offset: 2 })
      .reply(200, { data: secondPage, total: 3 });
    const { result } = await invoke(listPeople, {
      ...params,
      fetchAll: true,
      pagination: { limit: 2, offset: 20 },
    });
    expect(result).toEqual({ data: [...firstPage, ...secondPage] });
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/people`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listPeople, params)).rejects.toThrow();
  });
});
