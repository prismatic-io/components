import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { provideLeadFeedbackExamplePayload } from "../../examplePayloads";
import { provideLeadFeedback } from "./provideLeadFeedback";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/1234567890/localServicesLeads/5566778899:provideLeadFeedback`;

const params = {
  connection,
  customerId: "1234567890",
  leadId: "5566778899",
  surveyAnswer: "DISSATISFIED" as const,
  managerCustomerId: undefined,
  satisfiedReason: undefined,
  dissatisfiedReason: "GEO_MISMATCH",
  otherReasonComment: undefined,
};

const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};

describe("provideLeadFeedback", () => {
  afterEach(() => nock.cleanAll());

  test("posts the survey to the lead and returns the credit decision", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, {
        surveyAnswer: "DISSATISFIED",
        surveyDissatisfied: { surveyDissatisfiedReason: "GEO_MISMATCH" },
      })
      .reply(200, provideLeadFeedbackExamplePayload.data);

    const { result } = await invoke(provideLeadFeedback, params);

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(provideLeadFeedbackExamplePayload.data);
  });

  test("refuses a contradictory reason without calling Google", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL).post(PATH).reply(200, {});

    await expect(
      invoke(provideLeadFeedback, {
        ...params,
        surveyAnswer: "SATISFIED" as const,
      }),
    ).rejects.toThrow("Dissatisfied Reason only applies");
    expect(scope.isDone()).toBe(false);
  });

  test("rejects when Google Ads returns 400", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, INVALID_ARGUMENT);

    await expect(invoke(provideLeadFeedback, params)).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
