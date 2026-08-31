import { invoke } from "@prismatic-io/spectral/dist/testing";
import { generateMfaChallengeIdExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { generateMfaChallengeId } from "./generateMfaChallengeId";
describe("generateMfaChallengeId", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path merges the login sessionId into the unwrapped response", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post("/MFAChallenge.json")
      .reply(200, envelope(generateMfaChallengeIdExamplePayload.data));
    const { result } = await invoke(generateMfaChallengeId, {
      connection: testConnection,
    });
    expect(result.data).toEqual({
      ...generateMfaChallengeIdExamplePayload.data,
      sessionId: "test-session-id",
    });
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post("/MFAChallenge.json").reply(500, {});
    await expect(
      invoke(generateMfaChallengeId, { connection: testConnection }),
    ).rejects.toThrow();
  });
});
