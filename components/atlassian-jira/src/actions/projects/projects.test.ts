import { createConnection, createHarness } from "@prismatic-io/spectral/dist/testing";
import component from "../..";
import { jiraOAuthConnection as oauth } from "../../connections";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("projects", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it.each([
    { type: "name", value: "test" },
    { type: "key", value: "test" },
  ])("should find project named and keyed 'test'", async ({ type, value }) => {
    const result = await harness.action("findProject", {
      jiraConnection: connection,
      searchType: type,
      searchValue: value,
    });
    expect(result.data[0]).toMatchObject({ name: "Test" });
  });

  it.each([
    { type: "name", value: "doesnotexist" },
    { type: "key", value: "doesnotexist" },
  ])("should not find project named 'doesnotexist'", async ({ type, value }) => {
    const result = await harness.action("findProject", {
      jiraConnection: connection,
      searchType: type,
      searchValue: value,
    });
    expect((result.data as unknown[]).length).toStrictEqual(0);
  });
});
