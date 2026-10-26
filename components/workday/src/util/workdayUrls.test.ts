import {
  buildTokenUrl,
  buildWqlPath,
  parseReportUrl,
  parseRestApiEndpoint,
} from "./workdayUrls";
describe("parseRestApiEndpoint", () => {
  it("splits a /ccx REST API Endpoint into base URL and tenant", () => {
    expect(
      parseRestApiEndpoint(
        "https://wd2-impl-services1.workday.com/ccx/api/v1/acme",
      ),
    ).toEqual({
      baseUrl: "https://wd2-impl-services1.workday.com/ccx",
      tenant: "acme",
    });
  });
  it("accepts an endpoint without a path prefix, a trailing slash and whitespace", () => {
    expect(
      parseRestApiEndpoint("  https://host.example/api/v1/acme_2/ "),
    ).toEqual({ baseUrl: "https://host.example", tenant: "acme_2" });
  });
  it("rejects a base URL without the API version and tenant", () => {
    expect(() => parseRestApiEndpoint("https://host.example/ccx")).toThrow(
      /REST API Endpoint must look like/,
    );
  });
  it("rejects a WQL or service URL in place of the REST API Endpoint", () => {
    expect(() =>
      parseRestApiEndpoint("https://host.example/ccx/api/wql/v1/acme"),
    ).toThrow(/REST API Endpoint must look like/);
  });
});
describe("parseRestApiEndpoint security", () => {
  it("rejects a plain HTTP endpoint", () => {
    expect(() =>
      parseRestApiEndpoint("http://host.example/ccx/api/v1/acme"),
    ).toThrow(/REST API Endpoint must look like/);
  });
});
describe("parseReportUrl", () => {
  const baseUrl = "https://host.example/ccx";
  it("accepts a report URL on the connection's origin", () => {
    expect(
      parseReportUrl(
        "https://host.example/ccx/service/customreport2/acme/owner/Report",
        baseUrl,
      ).pathname,
    ).toBe("/ccx/service/customreport2/acme/owner/Report");
  });
  it("rejects the same host over plain HTTP", () => {
    expect(() =>
      parseReportUrl("http://host.example/ccx/service/x", baseUrl),
    ).toThrow(/must be on the connection's Workday host/);
  });
  it("rejects a value that isn't a full URL", () => {
    expect(() => parseReportUrl("owner/Report", baseUrl)).toThrow(
      /must be a full URL/,
    );
  });
});
describe("derived URLs", () => {
  const endpoint = { baseUrl: "https://host.example/ccx", tenant: "acme" };
  it("builds the token URL from the base URL and tenant", () => {
    expect(buildTokenUrl(endpoint)).toBe(
      "https://host.example/ccx/oauth2/acme/token",
    );
  });
  it("builds the WQL path for the tenant", () => {
    expect(buildWqlPath("acme")).toBe("/api/wql/v1/acme");
  });
});
