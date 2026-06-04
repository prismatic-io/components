import { createConnection, createHarness } from "@prismatic-io/spectral/dist/testing";
import component from "../..";
import { jiraOAuthConnection as oauth } from "../../connections";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("webhooks", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  xit("should create a webhook", async () => {
    const result = await harness.action("createWebhook", {
      jiraConnection: connection,
      webhookUrl: "https://webhook.site/9097fbed-dcb0-4434-b661-dc27234f0fab",
      webhookDetails: [
        {
          jqlFilter: "project = TEST",
          events: ["jira:issue_created"],
        },
      ],
    });
    expect(result).toBeDefined();
  });

  xit("should delete a webhook", async () => {
    const result = await harness.action("deleteWebhook", {
      jiraConnection: connection,
      webhookId: 1,
    });
    expect(result).toBeDefined();
  });

  it("should refresh a webhook", async () => {
    const result = await harness.action("refreshWebhook", {
      jiraConnection: connection,
      webhookId: 2,
    });
    expect(result).toBeDefined();
  });

  it("should list webhooks", async () => {
    const result = await harness.action("listWebhooks", {
      jiraConnection: connection,
    });
    expect(result).toBeDefined();
  });
});
