import { oauth } from "../connections";

import component from "..";
import { createHarness } from "@prismatic-io/spectral/dist/testing";
import { createConnection } from "@prismatic-io/spectral/dist/testing";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("sites", () => {
  const harness = createHarness(component);
  const connection = createConnection(oauth, {});

  it("should get root site", async () => {
    const result = await harness.action("getRootSite", {
      connection,
    });
    expect(result).toBeDefined();
  });

  it("should list sites", async () => {
    const result = await harness.action("listSites", {
      connection,
    });
    expect(result).toBeDefined();
  });

  it("should list followed sites", async () => {
    const result = await harness.action("listFollowedSites", {
      connection,
    });
    expect(result).toBeDefined();
  });

  it("should get site", async () => {
    const result = await harness.action("getSite", {
      connection,
      siteId: "example.sharepoint.com",
    });
    expect(result).toBeDefined();
  });
});
