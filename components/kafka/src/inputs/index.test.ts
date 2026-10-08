import {
  brokers,
  clientId,
  getConsumerGroupStatusInputs,
  kafkaConsumerInputs,
  publishMessagesInputs,
  topic,
} from "./index";
const cleanFn = (field: { clean?: (value: unknown) => unknown }) => {
  const { clean } = field;
  if (!clean) {
    throw new Error("Input definition has no clean function.");
  }
  return clean;
};
const { fromBeginning, autoCommit, deserializeKeys } =
  kafkaConsumerInputs.consumerOptions.inputs;
describe("integer coercion clean fns (util.types.toInt)", () => {
  const intInputs: [
    string,
    {
      clean?: (value: unknown) => unknown;
    },
  ][] = [
    ["maxMessages", kafkaConsumerInputs.maxMessages],
    ["sessionTimeout", kafkaConsumerInputs.sessionTimeout],
    ["heartbeatInterval", kafkaConsumerInputs.heartbeatInterval],
  ];
  test.each(intInputs)("%s parses a numeric string", (_name, field) => {
    expect(cleanFn(field)("100")).toBe(100);
  });
  test.each(intInputs)("%s truncates a decimal string", (_name, field) => {
    expect(cleanFn(field)("20.3")).toBe(20);
  });
  test.each(intInputs)("%s passes a number through", (_name, field) => {
    expect(cleanFn(field)(3000)).toBe(3000);
  });
  test.each(intInputs)("%s throws on a non-numeric string", (_name, field) => {
    expect(() => cleanFn(field)("abc")).toThrow(
      "Value 'abc' cannot be coerced to int.",
    );
  });
  test("an empty or absent value falls back to each input's declared default", () => {
    expect(cleanFn(kafkaConsumerInputs.maxMessages)(undefined)).toBe(100);
    expect(cleanFn(kafkaConsumerInputs.maxMessages)("")).toBe(100);
  });
  test("maxMessages rejects zero and negative values", () => {
    expect(() => cleanFn(kafkaConsumerInputs.maxMessages)("0")).toThrow(
      "Max Messages must be at least 1.",
    );
    expect(() => cleanFn(kafkaConsumerInputs.maxMessages)("-5")).toThrow(
      "Max Messages must be at least 1.",
    );
    expect(cleanFn(kafkaConsumerInputs.maxMessages)("1")).toBe(1);
    expect(cleanFn(kafkaConsumerInputs.sessionTimeout)(undefined)).toBe(30000);
    expect(cleanFn(kafkaConsumerInputs.heartbeatInterval)(undefined)).toBe(
      3000,
    );
  });
});
describe("unchecked array/list cast clean fns", () => {
  const arrayInputs: [
    string,
    {
      clean?: (value: unknown) => unknown;
    },
  ][] = [
    ["brokers", brokers],
    ["topics", kafkaConsumerInputs.topics],
    ["topicsToCheck", getConsumerGroupStatusInputs.topicsToCheck],
  ];
  test.each(
    arrayInputs,
  )("%s returns the same array reference it was given", (_name, field) => {
    const value = ["broker-1.example.com:9092", "broker-2.example.com:9092"];
    expect(cleanFn(field)(value)).toBe(value);
  });
  test.each(
    arrayInputs,
  )("%s passes a non-array value through unchanged instead of throwing", (_name, field) => {
    expect(cleanFn(field)("not-an-array")).toBe("not-an-array");
    expect(cleanFn(field)(undefined)).toBeUndefined();
    expect(cleanFn(field)(null)).toBeNull();
  });
  test("messages returns the same key/value list reference it was given", () => {
    const value = [
      { key: "k1", value: "first message" },
      { key: "k2", value: "second message" },
    ];
    expect(cleanFn(publishMessagesInputs.messages)(value)).toBe(value);
  });
  test("messages passes a non-array value through unchanged instead of throwing", () => {
    expect(cleanFn(publishMessagesInputs.messages)("not-a-list")).toBe(
      "not-a-list",
    );
    expect(cleanFn(publishMessagesInputs.messages)(undefined)).toBeUndefined();
  });
});
describe("string coercion clean fns (util.types.toString)", () => {
  const stringInputs: [
    string,
    {
      clean?: (value: unknown) => unknown;
    },
  ][] = [
    ["clientId", clientId],
    ["topic", topic],
    ["consumerGroupId", kafkaConsumerInputs.consumerGroupId],
  ];
  test.each(stringInputs)("%s passes a string through", (_name, field) => {
    expect(cleanFn(field)("order-events")).toBe("order-events");
  });
  test.each(stringInputs)("%s stringifies a number", (_name, field) => {
    expect(cleanFn(field)(123)).toBe("123");
  });
  test.each(
    stringInputs,
  )("%s coerces null and undefined to an empty string rather than throwing", (_name, field) => {
    expect(cleanFn(field)(null)).toBe("");
    expect(cleanFn(field)(undefined)).toBe("");
  });
});
describe("boolean coercion clean fns (util.types.toBool)", () => {
  const boolInputs: [
    string,
    {
      clean?: (value: unknown) => unknown;
    },
  ][] = [
    ["consumerOptions.fromBeginning", fromBeginning],
    ["consumerOptions.autoCommit", autoCommit],
    ["consumerOptions.deserializeKeys", deserializeKeys],
  ];
  test.each(boolInputs)('%s parses the string "true"', (_name, field) => {
    expect(cleanFn(field)("true")).toBe(true);
  });
  test.each(boolInputs)('%s parses the string "false"', (_name, field) => {
    expect(cleanFn(field)("false")).toBe(false);
  });
  test("an empty or absent value falls back to each input's declared default", () => {
    expect(cleanFn(fromBeginning)("")).toBe(false);
    expect(cleanFn(fromBeginning)(undefined)).toBe(false);
    expect(cleanFn(deserializeKeys)(undefined)).toBe(false);
    expect(cleanFn(autoCommit)("")).toBe(true);
    expect(cleanFn(autoCommit)(undefined)).toBe(true);
  });
  test.each(
    boolInputs,
  )("%s coerces an unparseable string to true rather than throwing", (_name, field) => {
    expect(cleanFn(field)("abc")).toBe(true);
  });
});
