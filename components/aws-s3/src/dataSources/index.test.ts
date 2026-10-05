vi.mock("aws-utils", async () => {
  const { input } = await import("@prismatic-io/spectral");
  return {
    assumeRoleConnection: { key: "awsAssumeRole" },
    awsRegion: input({ label: "AWS Region", type: "string", required: false }),
    dynamicAccessAllInputs: {},
    selectRegion: { display: { label: "Select Region" } },
  };
});
import { selectRegion } from "aws-utils";
import dataSources from ".";
import { selectBucket } from "./selectBucket";
describe("dataSources", () => {
  test("registers every data source under its published key", () => {
    expect(dataSources).toEqual({ selectBucket, selectRegion });
    expect(Object.keys(dataSources).sort()).toEqual([
      "selectBucket",
      "selectRegion",
    ]);
  });
});
