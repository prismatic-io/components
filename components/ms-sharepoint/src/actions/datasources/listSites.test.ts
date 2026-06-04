import { oauth } from "../../connections";
import component from "../..";
import { createConnection, createHarness } from "@prismatic-io/spectral/dist/testing";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("list sites", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should list site lists", async () => {
    const result = await harness.dataSource("listSites", {
      connection,
    });
    expect(result).toBeDefined();
  });
});
