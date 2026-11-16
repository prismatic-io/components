import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("subscriptions", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it.skip("should update subscription", async () => {
    const result = await harness.action("updateSiteListSubscriptionExpiration", {
      connection,
      subscriptionId: "ce653949-36fe-4104-a971-ba0da6fa8703",
    });
    expect(result).toBeDefined();
  });
});
