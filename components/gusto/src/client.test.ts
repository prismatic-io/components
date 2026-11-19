import type { Connection } from "@prismatic-io/spectral";
import { getBaseUrl } from "./client";
import {
  PRODUCTION_AUTHORIZE_URL,
  PRODUCTION_BASE_URL,
  SANDBOX_AUTHORIZE_URL,
  SANDBOX_BASE_URL,
} from "./constants";

describe("getBaseUrl", () => {
  it("returns production URL when authorizeUrl is production", () => {
    const connection = {
      fields: { authorizeUrl: PRODUCTION_AUTHORIZE_URL },
    } as unknown as Connection;

    expect(getBaseUrl(connection)).toBe(PRODUCTION_BASE_URL);
  });

  it("returns sandbox URL when authorizeUrl is not production", () => {
    const connection = {
      fields: { authorizeUrl: SANDBOX_AUTHORIZE_URL },
    } as unknown as Connection;

    expect(getBaseUrl(connection)).toBe(SANDBOX_BASE_URL);
  });
});
