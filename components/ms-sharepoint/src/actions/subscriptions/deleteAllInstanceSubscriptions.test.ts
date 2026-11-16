import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("subscriptions", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it.skip("should delete all instance subscriptions", async () => {
    const result = await harness.action(
      "deleteAllInstanceSubscriptions",
      {
        connection,
      },
      {
        webhookUrls: {
          exampleFlow:
            "https://hooks.example.prismatic-dev.io/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmVkNTY5YTc3LWQ2MDgtNDQ3Zi04YzhhLTYxOWZlYjA0YjY0MA==",
        },
      },
    );
    expect(result).toBeDefined();
  });
});
