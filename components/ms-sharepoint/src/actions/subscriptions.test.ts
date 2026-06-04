import { oauth } from "../connections";
import component from "..";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createHarness } from "@prismatic-io/spectral/dist/testing";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("subscriptions", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should create subscription", async () => {
    const result = await harness.action("createSiteListSubscription", {
      connection,
      siteId:
        "example.sharepoint.com,6c44888f-4774-4ef0-b542-d21a795cfea6,80f1bb04-d076-4cb1-9fb7-3f7264e77163",
      listId: "996d383f-4cb4-4f88-a591-3de0fe865b17",
      notificationUrl:
        "https://hooks.example.prismatic-dev.io/trigger/SW5zdGFuY2VGbG93Q29uZmlnOmVkNTY5YTc3LWQ2MDgtNDQ3Zi04YzhhLTYxOWZlYjA0YjY0MA==",
      allowDuplicates: "true",
    });
    expect(result).toBeDefined();
  });

  it("should list subscriptions", async () => {
    const result = await harness.action("listSubscriptions", {
      connection,
      showInstanceWebhooks: "false",
    });
    expect(result).toBeDefined();
  });

  xit("should update subscription", async () => {
    const result = await harness.action("updateSiteListSubscriptionExpiration", {
      connection,
      subscriptionId: "ce653949-36fe-4104-a971-ba0da6fa8703",
    });
    expect(result).toBeDefined();
  });

  xit("should delete subscriptions", async () => {
    const result = await harness.action("deleteSubscription", {
      connection,
      subscriptionId: "a5afc8d3-91c8-4b30-8cc9-47562f9ca66d",
    });
    expect(result).toBeDefined();
  });

  xit("should delete all instance subscriptions", async () => {
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
