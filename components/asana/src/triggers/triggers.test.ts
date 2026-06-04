import {
  createHarness,
  createConnection,
} from "@prismatic-io/spectral/dist/testing";
import { asanaApiKeyConnection } from "../connections";
import component from "..";

jest.setTimeout(30000);








const harness = createHarness(component);
const asanaConnection = createConnection(asanaApiKeyConnection, {
  apiKey: process.env.ASANA_API_KEY,
});
const WORKSPACE_ID = process.env.ASANA_WORKSPACE_ID;
const TRIGGER_ENDPOINT = `${process.env.TRIGGER_ENDPOINT}`;

describe("Test event triggers", () => {
  test("Workspace Projects Trigger Setup", async () => {
    const result = await harness.triggerOnInstanceDeploy(
      "workspaceProjectsTrigger",
      { asanaConnection, workspaceId: WORKSPACE_ID },
      {
        webhookUrls: { myFlow: TRIGGER_ENDPOINT },
        flow: { id: "myId", name: "myFlow" },
      },
    );
    console.log({ result });
  });

  
  
  
  
  
  
  
  
  
  
  
});
