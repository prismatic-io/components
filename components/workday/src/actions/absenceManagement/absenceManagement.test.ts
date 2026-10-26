import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getTimeOffBalanceByIdExamplePayload,
  getTimeOffDetailsExamplePayload,
  postTimeOffRequestExamplePayload,
} from "../../examplePayloads";
import {
  oauthTestConnection,
  parseJsonDataPart,
  TEST_HOST,
} from "../../testHelpers";
import { getTimeOffBalanceById } from "./getTimeOffBalanceById";
import { getTimeOffDetails } from "./getTimeOffDetails";
import { postTimeOffRequest } from "./postTimeOffRequest";
const SERVICE = "/ccx/absenceManagement/v5";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getTimeOffBalanceById", () => {
  const params = { connection: oauthTestConnection(), balanceId: "bal-1" };
  it("returns the balance", async () => {
    nock(TEST_HOST, { reqheaders: { authorization: "Bearer oauth-token" } })
      .get(`${SERVICE}/balances/bal-1`)
      .reply(200, getTimeOffBalanceByIdExamplePayload.data);
    const { result } = await invoke(getTimeOffBalanceById, params);
    expect(result).toEqual(getTimeOffBalanceByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/balances/bal-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getTimeOffBalanceById, params)).rejects.toThrow();
  });
});
describe("getTimeOffDetails", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { status: "Approved" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/timeOffDetails`)
      .query({ status: "Approved", limit: 10, offset: 20 })
      .reply(200, getTimeOffDetailsExamplePayload.data);
    const { result } = await invoke(getTimeOffDetails, params);
    expect(result).toEqual(getTimeOffDetailsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/workers/w-1/timeOffDetails`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(getTimeOffDetails, params)).rejects.toThrow();
  });
});
describe("postTimeOffRequest", () => {
  const days = [{ date: "2026-10-20", reason: { id: "r-1" } }];
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    days,
    businessProcessParameters: {
      actionId: "act-1",
      overallBusinessProcessId: "obp-1",
      timeOffComment: "Vacation",
      transactionStatusId: "ts-1",
      timeOffAttachments: [{ fileName: "note.pdf" }],
      timeOffForId: "for-1",
    },
  };
  it("sends the request body as the multipart jsonData part", async () => {
    nock(TEST_HOST, {
      reqheaders: { "content-type": /^multipart\/form-data; boundary=/ },
    })
      .post(
        `${SERVICE}/workers/w-1/requestTimeOff`,
        (body: string) =>
          JSON.stringify(parseJsonDataPart(body)) ===
          JSON.stringify({
            businessProcessParameters: {
              action: { id: "act-1" },
              overallBusinessProcess: { id: "obp-1" },
              comment: "Vacation",
              transactionStatus: { id: "ts-1" },
              attachments: [{ fileName: "note.pdf" }],
              for: { id: "for-1" },
            },
            days,
          }),
      )
      .reply(200, postTimeOffRequestExamplePayload.data);
    const { result } = await invoke(postTimeOffRequest, params);
    expect(result).toEqual(postTimeOffRequestExamplePayload);
  });
  it("does not throw when businessProcessParameters is not set", async () => {
    const { businessProcessParameters: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/requestTimeOff`)
      .reply(200, postTimeOffRequestExamplePayload.data);
    const { result } = await invoke(
      postTimeOffRequest,
      withoutKey as typeof params,
    );
    expect(result).toEqual(postTimeOffRequestExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/workers/w-1/requestTimeOff`)
      .reply(400, { error: "invalid" });
    await expect(invoke(postTimeOffRequest, params)).rejects.toThrow();
  });
});
