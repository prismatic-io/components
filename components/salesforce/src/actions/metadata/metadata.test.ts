import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { salesforceOAuth } from "../../connections";
import { DEFAULT_SF_VERSION } from "../../constants";
import { deleteMetadata } from "./deleteMetadata";
import { updateMetadata } from "./updateMetadata";
const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";
const SOAP_PATH = `/services/Soap/m/${DEFAULT_SF_VERSION}`;
const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);
const soapResponse = (method: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://soap.sforce.com/2006/04/metadata"><soapenv:Body><${method}Response><result><fullName>TestObject1__c</fullName><success>true</success></result></${method}Response></soapenv:Body></soapenv:Envelope>`;
const debugContext = (enabled: boolean) => {
  const logger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
  return { logger, context: { logger, debug: { enabled } } as never };
};
beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());
describe.each([
  {
    name: "deleteMetadata",
    action: deleteMetadata,
    method: "deleteMetadata",
    params: { fullNames: ["TestObject1__c"], metadataType: "CustomObject" },
  },
  {
    name: "updateMetadata",
    action: updateMetadata,
    method: "updateMetadata",
    params: {
      metadata: [{ fullName: "TestObject1__c", label: "Test Object 1" }],
      metadataType: "CustomObject",
    },
  },
])("$name", ({ action, method, params }) => {
  test.each([
    false,
    true,
  ])("calls the Metadata API with debug enabled = %s", async (enabled) => {
    const scope = nock(INSTANCE_URL)
      .post(SOAP_PATH, (body: string) => body.includes(`<${method}`))
      .reply(200, soapResponse(method), { "Content-Type": "text/xml" });
    const { logger, context } = debugContext(enabled);
    const { result } = await invoke(
      action as never,
      { connection, version: DEFAULT_SF_VERSION, ...params } as never,
      context,
    );
    expect(scope.isDone()).toBe(true);
    expect(
      (
        result as {
          data: unknown;
        }
      ).data,
    ).toStrictEqual([
      { fullName: "TestObject1__c", success: true, errors: [] },
    ]);
    expect(logger.debug).toHaveBeenCalledTimes(enabled ? 1 : 0);
  });
});
