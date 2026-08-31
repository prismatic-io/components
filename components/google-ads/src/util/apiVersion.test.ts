import { loggerMock } from "@prismatic-io/spectral/dist/testing";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION,
} from "../constants";
import { validateApiVersion } from "./apiVersion";
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
    const belowFloor = `v${Number(GOOGLE_ADS_MINIMUM_SUPPORTED_API_VERSION.replace("v", "")) - 1}`;
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
