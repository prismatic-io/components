import { docusignOauthConnection } from "./docusignOauthConnection";

describe("docusignOauthConnection", () => {
  describe("headers input", () => {
    const { headers } = docusignOauthConnection.inputs;

    it("keeps the published key so existing connections retain their stored value", () => {
      expect(headers).toBeDefined();
    });

    it("is optional, since the platform sends the client credentials as a Basic header", () => {
      expect(headers.required).toBe(false);
    });

    it("stays a shown key-value list", () => {
      expect(headers.collection).toBe("keyvaluelist");
      expect(headers.shown).toBe(true);
    });
  });
});
