import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getEntryExamplePayload,
  getEnvironmentExamplePayload,
  getSpaceExamplePayload,
} from "../../examplePayloads";
import { BASE, connection, useNock } from "../../testHelpers";
import { getEntry } from "./getEntry";
const SPACE_ID = getSpaceExamplePayload.data.sys.id;
const ENV_ID = getEnvironmentExamplePayload.data.sys.id;
const ENV_SPACE_ID = getEnvironmentExamplePayload.data.sys.space.sys.id;
const ENTRY_ID = getEntryExamplePayload.data.sys.id;
const mockSpaceAndEnvironment = () =>
  nock(BASE)
    .get(`/spaces/${SPACE_ID}`)
    .reply(200, getSpaceExamplePayload.data)
    .get(`/spaces/${SPACE_ID}/environments/${ENV_ID}`)
    .reply(200, getEnvironmentExamplePayload.data);
describe("getEntry", () => {
  useNock();
  test("happy path walks space -> environment -> entry and returns the plain entry", async () => {
    const chain = mockSpaceAndEnvironment();
    const entry = nock(BASE)
      .get(`/spaces/${ENV_SPACE_ID}/environments/${ENV_ID}/entries/${ENTRY_ID}`)
      .reply(200, getEntryExamplePayload.data);
    const { result } = await invoke(getEntry, {
      connection,
      spaceId: SPACE_ID,
      environmentId: ENV_ID,
      entryId: ENTRY_ID,
    });
    expect(chain.isDone()).toBe(true);
    expect(entry.isDone()).toBe(true);
    expect(result).toEqual(getEntryExamplePayload);
  });
  test("error path surfaces a 404 from the entry fetch", async () => {
    mockSpaceAndEnvironment();
    nock(BASE)
      .get(`/spaces/${ENV_SPACE_ID}/environments/${ENV_ID}/entries/missing`)
      .reply(404, { sys: { type: "Error", id: "NotFound" } });
    await expect(
      invoke(getEntry, {
        connection,
        spaceId: SPACE_ID,
        environmentId: ENV_ID,
        entryId: "missing",
      }),
    ).rejects.toThrow();
  });
});
