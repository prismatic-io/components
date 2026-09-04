import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { arenaApiKey } from "../connections";
import { getArenaApiBaseUrl } from "../util/arenaApiUrl";
describe("getArenaApiBaseUrl transport enforcement", () => {
  const withCustomUrl = (customBaseUrl: string) =>
    createConnection(arenaApiKey, {
      baseUrl: "custom",
      customBaseUrl,
      apiKey: "fake-api-key",
      timeout: "3000",
    });
  it("rejects a cleartext custom URL pointing at a remote host", () => {
    expect(() =>
      getArenaApiBaseUrl(withCustomUrl("http://arena.internal.example.com")),
    ).toThrow(/https/i);
  });
  it("names the offending scheme so the connection can be corrected", () => {
    expect(() =>
      getArenaApiBaseUrl(withCustomUrl("ftp://arena.example.com")),
    ).toThrow(/ftp/);
  });
  it("accepts an HTTPS custom URL", () => {
    const result = getArenaApiBaseUrl(
      withCustomUrl("https://arena.example.com"),
    );
    expect(result).toContain("https://arena.example.com");
  });
  it("accepts every preset region unchanged", () => {
    for (const region of [
      "https://api.arenasolutions.com",
      "https://api.arenagov.com",
      "https://api.europe.arenaplm.com",
      "https://api.uk.arenaplm.com",
      "https://api.arenaplm.cn",
    ]) {
      const connection = createConnection(arenaApiKey, {
        baseUrl: region,
        customBaseUrl: "",
        apiKey: "fake-api-key",
        timeout: "3000",
      });
      expect(getArenaApiBaseUrl(connection)).toContain(region);
    }
  });
  it("still allows cleartext to loopback", () => {
    expect(() =>
      getArenaApiBaseUrl(withCustomUrl("http://127.0.0.1:8080")),
    ).not.toThrow();
    expect(() =>
      getArenaApiBaseUrl(withCustomUrl("http://localhost:8080")),
    ).not.toThrow();
  });
  it("rejects a custom URL with no scheme at all", () => {
    expect(() =>
      getArenaApiBaseUrl(withCustomUrl("arena.example.com")),
    ).toThrow();
  });
});
