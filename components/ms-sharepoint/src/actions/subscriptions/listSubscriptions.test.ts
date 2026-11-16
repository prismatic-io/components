import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("subscriptions", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should list subscriptions", async () => {
    const result = await harness.action("listSubscriptions", {
      connection,
      showInstanceWebhooks: "false",
    });
    expect(result).toBeDefined();
  });
});
