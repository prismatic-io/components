import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getEnvironmentExamplePayload,
  getSpaceExamplePayload,
  listEntriesExamplePayload,
} from "../examplePayloads";
import { asCollection, BASE, connection, useNock } from "../testHelpers";
import { selectEntry } from "./selectEntry";
const SPACE_ID = getSpaceExamplePayload.data.sys.id;
const ENV_ID = getEnvironmentExamplePayload.data.sys.id;
const ENV_SPACE_ID = getEnvironmentExamplePayload.data.sys.space.sys.id;
const PATH = `/spaces/${ENV_SPACE_ID}/environments/${ENV_ID}/entries`;
const [titled] = listEntriesExamplePayload.data;
const withSys = (id: string, fields: Record<string, unknown>) => ({
  ...titled,
  sys: { ...titled.sys, id },
  fields,
});
const named = withSys("named1", { name: { "en-US": "Alpha by name" } });
const bare = withSys("0bareId", { body: { "en-US": "no title or name" } });
const zulu = withSys("zulu1", { title: { "en-US": "Zulu" } });
const mockChain = (items: unknown[]) =>
  nock(BASE)
    .get(`/spaces/${SPACE_ID}`)
    .reply(200, getSpaceExamplePayload.data)
    .get(`/spaces/${SPACE_ID}/environments/${ENV_ID}`)
    .reply(200, getEnvironmentExamplePayload.data)
    .get(PATH)
    .query(true)
    .reply(200, asCollection(items));
const params = { connection, spaceId: SPACE_ID, environmentId: ENV_ID };
describe("selectEntry", () => {
  useNock();
  test("returns {key,label} Elements with title -> name -> sys.id label fallback, sorted by label", async () => {
    mockChain([zulu, titled, named, bare]);
    const { result } = await invokeDataSource(selectEntry, params);
    expect(result).toEqual([
      { label: "0bareId", key: "0bareId" },
      { label: "Alpha by name", key: "named1" },
      { label: "Hello, World!", key: titled.sys.id },
      { label: "Zulu", key: "zulu1" },
    ]);
  });
  test("returns an empty array for an empty collection", async () => {
    mockChain([]);
    const { result } = await invokeDataSource(selectEntry, params);
    expect(result).toEqual([]);
  });
});
