import { oauth } from "../../connections/oauth";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/testing";

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
});
