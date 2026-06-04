import { oauth } from "../connections";
import component from "..";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createHarness } from "@prismatic-io/spectral/dist/testing";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

const harness = createHarness(component);
const connection = createConnection(oauth, {});

describeIntegrationTest("lists", () => {
  it("should list site lists", async () => {
    const result = await harness.action("listSiteLists", {
      connection,
      siteId:
        "example.sharepoint.com,6c44888f-4774-4ef0-b542-d21a795cfea6,80f1bb04-d076-4cb1-9fb7-3f7264e77163",
    });
    expect(result).toBeDefined();
  });
});
