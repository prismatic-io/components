import { testing } from "@prismatic-io/spectral";
import { oauth } from "../connections";

import component from "..";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE
  ? describe
  : describe.skip;

describeIntegrationTest("dataSources", () => {
  const harness = testing.createHarness(component);
  const connection = harness.connectionValue(oauth);

  it("should return a list of business name", async () => {
    const { result } = await harness.dataSource("businessNames", {
      connection,
    });
    expect(Array.isArray(result)).toBe(true);
  });
});
