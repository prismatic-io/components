import { createConnection, createHarness } from "@prismatic-io/spectral/dist/testing";
import component from "../..";
import { jiraOAuthConnection as oauth } from "../../connections";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("issues", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it.each([
    { type: "number", value: "test-201" },
    { type: "summary", value: "issue 20" },
  ])("should find issues that exist", async ({ type, value }) => {
    const result = await harness.action("findIssue", {
      jiraConnection: connection,
      searchType: type,
      searchValue: value,
    });
    expect(result.data[0]).toBeDefined();
  });

  it.each([
    { type: "number", value: "doesnotexist-100" },
    { type: "summary", value: "doesnotexist" },
  ])("should not find issues that do not exist", async ({ type, value }) => {
    const result = await harness.action("findIssue", {
      jiraConnection: connection,
      searchType: type,
      searchValue: value,
    });
    expect((result.data as unknown[]).length).toStrictEqual(0);
  });

  it("should download attachment", async () => {
    const findIssueResult = await harness.action("findIssue", {
      jiraConnection: connection,
      searchType: "summary",
      searchValue: "issue 0",
    });

    const result = await harness.action("downloadAttachment", {
      jiraConnection: connection,
      issueId: findIssueResult.data[0].id,
    });
    expect(result).toBeDefined();
  });
});
