import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("sites", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should get root site", async () => {
    const result = await harness.action("getRootSite", {
      connection,
    });
    expect(result).toBeDefined();
  });
});
