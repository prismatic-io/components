import nock from "nock";
import actions from "./index";
import { rawRequest } from "./misc/rawRequest";
type InlineAction = {
  performSafety?: string;
  examplePayload?: unknown;
  examplePerform?: (...args: unknown[]) => Promise<unknown>;
};
const registered = actions as unknown as Record<string, InlineAction>;
const withExamplePerform = Object.entries(registered).filter(
  ([, definition]) => typeof definition.examplePerform === "function",
);
const SAFE_ACTIONS = [
  "getAsset",
  "getBulkAction",
  "getEntry",
  "getEnvironment",
  "getSpace",
  "getUpload",
  "getWebhook",
];
describe("inline action calling", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("40 registered actions declare an examplePerform", () => {
    expect(withExamplePerform).toHaveLength(40);
  });
  test.each(
    withExamplePerform,
  )("%s examplePerform returns its examplePayload without network", async (_key, definition) => {
    const result = await definition.examplePerform?.({}, {});
    expect(result).toEqual(definition.examplePayload);
  });
  test.each(SAFE_ACTIONS)('%s declares performSafety "safe"', (key) => {
    expect(registered[key]?.performSafety).toBe("safe");
  });
  test("only the read actions above are safe", () => {
    const safe = Object.entries(registered)
      .filter(([, definition]) => definition.performSafety === "safe")
      .map(([key]) => key)
      .sort();
    expect(safe).toEqual(SAFE_ACTIONS);
  });
  test('rawRequest declares performSafety "notAllowed"', () => {
    expect(rawRequest.performSafety).toBe("notAllowed");
  });
});
