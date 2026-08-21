import {
  createConnection,
  invokeTrigger,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { zohoTemplatedConnection } from "../../connections";
import { crmGetRecordsExamplePayload } from "../../examplePayloads/crm";
import { toZohoTimestamp } from "../../util/general";
import { contactsPollingTrigger } from "./crmContacts";
const conn = {
  ...createConnection(
    zohoTemplatedConnection,
    {},
    { access_token: "test-token" },
  ),
  context: { "accounts-server": "https://accounts.zoho.com" },
};
const CRM_BASE = "https://www.zohoapis.com";
const CRM_REPLY = crmGetRecordsExamplePayload.data;
const makeContext = (store: { lastUpdated?: string }) => ({
  debug: { enabled: false },
  logger: loggerMock(),
  polling: {
    getState: () => store,
    setState: (next: { lastUpdated?: string }) => {
      store.lastUpdated = next.lastUpdated;
    },
  },
});
// biome-ignore lint/suspicious/noExplicitAny: test-only context bridge
const asCtx = (c: ReturnType<typeof makeContext>): any => c;
// biome-ignore lint/suspicious/noExplicitAny: test-only trigger-shape bridge
const trigger: any = contactsPollingTrigger;
describe("contactsPollingTrigger", () => {
  afterEach(() => nock.cleanAll());
  test("threads state across polls and hits the CRM Contacts endpoint with If-Modified-Since on the second poll", async () => {
    const store: {
      lastUpdated?: string;
    } = {};
    const firstScope = nock(CRM_BASE, {
      badheaders: ["if-modified-since"],
    })
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, CRM_REPLY);
    const first = await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined, // biome-ignore lint/suspicious/noExplicitAny: test-only params bridge
      { connection: conn, fields: [] } as any,
    );
    expect(firstScope.isDone()).toBe(true);
    expect(store.lastUpdated).toBeDefined();
    expect(first.result?.polledNoChanges).toBe(true);
    expect(first.result?.payload.body.data).toEqual({
      created: [],
      updated: [],
    });
    const firstLastUpdated = store.lastUpdated as string;
    const expectedHeader = toZohoTimestamp(firstLastUpdated);
    const secondScope = nock(CRM_BASE, {
      reqheaders: { "if-modified-since": expectedHeader },
    })
      .get("/crm/v8/Contacts")
      .query(true)
      .reply(200, CRM_REPLY);
    const second = await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined, // biome-ignore lint/suspicious/noExplicitAny: test-only params bridge
      { connection: conn, fields: [] } as any,
    );
    expect(secondScope.isDone()).toBe(true);
    expect(store.lastUpdated).not.toBe(firstLastUpdated);
    expect(second.result?.polledNoChanges).toBe(true);
  });
});
