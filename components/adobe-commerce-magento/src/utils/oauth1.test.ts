import crypto from "node:crypto";
import {
  buildAuthorizationHeader,
  buildSignatureBaseString,
  normalizeRequestUrl,
  percentEncode,
} from "./oauth1";
const credentials = {
  consumerKey: "consumer-key",
  consumerSecret: "consumer-secret",
  accessToken: "access-token",
  accessTokenSecret: "access-token-secret",
};
describe("percentEncode", () => {
  test("leaves the RFC 3986 unreserved characters untouched", () => {
    const unreserved = "abcXYZ0129-._~";
    expect(percentEncode(unreserved)).toBe(unreserved);
  });
  test.each([
    ["!", "%21"],
    ["*", "%2A"],
    ["'", "%27"],
    ["(", "%28"],
    [")", "%29"],
  ])("encodes %s, which encodeURIComponent does not", (input, expected) => {
    expect(percentEncode(input)).toBe(expected);
  });
  test("encodes a space as %20 rather than a plus sign", () => {
    expect(percentEncode("r b")).toBe("r%20b");
  });
  test.each([
    ["a reserved delimiter", "a=b&c", "a%3Db%26c"],
    [
      "square brackets",
      "searchCriteria[pageSize]",
      "searchCriteria%5BpageSize%5D",
    ],
    ["an already-encoded value", "=%3D", "%3D%253D"],
    ["a multibyte character", "ñ", "%C3%B1"],
  ])("encodes %s", (_label, input, expected) => {
    expect(percentEncode(input)).toBe(expected);
  });
});
describe("normalizeRequestUrl", () => {
  test.each([
    [
      "lowercases the scheme and host",
      "HTTPS://Store.Example.COM/rest/V1/orders",
    ],
    ["drops the query string", "https://store.example.com/rest/V1/orders?a=1"],
    ["drops the fragment", "https://store.example.com/rest/V1/orders#top"],
    [
      "drops the default https port",
      "https://store.example.com:443/rest/V1/orders",
    ],
  ])("%s", (_label, input) => {
    expect(normalizeRequestUrl(input)).toBe(
      "https://store.example.com/rest/V1/orders",
    );
  });
  test("drops the default http port", () => {
    expect(
      normalizeRequestUrl("http://store.example.com:80/rest/V1/orders"),
    ).toBe("http://store.example.com/rest/V1/orders");
  });
  test("preserves a non-default port", () => {
    expect(
      normalizeRequestUrl("https://store.example.com:8443/rest/V1/orders"),
    ).toBe("https://store.example.com:8443/rest/V1/orders");
  });
  test("preserves the case of the path", () => {
    expect(
      normalizeRequestUrl("https://store.example.com/rest/V1/Orders"),
    ).toBe("https://store.example.com/rest/V1/Orders");
  });
});
describe("buildSignatureBaseString", () => {
  test("reproduces the RFC 5849 worked example", () => {
    const baseString = buildSignatureBaseString(
      "POST",
      "http://example.com/request",
      [
        ["b5", "=%3D"],
        ["a3", "a"],
        ["c@", ""],
        ["a2", "r b"],
        ["oauth_consumer_key", "9djdj82h48djs9d2"],
        ["oauth_token", "kkk9d7dh3k39sjv7"],
        ["oauth_signature_method", "HMAC-SHA1"],
        ["oauth_timestamp", "137131201"],
        ["oauth_nonce", "7d8f3e4a"],
        ["c2", ""],
        ["a3", "2 q"],
      ],
    );
    expect(baseString).toBe(
      "POST&http%3A%2F%2Fexample.com%2Frequest&a2%3Dr%2520b%26a3%3D2%2520q%26a3%3Da%26b5%3D%253D%25253D%26c%2540%3D%26c2%3D%26oauth_consumer_key%3D9djdj82h48djs9d2%26oauth_nonce%3D7d8f3e4a%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D137131201%26oauth_token%3Dkkk9d7dh3k39sjv7",
    );
  });
  test("uppercases the HTTP method", () => {
    expect(
      buildSignatureBaseString(
        "get",
        "https://store.example.com/rest/V1/orders",
        [],
      ),
    ).toBe("GET&https%3A%2F%2Fstore.example.com%2Frest%2FV1%2Forders&");
  });
  test("sorts parameters by name", () => {
    const baseString = buildSignatureBaseString(
      "GET",
      "https://store.example.com/v1",
      [
        ["z", "1"],
        ["a", "2"],
        ["m", "3"],
      ],
    );
    expect(baseString.split("&")[2]).toBe(percentEncode("a=2&m=3&z=1"));
  });
  test("breaks a tie on the name by comparing the encoded value", () => {
    const baseString = buildSignatureBaseString(
      "GET",
      "https://store.example.com/v1",
      [
        ["a", "b"],
        ["a", "A"],
        ["a", "1"],
      ],
    );
    expect(baseString.split("&")[2]).toBe(percentEncode("a=1&a=A&a=b"));
  });
  test("orders names by byte value rather than by locale collation", () => {
    const baseString = buildSignatureBaseString(
      "GET",
      "https://store.example.com/v1",
      [
        ["searchCriteria_x", "2"],
        ["searchCriteria[pageSize]", "1"],
      ],
    );
    expect(baseString.split("&")[2]).toBe(
      percentEncode("searchCriteria%5BpageSize%5D=1&searchCriteria_x=2"),
    );
  });
  test("orders an uppercase name before its lowercase form", () => {
    const baseString = buildSignatureBaseString(
      "GET",
      "https://store.example.com/v1",
      [
        ["a", "1"],
        ["A", "2"],
      ],
    );
    expect(baseString.split("&")[2]).toBe(percentEncode("A=2&a=1"));
  });
  test("excludes the query string of the request URL from the normalized URL", () => {
    const baseString = buildSignatureBaseString(
      "GET",
      "https://store.example.com/rest/V1/orders?searchCriteria[pageSize]=10",
      [["searchCriteria[pageSize]", "10"]],
    );
    expect(baseString.split("&")[1]).toBe(
      percentEncode("https://store.example.com/rest/V1/orders"),
    );
  });
});
describe("buildAuthorizationHeader", () => {
  const request = {
    method: "GET",
    url: "https://store.example.com/rest/default/V1/orders",
    params: [] as Array<[string, string]>,
    credentials,
    nonce: "fixed-nonce",
    timestamp: "1700000000",
  };
  test("starts with the OAuth scheme", () => {
    expect(buildAuthorizationHeader(request)).toMatch(/^OAuth /);
  });
  test.each([
    ["oauth_consumer_key", credentials.consumerKey],
    ["oauth_token", credentials.accessToken],
    ["oauth_signature_method", "HMAC-SHA256"],
    ["oauth_version", "1.0"],
    ["oauth_nonce", "fixed-nonce"],
    ["oauth_timestamp", "1700000000"],
  ])("carries %s", (name, value) => {
    expect(buildAuthorizationHeader(request)).toContain(
      `${name}="${percentEncode(value)}"`,
    );
  });
  test("carries a signature", () => {
    expect(buildAuthorizationHeader(request)).toMatch(
      /oauth_signature="[^"]+"/,
    );
  });
  test("signs with HMAC-SHA256 keyed by the two secrets joined with an ampersand", () => {
    const header = buildAuthorizationHeader(request);
    const signature = decodeURIComponent(
      /oauth_signature="([^"]+)"/.exec(header)?.[1] as string,
    );
    const baseString = buildSignatureBaseString(request.method, request.url, [
      ["oauth_consumer_key", credentials.consumerKey],
      ["oauth_nonce", request.nonce],
      ["oauth_signature_method", "HMAC-SHA256"],
      ["oauth_timestamp", request.timestamp],
      ["oauth_token", credentials.accessToken],
      ["oauth_version", "1.0"],
    ]);
    const key = `${percentEncode(credentials.consumerSecret)}&${percentEncode(credentials.accessTokenSecret)}`;
    const expected = crypto
      .createHmac("sha256", key)
      .update(baseString)
      .digest("base64");
    expect(signature).toBe(expected);
  });
  test("never includes the consumer secret or the token secret", () => {
    const header = buildAuthorizationHeader(request);
    expect(header).not.toContain(credentials.consumerSecret);
    expect(header).not.toContain(credentials.accessTokenSecret);
  });
  test("includes the request parameters in the signed material", () => {
    const withParams = buildAuthorizationHeader({
      ...request,
      params: [["searchCriteria[pageSize]", "10"]],
    });
    expect(withParams).not.toBe(buildAuthorizationHeader(request));
  });
  test("percent-encodes the header values", () => {
    const header = buildAuthorizationHeader({
      ...request,
      credentials: { ...credentials, consumerKey: "key with spaces" },
    });
    expect(header).toContain('oauth_consumer_key="key%20with%20spaces"');
  });
  test("generates a distinct nonce and timestamp when none are supplied", () => {
    const first = buildAuthorizationHeader({
      ...request,
      nonce: undefined,
      timestamp: undefined,
    });
    const second = buildAuthorizationHeader({
      ...request,
      nonce: undefined,
      timestamp: undefined,
    });
    expect(first).not.toBe(second);
  });
});
