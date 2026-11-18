import { invoke } from "@prismatic-io/spectral/dist/testing";
import { SUCCESS_RESPONSE } from "../../constants";
import { upsertApplicationExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { upsertApplication } from "./upsertApplication";

const UPSERT_PATH = `${API_PATH}/applications(uniqueName='MyApplication')`;

describe("upsertApplication", () => {
  afterEach(resetNock);

  test("happy path patches by unique name with the upsert header", async () => {
    const scope = mockGraph()
      .matchHeader("Prefer", "create-if-missing")
      .patch(UPSERT_PATH, { displayName: "My Application" })
      .reply(201, upsertApplicationExamplePayload.data);
    const { result } = await invoke(upsertApplication, {
      connection,
      uniqueName: "MyApplication",
      useAsUpsert: true,
      displayName: "My Application",
      additionalProperties: undefined,
    });
    expect(result).toEqual(upsertApplicationExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("happy path returns the success response when an update replies 204", async () => {
    mockGraph().patch(UPSERT_PATH).reply(204);
    const { result } = await invoke(upsertApplication, {
      connection,
      uniqueName: "MyApplication",
      useAsUpsert: false,
      displayName: "My Application",
      additionalProperties: undefined,
    });
    expect(result).toEqual({ data: SUCCESS_RESPONSE });
  });

  test("error path surfaces the failure", async () => {
    mockGraph().patch(UPSERT_PATH).reply(404, graphError);
    await expect(
      invoke(upsertApplication, {
        connection,
        uniqueName: "MyApplication",
        useAsUpsert: false,
        displayName: "My Application",
        additionalProperties: undefined,
      }),
    ).rejects.toThrow();
  });
});
