import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { mutateResourcesExamplePayload } from "../../examplePayloads";
import { mutateCampaignInputs, mutateResourcesInputs } from "../../inputs";
import { mutateResources } from "./mutateResources";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/1234567890/googleAds:mutate`;
const OPERATIONS = [
  {
    campaignBudgetOperation: {
      create: {
        resourceName: "customers/1234567890/campaignBudgets/-1",
        amountMicros: "50000000",
      },
    },
  },
];

const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};

describe("mutateResources", () => {
  afterEach(() => nock.cleanAll());

  test("posts the operations to googleAds:mutate with the manager header", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: { "login-customer-id": "1111111111" },
    })
      .post(PATH, {
        mutateOperations: OPERATIONS,
        partialFailure: true,
        validateOnly: true,
        responseContentType: "MUTABLE_RESOURCE",
      })
      .reply(200, mutateResourcesExamplePayload.data);

    const { result } = await invoke(mutateResources, {
      connection,
      customerId: "1234567890",
      mutateOperations: OPERATIONS,
      partialFailure: true,
      managerCustomerId: "1111111111",
      validateOnly: true,
      responseContentType: "MUTABLE_RESOURCE",
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(mutateResourcesExamplePayload.data);
  });

  test("defaults Partial Failure on, while Mutate Campaign keeps its published default", () => {
    expect(mutateResourcesInputs.partialFailure.default).toBe("true");
    expect(mutateCampaignInputs.partialFailure.default).toBe("false");
  });

  test("rejects when Google Ads returns 400", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(mutateResources, {
        connection,
        customerId: "1234567890",
        mutateOperations: OPERATIONS,
        partialFailure: true,
        managerCustomerId: undefined,
        validateOnly: false,
        responseContentType: undefined,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
