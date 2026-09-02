import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { updateCompanyExamplePayload } from "../../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V1 } from "../../testHelpers";
import { updateCompany } from "./updateCompany";
const PATH = `${V1}/companies/update`;
const params = {
  connection: testConnection,
  companyIdRequired: "553c3ef8b8cdcd1501ba1111",
  companyName: "Acme Corp",
  additionalFields: {
    monthlySpend: 5000,
    customFields: { tier: "gold" },
    additionalFields: {},
  },
};
describe("updateCompany", () => {
  afterEach(() => nock.cleanAll());
  test("updates a company and flattens the additional fields", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(PATH, matcher)
      .reply(200, updateCompanyExamplePayload.data);
    const { result } = await invoke(updateCompany, params);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      id: "553c3ef8b8cdcd1501ba1111",
      name: "Acme Corp",
      monthlySpend: 5000,
      customFields: { tier: "gold" },
    });
    expect(result.data).toStrictEqual(updateCompanyExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    nock(CANNY_HOST).post(PATH).reply(422, { error: "invalid company" });
    await expect(invoke(updateCompany, params)).rejects.toThrow();
  });
});
