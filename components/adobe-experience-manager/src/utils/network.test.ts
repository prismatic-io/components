import { assertPublicUrl, isBlockedAddress } from "./network";

describe("isBlockedAddress", () => {
  test.each([
    "127.0.0.1",
    "10.1.2.3",
    "172.16.0.1",
    "192.168.1.1",
    "169.254.169.254",
    "100.64.0.1",
    "0.0.0.0",
    "::1",
    "::",
    "fd00::1",
    "fe80::1",
    "::ffff:127.0.0.1",
    "64:ff9b::a9fe:a9fe",
    "64:ff9b::169.254.169.254",
    "2002:a9fe:a9fe::1",
    "::169.254.169.254",
    "::a9fe:a9fe",
  ])("blocks %s", (address) => {
    expect(isBlockedAddress(address)).toBe(true);
  });

  test.each([
    "93.184.216.34",
    "2606:2800:220:1:248:1893:25c8:1946",
    "64:ff9b::5db8:d822",
    "2002:5db8:d822::1",
    "www.example.com",
  ])("allows %s", (address) => {
    expect(isBlockedAddress(address)).toBe(false);
  });
});

describe("assertPublicUrl", () => {
  test("accepts an https URL on a public host name", () => {
    expect(() => assertPublicUrl("https://www.example.com/sitemap.xml")).not.toThrow();
  });

  test("rejects a non-https URL", () => {
    expect(() => assertPublicUrl("http://www.example.com/sitemap.xml")).toThrow(
      "Only https:// URLs may be fetched. Received: http://www.example.com/sitemap.xml",
    );
  });

  test("rejects blocked IPv4 and bracketed IPv6 literals", () => {
    expect(() => assertPublicUrl("https://169.254.169.254/latest/meta-data")).toThrow(
      "Refusing to fetch a non-public address: 169.254.169.254",
    );
    expect(() => assertPublicUrl("https://[::1]/")).toThrow(
      "Refusing to fetch a non-public address: [::1]",
    );
  });
});
