import { invoke } from "@prismatic-io/spectral/dist/testing";
import { failedSyncsExample, successfulSyncsExample } from "../exampleInputs";
import { apiPath, rampNock, resetNock, testConnection } from "../testHarness";
import { postSyncStatus } from "./postSyncStatus";
const PATH = apiPath("/accounting/syncs");
const IDEMPOTENCY_KEY = "d471d830-2e73-4082-8a75-68540f83e86e";
const postSyncStatusStub = { sync_id: "4d2f6e05-9a1c-4f3b-8c27-1b6ae95f0d84" };
describe("postSyncStatus", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the sync result", async () => {
    rampNock()
      .post(PATH, {
        failed_syncs: failedSyncsExample,
        idempotency_key: IDEMPOTENCY_KEY,
        successful_syncs: successfulSyncsExample,
        sync_type: "TRANSACTION_SYNC",
      })
      .reply(200, postSyncStatusStub);
    const { result } = await invoke(postSyncStatus, {
      connection: testConnection,
      idempotency_key: IDEMPOTENCY_KEY,
      sync_type: "TRANSACTION_SYNC",
      failed_syncs: failedSyncsExample,
      successful_syncs: successfulSyncsExample,
    });
    expect(result.data).toEqual(postSyncStatusStub);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .post(PATH)
      .reply(422, { error: { message: "Invalid sync payload" } });
    await expect(
      invoke(postSyncStatus, {
        connection: testConnection,
        idempotency_key: IDEMPOTENCY_KEY,
        sync_type: "TRANSACTION_SYNC",
        failed_syncs: failedSyncsExample,
        successful_syncs: successfulSyncsExample,
      }),
    ).rejects.toThrow();
  });
});
