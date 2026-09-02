import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../../testHelpers";
import { listCompanies } from "./listCompanies";
const PATH = `${V2}/companies/list`;
const params = {
  connection: testConnection,
  companySearch: "Acme",
  segment: undefined,
  fetchAll: false,
  pagination: { cursor: undefined, limit: 10 },
};
describe("listCompanies", () => {
  afterEach(() => nock.cleanAll());
  test("returns one page of companies for a search term", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, listCompaniesExamplePayload.data);
    const { result } = await invoke(listCompanies, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      search: "Acme",
      limit: 10,
    });
    expect(result.data).toStrictEqual(listCompaniesExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(400, { error: "something went wrong" });
    await expect(invoke(listCompanies, params)).rejects.toThrow();
  });
});
