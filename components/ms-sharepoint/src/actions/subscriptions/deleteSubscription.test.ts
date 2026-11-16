import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("subscriptions", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it.skip("should delete subscriptions", async () => {
    const result = await harness.action("deleteSubscription", {
      connection,
      subscriptionId: "a5afc8d3-91c8-4b30-8cc9-47562f9ca66d",
    });
    expect(result).toBeDefined();
  });
});
