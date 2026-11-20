import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import {
  getTimeOffBalanceByIdExamplePayload,
  getTimeOffDetailsExamplePayload,
  listTimeOffBalancesExamplePayload,
  postTimeOffRequestExamplePayload,
} from "../../examplePayloads";
import {
  oauthTestConnection,
  parseJsonDataPart,
  TEST_HOST,
} from "../../testHelpers";
import { getTimeOffBalanceById } from "./getTimeOffBalanceById";
import { getTimeOffDetails } from "./getTimeOffDetails";
import { listTimeOffBalances } from "./listTimeOffBalances";
import { postTimeOffRequest } from "./postTimeOffRequest";

const SERVICE = "/ccx/api/absenceManagement/v5/acme";

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

describe("listTimeOffBalances", () => {
  const params = {
    connection: oauthTestConnection(),
    workerId: "w-1",
    balanceCategoryId: "cat-1",
    balanceEffectiveDate: "2026-11-17",
    fetchAll: false,
    pagination: { limit: 10, offset: 0 },
  };

  it("sends the worker, category, and effective date and returns one page", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/balances`)
      .query({
        worker: "w-1",
        category: "cat-1",
        effective: "2026-11-17",
        limit: 10,
        offset: 0,
      })
      .reply(200, listTimeOffBalancesExamplePayload.data);

    const { result } = await invoke(listTimeOffBalances, params);
    expect(result).toEqual(listTimeOffBalancesExamplePayload);
  });

  it("omits the optional filters when they are not set", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/balances`)
      .query({ worker: "w-1", limit: 10, offset: 0 })
      .reply(200, listTimeOffBalancesExamplePayload.data);

    const { result } = await invoke(listTimeOffBalances, {
      ...params,
      balanceCategoryId: undefined,
      balanceEffectiveDate: undefined,
    } as unknown as typeof params);
    expect(result).toEqual(listTimeOffBalancesExamplePayload);
  });

  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/balances`)
      .query(true)
      .reply(400, { error: "invalid worker" });

    await expect(invoke(listTimeOffBalances, params)).rejects.toThrow();
  });
});

describe("postTimeOffRequest", () => {
  const emptyDay = {
    date: undefined,
    start: undefined,
    end: undefined,
    dailyQuantity: undefined,
    comment: undefined,
    timeOffTypeId: undefined,
    reasonId: undefined,
    positionId: undefined,
  };
  const days = [
    {
      date: "2026-10-20",
      start: "2026-10-20T09:00:00.000Z",
      end: "2026-10-20T17:00:00.000Z",
      dailyQuantity: 8,
      comment: "Vacation day",
      timeOffTypeId: "tot-1",
      reasonId: "r-1",
      positionId: "pos-1",
    },
    { ...emptyDay, date: "2026-10-21", timeOffTypeId: "tot-1", comment: "" },
    emptyDay,
  ];
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
            days: [
              {
                date: "2026-10-20",
                start: "2026-10-20T09:00:00.000Z",
                end: "2026-10-20T17:00:00.000Z",
                dailyQuantity: 8,
                comment: "Vacation day",
                timeOffType: { id: "tot-1" },
                reason: { id: "r-1" },
                position: { id: "pos-1" },
              },
              { date: "2026-10-21", timeOffType: { id: "tot-1" } },
            ],
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
