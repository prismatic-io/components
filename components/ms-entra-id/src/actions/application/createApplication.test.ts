import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createApplicationExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { createApplication } from "./createApplication";

describe("createApplication", () => {
  afterEach(resetNock);

  test("happy path posts the display name merged with additional properties", async () => {
    const scope = mockGraph()
      .post(`${API_PATH}/applications`, {
        displayName: "My Application",
        signInAudience: "AzureADMyOrg",
      })
      .reply(201, createApplicationExamplePayload.data);
    const { result } = await invoke(createApplication, {
      connection,
      displayName: "My Application",
      additionalProperties: { signInAudience: "AzureADMyOrg" },
    });
    expect(result).toEqual(createApplicationExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph().post(`${API_PATH}/applications`).reply(400, graphError);
    await expect(
      invoke(createApplication, {
        connection,
        displayName: "My Application",
        additionalProperties: undefined,
      }),
    ).rejects.toThrow();
  });
});
