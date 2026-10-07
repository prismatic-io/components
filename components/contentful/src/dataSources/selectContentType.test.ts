import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getEnvironmentExamplePayload,
  getSpaceExamplePayload,
  listContentTypesExamplePayload,
} from "../examplePayloads";
import { asCollection, BASE, connection, useNock } from "../testHelpers";
import { selectContentType } from "./selectContentType";
const SPACE_ID = getSpaceExamplePayload.data.sys.id;
const ENV_ID = getEnvironmentExamplePayload.data.sys.id;
const ENV_SPACE_ID = getEnvironmentExamplePayload.data.sys.space.sys.id;
const PATH = `/spaces/${ENV_SPACE_ID}/environments/${ENV_ID}/content_types`;
const [blogPost] = listContentTypesExamplePayload.data;
const author = {
  ...blogPost,
  sys: { ...blogPost.sys, id: "6XwpTaSiiI2Ak2Ww0oi6qa" },
  name: "Author",
};
const mockChain = (items: unknown[]) =>
  nock(BASE)
    .get(`/spaces/${SPACE_ID}`)
    .reply(200, getSpaceExamplePayload.data)
    .get(`/spaces/${SPACE_ID}/environments/${ENV_ID}`)
    .reply(200, getEnvironmentExamplePayload.data)
    .get(PATH)
    .query(true)
    .reply(200, asCollection(items));
const invokeWith = (dataSourceReturn: string) =>
  invokeDataSource(selectContentType, {
    connection,
    spaceId: SPACE_ID,
    environmentId: ENV_ID,
    dataSourceReturn,
  });
describe("selectContentType", () => {
  useNock();
  test("returns {key,label} Elements keyed by id when dataSourceReturn is id", async () => {
    mockChain([blogPost, author]);
    const { result } = await invokeWith("id");
    expect(result).toEqual([
      { label: "Blog Post", key: blogPost.sys.id },
      { label: "Author", key: author.sys.id },
    ]);
  });
  test("keys Elements by name when dataSourceReturn is name", async () => {
    mockChain([blogPost]);
    const { result } = await invokeWith("name");
    expect(result).toEqual([{ label: "Blog Post", key: "Blog Post" }]);
  });
  test("returns an empty array for an empty collection", async () => {
    mockChain([]);
    const { result } = await invokeWith("id");
    expect(result).toEqual([]);
  });
});
