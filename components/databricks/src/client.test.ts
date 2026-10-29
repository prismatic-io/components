import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { getHostAndApiKey } from "./client";
import { personalAccessToken, workspaceServicePrincipal } from "./connections";

describe("Test deriving host and API key from personal access token connection", () => {
  test("Test when only host name is provided", () => {
    const patWithoutProtocol = createConnection(personalAccessToken, {
      host: "dbc-f9820046-cb31.cloud.databricks.com/",
      apiKey: "example",
    });
    const { host, apiKey } = getHostAndApiKey(patWithoutProtocol);
    expect(host).toBe("https://dbc-f9820046-cb31.cloud.databricks.com");
    expect(apiKey).toBe("example");
  });
  test("Test when host with protocol is provided", () => {
    const patWithoutProtocol = createConnection(personalAccessToken, {
      host: "https://dbc-f9820046-cb31.cloud.databricks.com/",
      apiKey: "example",
    });
    const { host, apiKey } = getHostAndApiKey(patWithoutProtocol);
    expect(host).toBe("https://dbc-f9820046-cb31.cloud.databricks.com");
    expect(apiKey).toBe("example");
  });
  test("Test when user pastes full URL with extraneous paths", () => {
    const patWithoutProtocol = createConnection(personalAccessToken, {
      host: "https://dbc-f9820046-cb31.cloud.databricks.com/explore/data?o=3784865363301458",
      apiKey: "example",
    });
    const { host, apiKey } = getHostAndApiKey(patWithoutProtocol);
    expect(host).toBe("https://dbc-f9820046-cb31.cloud.databricks.com");
    expect(apiKey).toBe("example");
  });
});

describe("Test deriving host and API key from service principal connection", () => {
  test("Test that host can be derived from token URL", () => {
    const wsp = createConnection(
      workspaceServicePrincipal,
      {
        tokenUrl:
          "https://dbc-f9820046-cb31.cloud.databricks.com/oidc/v1/token",
        scopes: "all-apis",
        clientId: "00000000-0000-0000-0000-000000000000",
        clientSecret: "example_secret",
      },
      {
        access_token: "example_access_token",
      },
    );
    const { host, apiKey } = getHostAndApiKey(wsp);
    expect(host).toBe("https://dbc-f9820046-cb31.cloud.databricks.com");
    expect(apiKey).toBe("example_access_token");
  });
});
