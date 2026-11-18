import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createApplicationExamplePayload } from "../../examplePayloads";
import {
  API_PATH,
  connection,
  graphError,
  mockGraph,
  resetNock,
} from "../../testHelpers";
import { deleteApplication } from "./deleteApplication";

const APPLICATION_ID = createApplicationExamplePayload.data.id;

describe("deleteApplication", () => {
  afterEach(resetNock);

  test("happy path returns the delete record on 204", async () => {
    const scope = mockGraph()
      .delete(`${API_PATH}/applications/${APPLICATION_ID}`)
      .reply(204);
    const { result } = await invoke(deleteApplication, {
      connection,
      applicationObjectId: APPLICATION_ID,
    });
    expect(result).toEqual({
      data: {
        success: true,
        id: APPLICATION_ID,
        message: "Application deleted successfully",
      },
    });
    expect(scope.isDone()).toBe(true);
  });

  test("error path surfaces the failure", async () => {
    mockGraph()
      .delete(`${API_PATH}/applications/${APPLICATION_ID}`)
      .reply(404, graphError);
    await expect(
      invoke(deleteApplication, {
        connection,
        applicationObjectId: APPLICATION_ID,
      }),
    ).rejects.toThrow();
  });
});
