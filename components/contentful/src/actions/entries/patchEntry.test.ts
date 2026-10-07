import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { patchEntryExamplePayload } from "../../examplePayloads";
import { ACCESS_TOKEN, BASE, connection, useNock } from "../../testHelpers";
import { patchEntry } from "./patchEntry";
const PATH =
  "/spaces/yadj1kx9rmg0/environments/master/entries/5KsDBWseXY6QegucYAoacS";
const operations = [
  { op: "replace", path: "/fields/title/en-US", value: "Updated Title" },
];
const params = {
  connection,
  spaceId: "yadj1kx9rmg0",
  environmentId: "master",
  entryId: "5KsDBWseXY6QegucYAoacS",
  patchOperations: operations,
  entryVersion: "3",
};
describe("patchEntry", () => {
  useNock();
  test("happy path sends JSON Patch with the version header and returns the entry", async () => {
    let sentHeaders: Record<string, unknown> = {};
    let sentBody: unknown;
    const scope = nock(BASE)
      .patch(PATH)
      .reply(200, function (_uri, body) {
        sentHeaders = this.req.headers;
        sentBody = body;
        return patchEntryExamplePayload.data;
      });
    const { result } = await invoke(patchEntry, params);
    expect(scope.isDone()).toBe(true);
    expect(sentHeaders["content-type"]).toBe("application/json-patch+json");
    expect(sentHeaders["x-contentful-version"]).toBe("3");
    expect(sentHeaders.authorization).toBe(`Bearer ${ACCESS_TOKEN}`);
    expect(sentBody).toEqual(operations);
    expect(result).toEqual(patchEntryExamplePayload);
  });
  test("error path surfaces a 409 version conflict", async () => {
    nock(BASE)
      .patch(PATH)
      .reply(409, { sys: { type: "Error", id: "VersionMismatch" } });
    await expect(invoke(patchEntry, params)).rejects.toThrow();
  });
});
