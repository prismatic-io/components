import { testing } from "@prismatic-io/spectral";
import { oauth } from "../../connections";

import component from "../..";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("calendars", () => {
  const harness = testing.createHarness(component);
  const connection = harness.connectionValue(oauth);

  it("should create a calendar", async () => {
    const result = await harness.action("createCalendar", {
      connection,
      name: "test",
      color: "LightBrown",
    });
    expect(result).toBeDefined();
  });

  it("should update a calendar", async () => {
    const result = await harness.action("updateCalendar", {
      connection,
      id: "AAMkADFkNzUwNTMwLTVmYjMtNDAxYS1hYzU5LWRiMDkzYTE1YWJmYgBGAAAAAAA4qv4DYmmFTr0vRbxUw81zBwB8XXKzUboYT6gU9DPnoAqPAAAAAAEGAAB8XXKzUboYT6gU9DPnoAqPAAAnME5AAAA=",
      name: "foo",
      color: "lightRed",
    });
    expect(result).toBeDefined();
  });

  it("should delete a calendar", async () => {
    const result = await harness.action("deleteCalendar", {
      connection,
      id: "AAMkADFkNzUwNTMwLTVmYjMtNDAxYS1hYzU5LWRiMDkzYTE1YWJmYgBGAAAAAAA4qv4DYmmFTr0vRbxUw81zBwB8XXKzUboYT6gU9DPnoAqPAAAAAAEGAAB8XXKzUboYT6gU9DPnoAqPAAAnME5AAAA=",
    });
    expect(result).toBeDefined();
  });

  it("should list calendars", async () => {
    const result = await harness.action("listCalendars", {
      connection,
    });
    expect(result).toBeDefined();
  });
});
