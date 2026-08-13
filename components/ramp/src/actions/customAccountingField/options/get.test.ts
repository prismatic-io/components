import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomAccountingFieldOptionResponse } from "../../../examplePayloads/customAccountingFieldOption";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../../testHarness";
import { getCustomAccountingFieldOption } from "./get";
const OPTION_ID = "50097";
const PATH = apiPath(`/accounting/field-options/${OPTION_ID}`);
describe("getCustomAccountingFieldOption", () => {
  afterEach(resetNock);
  test("returns the field option the API replies with", async () => {
    rampNock().get(PATH).reply(200, getCustomAccountingFieldOptionResponse);
    const { result } = await invoke(getCustomAccountingFieldOption, {
      connection: testConnection,
      customAccountingFieldOptionId: OPTION_ID,
    });
    expect(result.data).toEqual(getCustomAccountingFieldOptionResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Field option not found" } });
    await expect(
      invoke(getCustomAccountingFieldOption, {
        connection: testConnection,
        customAccountingFieldOptionId: OPTION_ID,
      }),
    ).rejects.toThrow();
  });
});
