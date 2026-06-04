import { createConnection, createHarness } from "@prismatic-io/spectral/dist/testing";
import component from "../..";
import { jiraOAuthConnection as oauth } from "../../connections";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("utilities", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should list issue fields", async () => {
    const result = await harness.action("listIssueFields", {
      jiraConnection: connection,
    });
    expect(result).toBeDefined();
  });

  it("should list issue custom fields", async () => {
    const result = await harness.action("listIssueCustomFields", {
      jiraConnection: connection,
    });
    expect(result).toBeDefined();
  });
});
