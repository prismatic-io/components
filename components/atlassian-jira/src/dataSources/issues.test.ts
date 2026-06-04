import { createConnection, createHarness } from "@prismatic-io/spectral/dist/testing";
import component from "..";
import { jiraOAuthConnection as oauth } from "../connections";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("issues data sources", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should show issue types", async () => {
    const result = await harness.dataSource("selectIssueTypes", {
      connection,
      projectIds: "10000",
    });
    expect(result).toBeDefined();
  });

  it("should show issue types based on project object selection", async () => {
    const result = await harness.dataSource("selectIssueTypes", {
      connection,
      projectIds: [
        { object: { key: "10000", label: "Foo" } },
        { object: { key: "10002", label: "Baz" } },
      ],
    });
    expect(result).toBeDefined();
  });

  it("should show issue fields", async () => {
    const result = await harness.dataSource("issueFields", {
      connection,
    });
    expect(result).toBeDefined();
  });
});
