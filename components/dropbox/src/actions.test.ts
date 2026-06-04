import { createHarness } from "@prismatic-io/spectral/dist/testing";
import component from ".";
import { oauthConnection } from "./connections";


const harness = createHarness(component);


const parsedConnection = harness.connectionValue(oauthConnection);

describe("listFolder", () => {
  test("listRootFolder", async () => {
    const result = await harness.action("listFolder", {
      dropboxConnection: parsedConnection, 
      path: "/",
    });
    const { entries: files } = (
      result.data as { result: { entries: { name: string }[] } }
    ).result;
    
    expect(files).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "Public" })]),
    );
  });
});
