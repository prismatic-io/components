import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getReimbursementResponse } from "../../examplePayloads/reimbursements";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getReimbursement } from "./get";
const REIMBURSEMENT_ID = "d47ba06e-14ac-4a7b-89b4-4775412ba545";
const PATH = apiPath(`/reimbursements/${REIMBURSEMENT_ID}`);
describe("getReimbursement", () => {
  afterEach(resetNock);
  test("returns the reimbursement the API replies with", async () => {
    rampNock().get(PATH).reply(200, getReimbursementResponse);
    const { result } = await invoke(getReimbursement, {
      connection: testConnection,
      reimbursementId: REIMBURSEMENT_ID,
    });
    expect(result.data).toEqual(getReimbursementResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Reimbursement not found" } });
    await expect(
      invoke(getReimbursement, {
        connection: testConnection,
        reimbursementId: REIMBURSEMENT_ID,
      }),
    ).rejects.toThrow();
  });
});
