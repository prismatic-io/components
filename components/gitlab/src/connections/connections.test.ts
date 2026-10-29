import connections, { accessToken, oauth2 } from "./index";

describe("connections", () => {
  test("registers one connection per auth method", () => {
    expect(connections.map((c) => c.key)).toEqual(["accessToken", "oauth2"]);
  });

  test.each([
    ["accessToken", accessToken],
    ["oauth2", oauth2],
  ])("%s carries the on-prem toggle fields", (_key, definition) => {
    const inputs = definition.inputs as Record<
      string,
      { onPremControlled?: boolean; shown?: boolean; default?: string }
    >;
    for (const field of ["host", "port"]) {
      expect(inputs[field].onPremControlled).toBe(true);
      expect(inputs[field].shown).toBe(false);
    }
    expect(inputs.caCertificate).toBeDefined();
    expect(inputs.ignoreSslErrors.default).toBe("false");
  });

  test("OAuth connection defaults to GitLab.com endpoints and api scope", () => {
    expect(oauth2.inputs.authorizeUrl.default).toBe(
      "https://gitlab.com/oauth/authorize",
    );
    expect(oauth2.inputs.tokenUrl.default).toBe(
      "https://gitlab.com/oauth/token",
    );
    expect(oauth2.inputs.scopes.default).toBe("api");
  });

  test("access token field is a password", () => {
    expect(accessToken.inputs.accessToken.type).toBe("password");
  });
});
