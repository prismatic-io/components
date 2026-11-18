import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getApplicationExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { getApplication } from "./getApplication";

const APPLICATION_ID = getApplicationExamplePayload.data.id;

describe("getApplication", () => {
  afterEach(resetNock);

  test("happy path returns the application", async () => {
    mockGraph()
      .get(`${API_PATH}/applications/${APPLICATION_ID}`)
      .reply(200, getApplicationExamplePayload.data);
    const { result } = await invoke(getApplication, {
      connection,
      applicationObjectId: APPLICATION_ID,
    });
    expect(result).toEqual(getApplicationExamplePayload);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .get(`${API_PATH}/applications/${APPLICATION_ID}`)
      .reply(404, graphError);
    await expect(
      invoke(getApplication, {
        connection,
        applicationObjectId: APPLICATION_ID,
      }),
    ).rejects.toThrow();
  });
});
