import type { ActionLogger } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import {
  getConnectionHostname,
  getShopifyClient,
  getShopifyGraphQlClient,
  getShopifyHostname,
} from "./client";
import {
  adminApiAccessToken,
  shopifyConnection,
  shopifyTemplatedConnection,
} from "./connections";
import {
  DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
  DEFAULT_SHOPIFY_VERSION,
} from "./constants";

const HOST = "test-store.myshopify.com";

const createLogger = () =>
  ({
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    metric: vi.fn(),
  }) as unknown as ActionLogger & { warn: ReturnType<typeof vi.fn> };

const connectionWithVersion = (apiVersion?: string) =>
  createConnection(adminApiAccessToken, {
    host: HOST,
    adminApiAccessToken: "shpat_test",
    apiVersion,
  });

const restVersion = (client: ReturnType<typeof getShopifyClient>) =>
  client.defaults.baseURL?.split("/admin/api/")[1];
const graphQlVersion = (client: ReturnType<typeof getShopifyGraphQlClient>) =>
  String(Reflect.get(client, "url"))
    .split("/admin/api/")[1]
    .replace("/graphql.json", "");

describe("API version resolution and outdated-version warning", () => {
  const factories = [
    {
      name: "getShopifyClient",
      defaultVersion: DEFAULT_SHOPIFY_VERSION,
      build: (
        apiVersion: string | undefined,
        override: string | undefined,
        logger: ActionLogger,
      ) =>
        restVersion(
          getShopifyClient(
            connectionWithVersion(apiVersion),
            override,
            false,
            logger,
          ),
        ),
    },
    {
      name: "getShopifyGraphQlClient",
      defaultVersion: DEFAULT_SHOPIFY_GRAPHQL_API_VERSION,
      build: (
        apiVersion: string | undefined,
        override: string | undefined,
        logger: ActionLogger,
      ) =>
        graphQlVersion(
          getShopifyGraphQlClient(
            connectionWithVersion(apiVersion),
            override,
            false,
            logger,
          ),
        ),
    },
  ];

  describe.each(factories)("$name", ({ defaultVersion, build }) => {
    test("warns and keeps the connection's version when it is older than the default", () => {
      const logger = createLogger();
      expect(build("2026-01", undefined, logger)).toEqual("2026-01");
      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          `uses Shopify API version 2026-01, which is older than the current default (${defaultVersion})`,
        ),
      );
      expect(logger.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          `Update the API Version field in your connection to ${defaultVersion} or later, or clear it to use the default`,
        ),
      );
    });

    test("does not warn when the connection's version equals the default", () => {
      const logger = createLogger();
      expect(build(defaultVersion, undefined, logger)).toEqual(defaultVersion);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test.each([
      "2099-01",
      "unstable",
    ])("does not warn when the connection's version is %s", (apiVersion) => {
      const logger = createLogger();
      expect(build(apiVersion, undefined, logger)).toEqual(apiVersion);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test.each([
      undefined,
      "",
    ])("uses the default without warning when the connection's version is %j", (apiVersion) => {
      const logger = createLogger();
      expect(build(apiVersion, undefined, logger)).toEqual(defaultVersion);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    test("uses an explicit override without checking the connection's version", () => {
      const logger = createLogger();
      expect(build("2026-01", "2025-10", logger)).toEqual("2025-10");
      expect(logger.warn).not.toHaveBeenCalled();
    });
  });
});

describe("Test getShopifyHostname", () => {
  test.each([
    "YOUR-SHOPIFY-DOMAIN.myshopify.com",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/some/other/path",
    "  YOUR-SHOPIFY-DOMAIN.myshopify.com  ",
    "http://YOUR-SHOPIFY-DOMAIN.myshopify.com",
    "YOUR-SHOPIFY-DOMAIN.MYSHOPIFY.COM",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com:443/admin",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com?foo=1",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com#section",
    "YOUR-SHOPIFY-DOMAIN",
    "  your-shopify-domain  ",
    "https://YOUR-SHOPIFY-DOMAIN",
    "YOUR-SHOPIFY-DOMAIN/",
  ])("parses valid hostname %j", (value) => {
    const result = getShopifyHostname(value);
    expect(result).toEqual("your-shopify-domain.myshopify.com");
  });

  test.each([
    ["some bad value", "some bad value"],
    [
      "my-store.myshopify.com.example.com",
      "my-store.myshopify.com.example.com",
    ],
    ["my-store.custom-domain.com", "my-store.custom-domain.com"],
    [
      "https://example.com/my-store.myshopify.com",
      "https://example.com/my-store.myshopify.com",
    ],
    ["-bad-handle.myshopify.com", "-bad-handle.myshopify.com"],
    ["", ""],
  ])("throws for invalid hostname %j", (value, expectedInMessage) => {
    expect(() => getShopifyHostname(value)).toThrow(
      `Unable to parse hostname "${expectedInMessage}". It should look like "YOUR-SHOPIFY-DOMAIN" or "YOUR-SHOPIFY-DOMAIN.myshopify.com".`,
    );
  });
});

describe("Test getConnectionHostname", () => {
  test("accepts a bare store handle on the Access Token connection", () => {
    const connection = createConnection(adminApiAccessToken, {
      host: "my-store",
    });
    expect(getConnectionHostname(connection)).toEqual("my-store.myshopify.com");
  });

  test("parses the host the OAuth 2.0 connection builds from its shop name", () => {
    const connection = createConnection(shopifyTemplatedConnection, {
      host: "my-store.myshopify.com",
    });
    expect(getConnectionHostname(connection)).toEqual("my-store.myshopify.com");
  });

  test.each([
    ["https://My-Store.myshopify.com/admin", "My-Store.myshopify.com"],
    ["my-store.myshopify.com.example.com", "my-store.myshopify.com"],
  ])("keeps the original parsing on the deprecated OAuth 2.0 connection for %j", (host, expected) => {
    const connection = createConnection(shopifyConnection, { host });
    expect(getConnectionHostname(connection)).toEqual(expected);
  });

  test("still rejects a bare store handle on the deprecated OAuth 2.0 connection", () => {
    const connection = createConnection(shopifyConnection, {
      host: "my-store",
    });
    expect(() => getConnectionHostname(connection)).toThrow(
      'Unable to parse hostname "my-store". It should look like "YOUR-SHOPIFY-DOMAIN.myshopify.com".',
    );
  });
});
