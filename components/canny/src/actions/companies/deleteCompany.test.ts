import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { deleteCompanyExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { deleteCompany } from "./deleteCompany";
const PATH = `${V1}/companies/delete`;
const params = {
  connection: testConnection,
  companyIdRequired: "553c3ef8b8cdcd1501ba1111",
};
describe("deleteCompany", () => {
  afterEach(() => nock.cleanAll());
  test("deletes a company", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, deleteCompanyExamplePayload.data);
    const { result } = await invoke(deleteCompany, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      companyID: "553c3ef8b8cdcd1501ba1111",
    });
    expect(result.data).toStrictEqual(deleteCompanyExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(404, { error: "company not found" });
    await expect(invoke(deleteCompany, params)).rejects.toThrow();
  });
});
