import { util } from "@prismatic-io/spectral";
import { loggerMock } from "@prismatic-io/spectral/testing";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
  GOOGLE_ADS_VERSION_SUNSETS,
} from "../constants";
import { validateApiVersion } from "./apiVersion";

const majorVersion = (version: string): number =>
  util.types.toInt(version.replace("v", ""));

describe("version floor vs. Google's sunset schedule", () => {
  const LEAD_DAYS = 30;

  test("the floor is not within LEAD_DAYS of its sunset month", () => {
    const sunsetMonth =
      GOOGLE_ADS_VERSION_SUNSETS[GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION];
    expect(sunsetMonth).toBeDefined();
    const sunsetStart = util.types
      .toDate(`${sunsetMonth}-01T00:00:00Z`)
      .getTime();
    const cutoff = sunsetStart - LEAD_DAYS * 24 * 60 * 60 * 1000;
    expect(Date.now()).toBeLessThan(cutoff);
  });

  test("the default is the newest version in the sunset table", () => {
    const newest = Object.keys(GOOGLE_ADS_VERSION_SUNSETS)
      .sort((a, b) => majorVersion(a) - majorVersion(b))
      .pop();
    expect(GOOGLE_ADS_API_VERSION).toBe(newest);
  });

  test("the table starts at the floor", () => {
    const floor = majorVersion(GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION);
    const versions = Object.keys(GOOGLE_ADS_VERSION_SUNSETS).map(majorVersion);
    expect(Math.min(...versions)).toBe(floor);
  });
});

describe("validateApiVersion", () => {
  test("falls back to the default version when none is configured", () => {
    const logger = loggerMock();
    expect(validateApiVersion("", logger)).toBe(GOOGLE_ADS_API_VERSION);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  test("passes an in-range version through unchanged", () => {
    const logger = loggerMock();
    expect(validateApiVersion(GOOGLE_ADS_API_VERSION, logger)).toBe(
      GOOGLE_ADS_API_VERSION,
    );
    expect(logger.warn).not.toHaveBeenCalled();
  });

  test("passes the floor version itself through unchanged", () => {
    const logger = loggerMock();
    expect(
      validateApiVersion(GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION, logger),
    ).toBe(GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  test("raises a below-floor version to the minimum and warns", () => {
    const logger = loggerMock();
    const belowFloor = `v${
      Number(GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION.replace("v", "")) - 1
    }`;
    expect(validateApiVersion(belowFloor, logger)).toBe(
      GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
    );
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining(GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION),
    );
  });

  test("throws on a version that does not match the v{number} format", () => {
    const logger = loggerMock();
    expect(() => validateApiVersion("25", logger)).toThrow(
      "Invalid API version format",
    );
  });
});
