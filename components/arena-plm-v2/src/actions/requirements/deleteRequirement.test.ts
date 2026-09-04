import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createTestContext } from "../../tests/testContext";
import { deleteRequirement } from "./deleteRequirement";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
const REQUIREMENT_GUID = "RQ1AB2CD3EF4GH5IJ6KL7MN8";
const params = () => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  requirementGuid: REQUIREMENT_GUID,
});
describe("deleteRequirement", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("throws rather than reporting success when Arena rejects the delete", async () => {
    nock(ARENA_HOST)
      .delete(`${API}/requirements/${REQUIREMENT_GUID}`)
      .reply(417, {
        errors: [{ message: "Requirement is referenced by an active change" }],
      });
    await expect(
      invoke(deleteRequirement, params(), createTestContext()),
    ).rejects.toThrow();
  });
});
