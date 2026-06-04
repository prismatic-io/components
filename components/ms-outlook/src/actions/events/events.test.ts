import { testing } from "@prismatic-io/spectral";
import { oauth } from "../../connections";

import component from "../..";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE ? describe : describe.skip;

describeIntegrationTest("events", () => {
  const harness = testing.createHarness(component);
  const connection = harness.connectionValue(oauth);

  it("should list events", async () => {
    const result = await harness.action("listEvents", {
      connection,
    });
    expect(result).toBeDefined();
  });

  it("should list events on specific calendar", async () => {
    const result = await harness.action("listEvents", {
      connection,
      calendarId:
        "AQMkADFkNzUwNTMwLTVmYjMtNDAxYS1hYzU5LWRiMDkzYTE1YWJmYgBGAAADOKr_A2JphU69L0W8VMPNcwcAfF1ys1G6GE_oFPQz56AKjwAAAgEGAAAAfF1ys1G6GE_oFPQz56AKjwAAAiC0AAAA",
    });
    expect(result).toBeDefined();
  });

  it("should create an event", async () => {
    const result = await harness.action("createEvent", {
      connection,
      locationName: "the place",
      subject: "hello",
      body: "hello world",
      attendees: [{ key: "test@example.com", value: "required" }],
      start: "2022-11-28T10:00:00",
      
      end: "2022-11-28T12:00:00",
      
    });
    expect(result).toBeDefined();
  });

  xit("should delete an event", async () => {
    const result = await harness.action("deleteEvent", {
      connection,
      eventId:
        "AAMkADFkNzUwNTMwLTVmYjMtNDAxYS1hYzU5LWRiMDkzYTE1YWJmYgBGAAAAAAA4qv4DYmmFTr0vRbxUw81zBwB8XXKzUboYT6gU9DPnoAqPAAAAAAENAAB8XXKzUboYT6gU9DPnoAqPAAAnL_-LAAA=",
    });
    expect(result).toBeDefined();
  });
});
