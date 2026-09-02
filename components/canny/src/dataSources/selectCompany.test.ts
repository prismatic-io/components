import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { listCompaniesExamplePayload } from "../examplePayloads";
import { CANNY_HOST, captureBody, testConnection, V2 } from "../testHelpers";
import { selectCompany } from "./selectCompany";
const COMPANIES_LIST = `${V2}/companies/list`;
describe("selectCompany", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key pairs from the v2 cursor endpoint", async () => {
    const { captured, matcher } = captureBody();
    nock(CANNY_HOST)
      .post(COMPANIES_LIST, matcher)
      .reply(200, { ...listCompaniesExamplePayload.data, hasNextPage: false });
    const { result } = await invokeDataSource(selectCompany, {
      connection: testConnection,
    });
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      limit: 100,
    });
    expect(result).toStrictEqual([{ label: "company 1", key: "company1" }]);
  });
  test("returns an empty picklist when the account has no companies", async () => {
    nock(CANNY_HOST)
      .post(COMPANIES_LIST)
      .reply(200, { companies: [], hasNextPage: false, cursor: "" });
    const { result } = await invokeDataSource(selectCompany, {
      connection: testConnection,
    });
    expect(result).toStrictEqual([]);
  });
});
