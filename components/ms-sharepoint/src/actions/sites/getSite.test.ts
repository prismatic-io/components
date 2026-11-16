import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("sites", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should get site", async () => {
    const result = await harness.action("getSite", {
      connection,
      siteId: "example.sharepoint.com",
    });
    expect(result).toBeDefined();
  });
});
