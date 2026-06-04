import type { Element } from "@prismatic-io/spectral";
import { testing } from "@prismatic-io/spectral";
import { oauth } from "../connections";

import component from "..";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE
  ? describe
  : describe.skip;

describeIntegrationTest("dataSources", () => {
  const harness = testing.createHarness(component);
  const connection = harness.connectionValue(oauth);

  it("should return list of teams", async () => {
    const { result } = await harness.dataSource("teamNames", {
      connection,
    });
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return list of channels", async () => {
    const teamResult = await harness.dataSource("teamNames", {
      connection,
    });

    const { result } = await harness.dataSource("channelNames", {
      connection,
      teamId: (teamResult.result[0] as Element).key,
    });
    expect(Array.isArray(result)).toBe(true);
  });
});
