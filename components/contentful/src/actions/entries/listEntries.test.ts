import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getEnvironmentExamplePayload,
  getSpaceExamplePayload,
  listEntriesExamplePayload,
} from "../../examplePayloads";
import { asCollection, BASE, connection, useNock } from "../../testHelpers";
import { listEntries } from "./listEntries";
const SPACE_ID = getSpaceExamplePayload.data.sys.id;
const ENV_ID = getEnvironmentExamplePayload.data.sys.id;
const ENV_SPACE_ID = getEnvironmentExamplePayload.data.sys.space.sys.id;
const ENTRIES_PATH = `/spaces/${ENV_SPACE_ID}/environments/${ENV_ID}/entries`;
const [firstEntry] = listEntriesExamplePayload.data;
const secondEntry = {
  ...firstEntry,
  sys: { ...firstEntry.sys, id: "2cOd0Aho4dInhwh5cgY9rj" },
};
const mockSpaceAndEnvironment = () =>
  nock(BASE)
    .get(`/spaces/${SPACE_ID}`)
    .reply(200, getSpaceExamplePayload.data)
    .get(`/spaces/${SPACE_ID}/environments/${ENV_ID}`)
    .reply(200, getEnvironmentExamplePayload.data);
const params = { connection, spaceId: SPACE_ID, environmentId: ENV_ID };
describe("listEntries", () => {
  useNock();
  test("happy path drains every page through getAllPaginatedItems", async () => {
    mockSpaceAndEnvironment();
    const pages = nock(BASE)
      .get(ENTRIES_PATH)
      .query({ limit: "100", skip: "0" })
      .reply(200, asCollection([firstEntry], { total: 2, skip: 0 }))
      .get(ENTRIES_PATH)
      .query({ limit: "100", skip: "1" })
      .reply(200, asCollection([secondEntry], { total: 2, skip: 1 }));
    const { result } = await invoke(listEntries, params);
    expect(pages.isDone()).toBe(true);
    expect(result).toEqual({ data: [firstEntry, secondEntry] });
  });
  test("a single page matching the example payload returns its items", async () => {
    mockSpaceAndEnvironment();
    nock(BASE)
      .get(ENTRIES_PATH)
      .query({ limit: "100", skip: "0" })
      .reply(200, asCollection(listEntriesExamplePayload.data));
    const { result } = await invoke(listEntries, params);
    expect(result).toEqual(listEntriesExamplePayload);
  });
  test("error path surfaces a 400 from the entries fetch", async () => {
    mockSpaceAndEnvironment();
    nock(BASE)
      .get(ENTRIES_PATH)
      .query(true)
      .reply(400, { sys: { type: "Error", id: "BadRequest" } });
    await expect(invoke(listEntries, params)).rejects.toThrow();
  });
});
