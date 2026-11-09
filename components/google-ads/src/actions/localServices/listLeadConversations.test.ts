import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../../constants";
import { listLeadConversationsExamplePayload } from "../../examplePayloads";
import { listLeadConversations } from "./listLeadConversations";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;

const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};

describe("listLeadConversations", () => {
  afterEach(() => nock.cleanAll());

  test("searches one lead's conversations", async () => {
    let query = "";
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (body) => {
        query = body.query;
        return true;
      })
      .reply(200, listLeadConversationsExamplePayload.data);

    const { result } = await invoke(listLeadConversations, {
      connection,
      customerId: CUSTOMER_ID,
      managerCustomerId: undefined,
      leadId: "5566778899",
      fetchAll: false,
      pageTokenInput: undefined,
    });

    expect(scope.isDone()).toBe(true);
    expect(query).toContain(
      "WHERE local_services_lead_conversation.lead = 'customers/1234567890/localServicesLeads/5566778899'",
    );
    expect(result.data).toEqual(listLeadConversationsExamplePayload.data);
  });

  test("rejects when Google Ads returns 400", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(listLeadConversations, {
        connection,
        customerId: CUSTOMER_ID,
        managerCustomerId: undefined,
        leadId: "5566778899",
        fetchAll: false,
        pageTokenInput: undefined,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
