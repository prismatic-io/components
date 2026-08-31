import { invoke } from "@prismatic-io/spectral/dist/testing";
import { mfaAuthenticateExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { mfaAuthenticate } from "./mfaAuthenticate";
const contextOverride = {
  integration: { name: "Acme Instance" },
} as never;
const params = {
  connection: testConnection,
  challengeId: "!b-challenge",
  token: "987123",
  sessionId: "!b-session",
};
describe("mfaAuthenticate", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path merges the derived deviceId into the unwrapped response", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post("/MFAAuthenticate.json")
      .reply(200, envelope(mfaAuthenticateExamplePayload.data));
    const { result } = await invoke(mfaAuthenticate, params, contextOverride);
    expect(result.data).toEqual({
      ...mfaAuthenticateExamplePayload.data,
      deviceId: "Device-AcmeInstance",
    });
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post("/MFAAuthenticate.json").reply(401, {});
    await expect(
      invoke(mfaAuthenticate, params, contextOverride),
    ).rejects.toThrow();
  });
});
