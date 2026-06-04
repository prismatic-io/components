import { type Connection, ConnectionError } from "@prismatic-io/spectral";
import { fromUnixTime, parseISO as parseISODate } from "date-fns";
import { apiKey } from "../connections/apiKey";
import { oAuth2 } from "../connections/oAuth2";
import { LIMIT_MAX, LIMIT_MIN } from "../constants";
import { cleanIntegerValueList } from "./cleanIntegerValueList";
import { cleanStringValueList } from "./cleanStringValueList";
import { getBaseUrl } from "./getBaseUrl";
import { getConnectionHeaders } from "./getConnectionHeaders";
import { toDate } from "./toDate";
import { toInt } from "./toInt";
import { toStr } from "./toStr";
import { validateConnection } from "./validateConnection";
import { validateId } from "./validateId";
import { validateLimit } from "./validateLimit";

describe("cleanIntegerValueList", () => {
  it("should return an empty array when the input is not an array", () => {
    const input = "not-an-array";
    const result = cleanIntegerValueList(input);

    expect(result).toEqual([]);
  });

  it("should return an empty array when the input is an empty array", () => {
    const input: unknown[] = [];
    const result = cleanIntegerValueList(input);

    expect(result).toEqual([]);
  });

  it("should filter out undefined, null, and empty string values", () => {
    const input = [undefined, null, "", 1, "2"];
    const result = cleanIntegerValueList(input);

    expect(result).toEqual([1, 2]);
  });

  it("should throw an error if a value is not a number.", () => {
    const input = [undefined, null, "", 1, "abc"];

    expect(() => cleanIntegerValueList(input)).toThrow(
      new Error("Value 'abc' cannot be coerced to int."),
    );
  });

  it("should correctly convert valid numeric strings to integers", () => {
    const input = ["1", "2", "3"];
    const result = cleanIntegerValueList(input);

    expect(result).toEqual([1, 2, 3]);
  });

  it("should handle mixed data types and return valid integers only", () => {
    const input = ["1", 3, 4.5, "6"];
    const result = cleanIntegerValueList(input);

    expect(result).toEqual([1, 3, 4, 6]);
  });
});

describe("cleanStringValueList", () => {
  it("should return an empty array when the input is not an array", () => {
    const input = "not-an-array";
    const result = cleanStringValueList(input);

    expect(result).toEqual([]);
  });

  it("should return an empty array when the input is an empty array", () => {
    const input: unknown[] = [];
    const result = cleanStringValueList(input);

    expect(result).toEqual([]);
  });

  it("should filter out undefined, null, and empty string values", () => {
    const input = [undefined, null, "", "hello", "world"];
    const result = cleanStringValueList(input);

    expect(result).toEqual(["hello", "world"]);
  });

  it("should correctly convert values to strings", () => {
    const input = [1, true, "string", null, undefined, "", "test"];
    const result = cleanStringValueList(input);

    expect(result).toEqual(["1", "true", "string", "test"]);
  });

  it("should handle mixed data types and return valid strings only", () => {
    const input = ["hello", 42, true, {}, [], "world"];
    const result = cleanStringValueList(input);

    expect(result).toEqual([
      "hello",
      "42",
      "true",
      "[object Object]",
      "",
      "world",
    ]);
  });
});

describe("getConnectionHeaders", () => {
  it("should return headers with API key for apiKey", () => {
    const connection: Connection = {
      key: apiKey.key,
      fields: { apiKey: "test-api-key", username: "john@example.com" },
      configVarKey: "API_KEY",
    };
    const result = getConnectionHeaders(connection);
    const basicToken = Buffer.from(
      `${connection.fields.username}:${connection.fields.apiKey}`,
    ).toString("base64");

    expect(result).toEqual({
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Basic ${basicToken}`,
    });
  });

  it("should return headers with access token for oAuth2", () => {
    const connection: Connection = {
      key: oAuth2.key,
      token: {
        access_token: "test-access-token",
      },
      fields: {},
      configVarKey: "OAUTH2_KEY",
    };
    const result = getConnectionHeaders(connection);

    expect(result).toEqual({
      accept: "application/json",
      "content-type": "application/json",
      Authorization: "Bearer test-access-token",
    });
  });

  it("should return an empty object for unknown connection key", () => {
    const connection: Connection = {
      key: "unknown-connection-key",
      fields: {},
      configVarKey: "UNKNOWN_KEY",
    };
    const result = getConnectionHeaders(connection);

    expect(result).toEqual({});
  });
});

describe("validateConnection", () => {
  it("should throw an error if connection key is missing", () => {
    const connection: Connection = {
      key: "",
      fields: {},
      configVarKey: "MISSING_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(connection, "Connection key is required."),
    );
  });

  it("should validate API key connection successfully", () => {
    const connection: Connection = {
      key: apiKey.key,
      fields: {
        apiKey: "test-api-key",
        domain: "example",
        username: "john@example.com",
      },
      configVarKey: "API_KEY",
    };

    expect(() => validateConnection(connection)).not.toThrow();
  });

  it("should throw an error if API key is missing in API key connection", () => {
    const connection: Connection = {
      key: apiKey.key,
      fields: {
        apiKey: "",
        domain: "example",
        username: "john@example.com",
      },
      configVarKey: "API_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "API Key is required for this connection.",
      ),
    );
  });

  it("should throw an error if domain is missing in API key connection", () => {
    const connection: Connection = {
      key: apiKey.key,
      fields: {
        apiKey: "test-api-key",
        username: "john@example.com",
        domain: "",
      },
      configVarKey: "API_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "Domain is required for this connection.",
      ),
    );
  });

  it("should throw an error if username is missing in API key connection", () => {
    const connection: Connection = {
      key: apiKey.key,
      fields: {
        apiKey: "test-api-key",
        username: "",
        domain: "example",
      },
      configVarKey: "API_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "Username is required for this connection.",
      ),
    );
  });

  it("should validate OAuth2 connection successfully", () => {
    const connection: Connection = {
      key: oAuth2.key,
      fields: {
        authorizeUrl: "https://authorize.com",
        domain: "example",
        tokenUrl: "https://token.com",
      },
      token: {
        access_token: "test-access-token",
      },
      configVarKey: "OAUTH2_KEY",
    };

    expect(() => validateConnection(connection)).not.toThrow();
  });

  it("should throw an error if access token is missing in OAuth2 connection", () => {
    const connection: Connection = {
      key: oAuth2.key,
      fields: {
        authorizeUrl: "https://authorize.com",
        domain: "example",
        tokenUrl: "https://token.com",
      },
      token: {
        access_token: "",
      },
      configVarKey: "OAUTH2_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "Access Token is required for this connection.",
      ),
    );
  });

  it("should throw an error if authorize URL is missing in OAuth2 connection", () => {
    const connection: Connection = {
      key: oAuth2.key,
      fields: {
        authorizeUrl: "",
        domain: "example",
        tokenUrl: "https://token.com",
      },
      token: {
        access_token: "test-access-token",
      },
      configVarKey: "OAUTH2_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "Authorize URL is required for this connection.",
      ),
    );
  });

  it("should throw an error if domain is missing in OAuth2 connection", () => {
    const connection: Connection = {
      key: oAuth2.key,
      fields: {
        authorizeUrl: "https://authorize.com",
        domain: "",
        tokenUrl: "https://token.com",
      },
      token: {
        access_token: "test-access-token",
      },
      configVarKey: "OAUTH2_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "Domain is required for this connection.",
      ),
    );
  });

  it("should throw an error if token URL is missing in OAuth2 connection", () => {
    const connection: Connection = {
      key: oAuth2.key,
      fields: {
        authorizeUrl: "https://authorize.com",
        domain: "example",
        tokenUrl: "",
      },
      token: {
        access_token: "test-access-token",
      },
      configVarKey: "OAUTH2_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        "Token URL is required for this connection.",
      ),
    );
  });

  it("should throw an error for unsupported connection key", () => {
    const connection: Connection = {
      key: "unsupported-key",
      fields: {},
      configVarKey: "UNSUPPORTED_KEY",
    };

    expect(() => validateConnection(connection)).toThrow(
      new ConnectionError(
        connection,
        `Connection ${connection.key} is not supported.`,
      ),
    );
  });
});

describe("validateId", () => {
  it("should return the input value if it is a valid integer greater than or equal to 1", () => {
    const value = "5";
    const result = validateId(value);

    expect(result).toBe(5);
  });

  it("should throw an error if the input value is less than 1", () => {
    const value = "0";

    expect(() => validateId(value)).toThrow(
      new Error("ID must be greater than or equal to 1. Received: 0"),
    );
  });

  it("should throw an error if the input value is not a valid integer", () => {
    const value = "abc";

    expect(() => validateId(value)).toThrow(
      new Error("Value 'abc' cannot be coerced to int."),
    );
  });

  it("should handle negative numbers by throwing an error", () => {
    const value = "-10";

    expect(() => validateId(value)).toThrow(
      new Error("ID must be greater than or equal to 1. Received: -10"),
    );
  });
});

describe("validateLimit", () => {
  it(`should return the input value if it is within the default range (${LIMIT_MIN} to ${LIMIT_MAX})`, () => {
    const value = "50";
    const result = validateLimit(value);

    expect(result).toBe(50);
  });

  it(`should throw an error if the input value is less than the default minimum (${LIMIT_MIN})`, () => {
    const value = "0";

    expect(() => validateLimit(value)).toThrow(
      new Error(
        `Limit must be between ${LIMIT_MIN} and ${LIMIT_MAX}. Received: ${value}`,
      ),
    );
  });

  it(`should throw an error if the input value is greater than the default maximum (${LIMIT_MAX})`, () => {
    const value = "150";

    expect(() => validateLimit(value)).toThrow(
      new Error(
        `Limit must be between ${LIMIT_MIN} and ${LIMIT_MAX}. Received: ${value}`,
      ),
    );
  });

  it("should return the input value if it is within a custom range", () => {
    const value = "20";
    const result = validateLimit(value, 10, 30);

    expect(result).toBe(20);
  });

  it("should throw an error if the input value is less than the custom minimum", () => {
    const value = "5";
    const minValue = 10;
    const maxValue = 30;

    expect(() => validateLimit(value, minValue, maxValue)).toThrow(
      new Error(
        `Limit must be between ${minValue} and ${maxValue}. Received: ${value}`,
      ),
    );
  });

  it("should throw an error if the input value is greater than the custom maximum", () => {
    const value = "35";
    const minValue = 10;
    const maxValue = 30;

    expect(() => validateLimit(value, minValue, maxValue)).toThrow(
      new Error(
        `Limit must be between ${minValue} and ${maxValue}. Received: ${value}`,
      ),
    );
  });

  it("should throw an error if the input value is not a valid integer", () => {
    const value = "abc";

    expect(() => validateLimit(value)).toThrow(
      new Error("Value 'abc' cannot be coerced to int."),
    );
  });
});

describe("toInt", () => {
  test("should convert a number string to an integer", () => {
    expect(toInt("123")).toBe(123);
  });

  test("should return the number if input is already a number", () => {
    expect(toInt(456)).toBe(456);
  });

  test("should throw an error if the input value is not a valid integer", () => {
    expect(() => toInt("abc")).toThrow(
      new Error("Value 'abc' cannot be coerced to int."),
    );
  });

  test("should return undefined for null", () => {
    expect(toInt(null)).toBeUndefined();
  });

  test("should return undefined for undefined", () => {
    expect(toInt(undefined)).toBeUndefined();
  });

  test("should handle boolean false as undefined", () => {
    expect(toInt(false)).toBeUndefined();
  });

  test("should convert a numeric string with spaces to an integer", () => {
    expect(toInt(" 789 ")).toBe(789);
  });
});

describe("toStr", () => {
  it("should return a string representation for truthy values", () => {
    expect(toStr("hello")).toBe("hello");
  });

  it("should return undefined for falsy values", () => {
    expect(toStr("")).toBeUndefined();
  });

  it("should handle various data types correctly", () => {
    expect(toStr(123)).toBe("123");
    expect(toStr({ key: "value" })).toBe("[object Object]");
    expect(toStr([1, 2, 3])).toBe("1,2,3");
  });

  it("should handle undefined and null correctly", () => {
    expect(toStr(undefined)).toBeUndefined();
    expect(toStr(null)).toBeUndefined();
  });
});

describe("toDate", () => {
  it("should convert a valid date string to a Date object", () => {
    const testValue = "2020-01-01";

    expect(toDate(testValue)).toEqual(parseISODate(testValue));
  });

  it("should return undefined for null input", () => {
    const result = toDate(null);

    expect(result).toBeUndefined();
  });

  it("should return undefined for undefined input", () => {
    const result = toDate(undefined);

    expect(result).toBeUndefined();
  });

  it("should handle other types of inputs gracefully", () => {
    const testValue = 12345;

    expect(toDate(testValue)).toEqual(fromUnixTime(testValue));
  });
});

describe("getBaseUrl", () => {
  it("should construct the correct URL for a given domain", () => {
    const domain = "example";

    expect(getBaseUrl(domain)).toEqual(`https://${domain}.gorgias.com/api`);
  });

  it("should throw an error if no domain is provided", () => {
    expect(() => getBaseUrl(null)).toThrow(
      "Domain is required for this connection.",
    );
  });

  it("should handle different types of inputs gracefully", () => {
    const domain = 12345;
    const expectedDomain = "12345";

    expect(getBaseUrl(domain)).toEqual(
      `https://${expectedDomain}.gorgias.com/api`,
    );
  });
});
