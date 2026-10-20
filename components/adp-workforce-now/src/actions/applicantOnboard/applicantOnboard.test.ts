import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../constants";
import {
  getApplicantOnboardMetadataExamplePayload,
  postApplicantOnboardProcessExamplePayload,
} from "../../examplePayloads";
import { getApplicantOnboardMetadata } from "./getApplicantOnboardMetadata";
import { postApplicantOnboardProcess } from "./postApplicantOnboardProcess";
const BASE = "https://api.adp.com";
const TOKEN = "test-token";
const connection = createConnection(adpOauth2, {
  endpoint: API_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
  clientId: "client-id",
  clientSecret: "client-secret",
  sslCert: "-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----",
  sslKey: "-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----",
});
const context = () => ({
  executionState: {
    [`ADP - ${connection.configVarKey}`]: {
      accessToken: TOKEN,
      expiresDate: Date.now() / 1000 + 3600,
    },
  },
});
const api = () =>
  nock(BASE, { reqheaders: { authorization: `Bearer ${TOKEN}` } });
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());
describe("getApplicantOnboardMetadata", () => {
  const params = {
    connection,
    contextTemplates: "US",
    $filter: "meta/applicantOnboarding/onboardingTemplateCode/code eq 'T1'",
  };
  test("happy path sends the country context header and returns the metadata", async () => {
    nock(BASE, {
      reqheaders: {
        authorization: `Bearer ${TOKEN}`,
        "adp-context-expressionid": "country=US",
      },
    })
      .get("/hcm/v2/applicant.onboard/meta")
      .query({ $filter: params.$filter })
      .reply(200, getApplicantOnboardMetadataExamplePayload.data);
    const { result } = await invoke(
      getApplicantOnboardMetadata,
      params,
      context(),
    );
    expect(result).toEqual(getApplicantOnboardMetadataExamplePayload);
  });
  test("error path rejects", async () => {
    api()
      .get("/hcm/v2/applicant.onboard/meta")
      .query(true)
      .reply(400, { error: "bad" });
    await expect(
      invoke(getApplicantOnboardMetadata, params, context()),
    ).rejects.toThrow();
  });
});
describe("postApplicantOnboardProcess", () => {
  const applicantOnboarding = { onboardingTemplateCode: { code: "T1" } };
  test("happy path posts the applicant and returns the response", async () => {
    api()
      .post("/hcm/v2/applicant.onboard", { applicantOnboarding })
      .reply(200, postApplicantOnboardProcessExamplePayload.data);
    const { result } = await invoke(
      postApplicantOnboardProcess,
      { connection, applicantOnboarding },
      context(),
    );
    expect(result).toEqual(postApplicantOnboardProcessExamplePayload);
  });
  test("error path rejects", async () => {
    api().post("/hcm/v2/applicant.onboard").reply(422, { error: "invalid" });
    await expect(
      invoke(
        postApplicantOnboardProcess,
        { connection, applicantOnboarding },
        context(),
      ),
    ).rejects.toThrow();
  });
});
