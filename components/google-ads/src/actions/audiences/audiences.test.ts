import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { dataManagerOAuth } from "../../connections";
import {
  GOOGLE_DATA_MANAGER_API_VERSION,
  GOOGLE_DATA_MANAGER_BASE_URL,
} from "../../constants";
import {
  getRequestStatusExamplePayload,
  ingestAudienceMembersExamplePayload,
  removeAudienceMembersExamplePayload,
} from "../../examplePayloads";
import { getRequestStatus } from "./getRequestStatus";
import { ingestAudienceMembers } from "./ingestAudienceMembers";
import { removeAudienceMembers } from "./removeAudienceMembers";

const connection = createConnection(
  dataManagerOAuth,
  {},
  { access_token: "test-access-token" },
);

const BASE = `/${GOOGLE_DATA_MANAGER_API_VERSION}`;
const MEMBERS = [
  { userData: { userIdentifiers: [{ emailAddress: "a1b2c3" }] } },
];
const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};
const DESTINATION = {
  operatingAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" },
  productDestinationId: "9876543210",
};

describe("audience actions", () => {
  afterEach(() => nock.cleanAll());

  test("Ingest Audience Members sends one destination, the terms and the consent", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .post(`${BASE}/audienceMembers:ingest`, {
        destinations: [DESTINATION],
        audienceMembers: MEMBERS,
        encoding: "HEX",
        consent: { adUserData: "CONSENT_GRANTED" },
        termsOfService: { customerMatchTermsOfServiceStatus: "ACCEPTED" },
        validateOnly: true,
      })
      .reply(200, ingestAudienceMembersExamplePayload.data);

    const { result } = await invoke(ingestAudienceMembers, {
      connection,
      customerId: "1234567890",
      audienceId: "9876543210",
      audienceMembers: MEMBERS,
      customerMatchTermsOfService: "ACCEPTED",
      managerCustomerId: undefined,
      encoding: "HEX",
      adUserDataConsent: "CONSENT_GRANTED",
      adPersonalizationConsent: undefined,
      validateOnly: true,
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(ingestAudienceMembersExamplePayload.data);
  });

  test("Remove Audience Members sends no consent or terms", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .post(`${BASE}/audienceMembers:remove`, {
        destinations: [
          {
            ...DESTINATION,
            loginAccount: {
              accountType: "GOOGLE_ADS",
              accountId: "1111111111",
            },
          },
        ],
        audienceMembers: MEMBERS,
        encoding: "HEX",
        validateOnly: false,
      })
      .reply(200, removeAudienceMembersExamplePayload.data);

    const { result } = await invoke(removeAudienceMembers, {
      connection,
      customerId: "1234567890",
      audienceId: "9876543210",
      audienceMembers: MEMBERS,
      managerCustomerId: "1111111111",
      encoding: "HEX",
      validateOnly: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(removeAudienceMembersExamplePayload.data);
  });

  test("Get Request Status passes the request ID as a query parameter", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .get(`${BASE}/requestStatus:retrieve`)
      .query({ requestId: "126365e1-16d0-4c81-9de9-f362711e250a" })
      .reply(200, getRequestStatusExamplePayload.data);

    const { result } = await invoke(getRequestStatus, {
      connection,
      requestId: "126365e1-16d0-4c81-9de9-f362711e250a",
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getRequestStatusExamplePayload.data);
  });

  test("Ingest Audience Members rejects when Data Manager returns 400", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .post(`${BASE}/audienceMembers:ingest`)
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(ingestAudienceMembers, {
        connection,
        customerId: "1234567890",
        audienceId: "9876543210",
        audienceMembers: MEMBERS,
        customerMatchTermsOfService: "ACCEPTED",
        managerCustomerId: undefined,
        encoding: "HEX",
        adUserDataConsent: undefined,
        adPersonalizationConsent: undefined,
        validateOnly: false,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });

  test("Remove Audience Members rejects when Data Manager returns 400", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .post(`${BASE}/audienceMembers:remove`)
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(removeAudienceMembers, {
        connection,
        customerId: "1234567890",
        audienceId: "9876543210",
        audienceMembers: MEMBERS,
        managerCustomerId: undefined,
        encoding: "HEX",
        validateOnly: false,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });

  test("Get Request Status rejects when Data Manager returns 400", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .get(`${BASE}/requestStatus:retrieve`)
      .query({ requestId: "not-a-request-id" })
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(getRequestStatus, { connection, requestId: "not-a-request-id" }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
