import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import component from ".";
import { arenaPlmBasicAuth } from "./connections";


const describeIntegrationTest = process.env.PRISMATIC_CONNECTION_VALUE
  ? describe
  : describe.skip;

const harness = createHarness(component);
const connection = createConnection(arenaPlmBasicAuth, {
  email: process.env.ARENA_PLM_EMAIL || "",
  password: process.env.ARENA_PLM_PASSWORD || "",
  workspaceId: process.env.ARENA_PLM_WORKSPACE_ID || "",
});

describeIntegrationTest("Test Raw Request", () => {
  test("Test getting items", async () => {
    const result = await harness.action("rawRequest", {
      connection,
      method: "GET",
      url: "/v1/items",
    });
    console.log(result);
  });
});
