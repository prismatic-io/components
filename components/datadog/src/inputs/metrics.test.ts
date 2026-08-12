import {
  metricInterval,
  metricName,
  metricSeries,
  metricsFrom,
  metricsHost,
  metricsQuery,
  metricsTagFilter,
  metricTags,
  metricTimestamp,
  metricType,
  metricUnit,
  metricValue,
  resourceName,
  resourceType,
} from "./metrics";
describe("metricValue.clean", () => {
  test("coerces a numeric string to a number", () => {
    expect(metricValue.clean("0.7")).toBe(0.7);
    expect(metricValue.clean("")).toBe(0);
  });
  test("throws on a non-numeric string", () => {
    expect(() => metricValue.clean("abc")).toThrow();
  });
});
describe("metricsFrom.clean", () => {
  test("coerces a Unix timestamp string to a number", () => {
    expect(metricsFrom.clean("1636629071")).toBe(1636629071);
  });
  test("throws on a non-numeric string", () => {
    expect(() => metricsFrom.clean("abc")).toThrow();
  });
});
describe("metricTimestamp.clean", () => {
  test("coerces a Unix timestamp string to a number", () => {
    expect(metricTimestamp.clean("1636629071")).toBe(1636629071);
  });
  test("returns undefined when unset", () => {
    expect(metricTimestamp.clean(undefined)).toBeUndefined();
    expect(metricTimestamp.clean("")).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => metricTimestamp.clean("abc")).toThrow();
  });
});
describe("metricInterval.clean", () => {
  test("coerces an interval string to a number", () => {
    expect(metricInterval.clean("60")).toBe(60);
  });
  test("returns undefined when unset", () => {
    expect(metricInterval.clean(undefined)).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => metricInterval.clean("abc")).toThrow();
  });
});
describe("metricType.clean", () => {
  test("coerces a metric type string to a number", () => {
    expect(metricType.clean("3")).toBe(3);
  });
  test("returns undefined when unset", () => {
    expect(metricType.clean(undefined)).toBeUndefined();
  });
  test("throws on a non-numeric string", () => {
    expect(() => metricType.clean("abc")).toThrow();
  });
});
describe("metricSeries.clean", () => {
  test("parses a JSON array string into an array", () => {
    const series = [
      {
        metric: "system.load.1",
        points: [{ timestamp: 1636629071, value: 0.7 }],
      },
    ];
    expect(metricSeries.clean(JSON.stringify(series))).toEqual(series);
  });
  test("returns an already-parsed value as-is", () => {
    const series = [{ metric: "system.load.1", points: [] }];
    expect(metricSeries.clean(series)).toEqual(series);
  });
  test("returns a malformed JSON string unchanged", () => {
    expect(metricSeries.clean('[{"metric": ')).toBe('[{"metric": ');
  });
});
describe("metricTags.clean", () => {
  test("passes the tag list through unchanged", () => {
    const tags = ["environment:production", "region:us-east-1"];
    expect(metricTags.clean(tags)).toBe(tags);
  });
});
describe("metricName.clean", () => {
  test("coerces the value to a string", () => {
    expect(metricName.clean("system.load.1")).toBe("system.load.1");
    expect(metricName.clean(123)).toBe("123");
  });
  test("returns an empty string when unset", () => {
    expect(metricName.clean(undefined)).toBe("");
  });
});
describe("metricsQuery.clean", () => {
  test("coerces the value to a string", () => {
    expect(metricsQuery.clean("system.cpu")).toBe("system.cpu");
  });
  test("returns an empty string when unset", () => {
    expect(metricsQuery.clean(undefined)).toBe("");
  });
});
describe.each([
  ["metricUnit", metricUnit],
  ["resourceName", resourceName],
  ["resourceType", resourceType],
  ["metricsHost", metricsHost],
  ["metricsTagFilter", metricsTagFilter],
])("%s.clean", (_label, field) => {
  test("coerces a supplied value to a string", () => {
    expect(field.clean("my-value")).toBe("my-value");
  });
  test("returns undefined for a falsy value", () => {
    expect(field.clean(undefined)).toBeUndefined();
    expect(field.clean("")).toBeUndefined();
  });
});
