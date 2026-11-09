import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { appendLeadConversationExamplePayload } from "../../examplePayloads";
import { appendLeadConversation } from "./appendLeadConversation";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/1234567890/localServices:appendLeadConversation`;

const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};

describe("appendLeadConversation", () => {
  afterEach(() => nock.cleanAll());

  test("appends the text to the lead's conversation", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, {
        conversations: [
          {
            localServicesLead:
              "customers/1234567890/localServicesLeads/5566778899",
            text: "We can visit on Tuesday.",
          },
        ],
      })
      .reply(200, appendLeadConversationExamplePayload.data);

    const { result } = await invoke(appendLeadConversation, {
      connection,
      customerId: "1234567890",
      leadId: "5566778899",
      text: "We can visit on Tuesday.",
      managerCustomerId: undefined,
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(appendLeadConversationExamplePayload.data);
  });

  test("rejects when Google Ads returns 400", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(appendLeadConversation, {
        connection,
        customerId: "1234567890",
        leadId: "5566778899",
        text: "We can visit on Tuesday.",
        managerCustomerId: undefined,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
