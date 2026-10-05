import {
  getEventBridgeConfiguration,
  getLambdaFunctionConfigurations,
  getQueueConfigurations,
  getTopicConfigurations,
} from "./bucketNotifications";
const arrayCleans = [
  ["getTopicConfigurations", getTopicConfigurations, "Topic configurations"],
  ["getQueueConfigurations", getQueueConfigurations, "Queue configurations"],
  [
    "getLambdaFunctionConfigurations",
    getLambdaFunctionConfigurations,
    "Lambda function configurations",
  ],
] as const;
describe.each(arrayCleans)("%s", (_name, clean, label) => {
  test("parses a JSON array string", () => {
    const configurations = [{ Id: "config-1", Events: ["s3:ObjectCreated:*"] }];
    expect(clean(JSON.stringify(configurations))).toEqual(configurations);
  });
  test("returns undefined for an empty string", () => {
    expect(clean("")).toBeUndefined();
  });
  test("throws when the JSON is not an array", () => {
    expect(() => clean('{"Id":"config-1"}')).toThrow(
      `${label} must be an array`,
    );
  });
  test("throws a SyntaxError for malformed JSON", () => {
    expect(() => clean("[{")).toThrow(SyntaxError);
  });
  test("returns an already-parsed array unchanged", () => {
    const configurations = [{ Id: "config-1", Events: ["s3:ObjectCreated:*"] }];
    expect(clean(configurations)).toEqual(configurations);
  });
  test("throws when an already-parsed value is not an array", () => {
    expect(() => clean({ Id: "config-1" })).toThrow(
      `${label} must be an array`,
    );
  });
  test("returns undefined when no value is provided", () => {
    expect(clean(undefined)).toBeUndefined();
  });
});
describe("getEventBridgeConfiguration", () => {
  test("parses a JSON object string", () => {
    expect(getEventBridgeConfiguration("{}")).toEqual({});
  });
  test("returns undefined for an empty string", () => {
    expect(getEventBridgeConfiguration("")).toBeUndefined();
  });
  test("throws a SyntaxError for malformed JSON", () => {
    expect(() => getEventBridgeConfiguration("{")).toThrow(SyntaxError);
  });
  test("returns an already-parsed object unchanged", () => {
    expect(getEventBridgeConfiguration({})).toEqual({});
  });
});
