import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { WEBHOOK_SFDC_RESPONSE } from "../constants";
import type {
  DeletedRecord,
  PollingCursor,
  PollingTriggerObject,
} from "../types";
import { getPollingChanges, resolvePollingRecordChanges } from "../util";
import {
  flowOutboundMessageTrigger,
  pollChangesTrigger,
  webhook,
  workflowTrigger,
} from ".";

describe("test salesforce webhook trigger", () => {
  test("verify the return value of salesforce webhook trigger", async () => {
    const payload = defaultTriggerPayload();
    payload.body.data = "<xml><foo>bar</foo></xml>";
    payload.body.contentType = "text/xml; charset=utf-8";

    const expectedData = { xml: { foo: "bar" } };
    const expectedResponse = {
      statusCode: 200,
      contentType: "text/xml; charset=utf-8",
      body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Body>
        <notificationsResponse xmlns="http://soap.sforce.com/2005/09/outbound">
          <Ack>true</Ack>
        </notificationsResponse>
      </soapenv:Body>
      </soapenv:Envelope>`,
    };
    const {
      result: {
        payload: {
          body: { data },
        },
        response,
      },
    } = await invokeTrigger(webhook, {}, payload);
    expect(data).toStrictEqual(expectedData);
    expect(response).toStrictEqual(expectedResponse);
  });
});

const outboundEnvelope = (
  notifications: string,
) => `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
 <soapenv:Body>
  <notifications xmlns="http://soap.sforce.com/2005/09/outbound">
   <OrganizationId>00D5g000004XyZaEAK</OrganizationId>
   <ActionId>04k5g000000AbCdAAK</ActionId>
   <SessionId xsi:nil="true"/>
   <EnterpriseUrl>https://example.my.salesforce.com/services/Soap/c/63.0/00D5g000004XyZa</EnterpriseUrl>
   <PartnerUrl>https://example.my.salesforce.com/services/Soap/u/63.0/00D5g000004XyZa</PartnerUrl>${notifications}
  </notifications>
 </soapenv:Body>
</soapenv:Envelope>`;

const accountNotification = (id: string, name: string) => `
   <Notification>
    <Id>04l5g00000${id}</Id>
    <sObject xsi:type="sf:Account" xmlns:sf="urn:sobject.enterprise.soap.sforce.com">
     <sf:Id>0015g00000${id}</sf:Id>
     <sf:AccountNumber>00123</sf:AccountNumber>
     <sf:AnnualRevenue>2500000.0</sf:AnnualRevenue>
     <sf:BillingPostalCode>02110</sf:BillingPostalCode>
     <sf:Description>Line one &amp; &lt;two&gt; &quot;quoted&quot; &#169;</sf:Description>
     <sf:Fax>0x1F</sf:Fax>
     <sf:IsDeleted>false</sf:IsDeleted>
     <sf:Name>${name}</sf:Name>
     <sf:NumberOfEmployees>250</sf:NumberOfEmployees>
     <sf:Phone>+1 (555) 010-0199</sf:Phone>
     <sf:Rating>1e5</sf:Rating>
     <sf:Sic>-0042</sf:Sic>
     <sf:Site></sf:Site>
     <sf:TickerSymbol>  ACME  </sf:TickerSymbol>
     <sf:Website><![CDATA[https://acme.example.com/?a=1&b=2]]></sf:Website>
     <sf:LastModifiedDate>2026-10-14T15:04:05.000Z</sf:LastModifiedDate>
    </sObject>
   </Notification>`;

const accountFields = {
  AccountNumber: 123,
  AnnualRevenue: 2500000,
  BillingPostalCode: 2110,
  Description: "Line one &amp; &lt;two&gt; &quot;quoted&quot; &#169;",
  Fax: 31,
  IsDeleted: false,
  NumberOfEmployees: 250,
  Phone: "+1 (555) 010-0199",
  Rating: 1,
  Sic: -42,
  Site: "",
  TickerSymbol: "ACME",
  Website: "https://acme.example.com/?a=1&b=2",
  LastModifiedDate: "2026-10-14T15:04:05.000Z",
};

const invokeWithXmlResult = async (xmlTrigger, xml: string) => {
  const payload = defaultTriggerPayload();
  payload.body.data = xml;
  payload.body.contentType = "text/xml; charset=utf-8";
  const { result } = await invokeTrigger(xmlTrigger, {}, payload);
  return result;
};

const invokeWithXml = async (xmlTrigger, xml: string) =>
  (await invokeWithXmlResult(xmlTrigger, xml))?.payload.body;

describe("XML webhook triggers keep the fast-xml-parser 3.x payload shape", () => {
  test("workflowTrigger parses an outbound message into the full envelope", async () => {
    const body = await invokeWithXml(
      workflowTrigger,
      outboundEnvelope(accountNotification("AbCdEAA", "Acme")),
    );
    const sObject = Object.fromEntries(
      Object.entries({ ...accountFields, Name: "Acme" }).map(([key, value]) => [
        `sf:${key}`,
        value,
      ]),
    );
    expect(body?.contentType).toBeUndefined();
    expect(body?.data).toStrictEqual({
      "soapenv:Envelope": {
        "@_xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
        "@_xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
        "@_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "soapenv:Body": {
          notifications: {
            "@_xmlns": "http://soap.sforce.com/2005/09/outbound",
            OrganizationId: "00D5g000004XyZaEAK",
            ActionId: "04k5g000000AbCdAAK",
            SessionId: { "@_xsi:nil": "true" },
            EnterpriseUrl:
              "https://example.my.salesforce.com/services/Soap/c/63.0/00D5g000004XyZa",
            PartnerUrl:
              "https://example.my.salesforce.com/services/Soap/u/63.0/00D5g000004XyZa",
            Notification: {
              Id: "04l5g00000AbCdEAA",
              sObject: {
                "@_xsi:type": "sf:Account",
                "@_xmlns:sf": "urn:sobject.enterprise.soap.sforce.com",
                "sf:Id": "0015g00000AbCdEAA",
                ...sObject,
              },
            },
          },
        },
      },
    });
  });

  test("flowOutboundMessageTrigger flattens multiple notifications", async () => {
    const body = await invokeWithXml(
      flowOutboundMessageTrigger,
      outboundEnvelope(
        accountNotification("AbCdEAA", "Acme") +
          accountNotification("FgHiJAA", "Globex"),
      ),
    );
    expect(body).toStrictEqual({
      contentType: "application/json; charset=utf-8",
      data: [
        {
          type: "Account",
          Id: "0015g00000AbCdEAA",
          ...accountFields,
          Name: "Acme",
        },
        {
          type: "Account",
          Id: "0015g00000FgHiJAA",
          ...accountFields,
          Name: "Globex",
        },
      ],
    });
  });

  test("flowOutboundMessageTrigger wraps a single notification in an array", async () => {
    const body = await invokeWithXml(
      flowOutboundMessageTrigger,
      outboundEnvelope(accountNotification("AbCdEAA", "Acme")),
    );
    expect(body?.data).toStrictEqual([
      {
        type: "Account",
        Id: "0015g00000AbCdEAA",
        ...accountFields,
        Name: "Acme",
      },
    ]);
  });

  test("webhook keeps attributes as strings and groups repeated tags", async () => {
    const body = await invokeWithXml(
      webhook,
      `<?xml version="1.0" encoding="UTF-8"?>
<root xmlns:ns="urn:example" version="2">
 <ns:item id="7" active="true">first</ns:item>
 <ns:item id="08">second</ns:item>
 <count>3</count>
 <empty/>
</root>`,
    );
    expect(body?.data).toStrictEqual({
      root: {
        "@_xmlns:ns": "urn:example",
        "@_version": "2",
        "ns:item": [
          { _text: "first", "@_id": "7", "@_active": "true" },
          { _text: "second", "@_id": "08" },
        ],
        count: 3,
        empty: "",
      },
    });
  });

  test("webhook rejects a __proto__ tag without polluting Object.prototype", async () => {
    await expect(
      invokeWithXml(webhook, "<__proto__><polluted>x</polluted></__proto__>"),
    ).rejects.toThrow(/prototype pollution/);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe("XML webhook triggers acknowledge Salesforce with the SOAP response", () => {
  test.each([
    ["workflowTrigger", workflowTrigger],
    ["flowOutboundMessageTrigger", flowOutboundMessageTrigger],
  ])("%s returns WEBHOOK_SFDC_RESPONSE", async (_name, xmlTrigger) => {
    const result = await invokeWithXmlResult(
      xmlTrigger,
      outboundEnvelope(accountNotification("AbCdEAA", "Acme")),
    );
    expect(result?.response).toStrictEqual(WEBHOOK_SFDC_RESPONSE);
  });
});

describe("test salesforce pollChangesTrigger batching", () => {
  test("is opt-in batchable, dispatching one batch of 50 at a time", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });

  test("resolvePollingRecordChanges flattens created, updated, and deleted into tagged items", () => {
    const created = {
      CreatedDate: "2026-01-02",
      LastModifiedDate: "2026-01-02",
    };
    const updated = {
      CreatedDate: "2026-01-01",
      LastModifiedDate: "2026-01-03",
    };
    const deleted = {
      id: "001",
      deletedDate: "2026-01-04",
      IsDeleted: true as const,
    };
    expect(
      resolvePollingRecordChanges({
        createdRecords: [created],
        updatedRecords: [updated],
        deletedRecords: [deleted],
      }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
      { changeType: "deleted", record: deleted },
    ]);
  });

  test("a record in both createdRecords and updatedRecords flattens to two items", () => {
    const bothBuckets = {
      Id: "001000000000005",
      CreatedDate: "2026-01-02",
      LastModifiedDate: "2026-01-03",
    };
    expect(
      resolvePollingRecordChanges({
        createdRecords: [bothBuckets],
        updatedRecords: [bothBuckets],
        deletedRecords: [],
      }),
    ).toEqual([
      { changeType: "created", record: bothBuckets },
      { changeType: "updated", record: bothBuckets },
    ]);
  });

  test("resolvePollingRecordChanges returns [] when there are no changes", () => {
    expect(
      resolvePollingRecordChanges({
        createdRecords: [],
        updatedRecords: [],
        deletedRecords: [],
      }),
    ).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});

describe("polling output contract (frozen)", () => {
  const created: PollingTriggerObject = {
    Id: "001000000000001",
    CreatedDate: "2026-08-10T12:00:05.000+0000",
    LastModifiedDate: "2026-08-10T12:00:05.000+0000",
  };
  const updated: PollingTriggerObject = {
    Id: "001000000000002",
    CreatedDate: "2020-01-01T00:00:00.000+0000",
    LastModifiedDate: "2026-08-10T12:00:06.000+0000",
  };
  const deleted: DeletedRecord = {
    id: "001000000000003",
    deletedDate: "2026-08-10T12:00:07.000+0000",
    IsDeleted: true,
  };

  test("changesObject has exactly three keys in the documented order", () => {
    const { changesObject } = getPollingChanges(
      true,
      true,
      [created, updated],
      new Date("2026-08-10T11:00:00.000Z"),
      new Date("2026-08-10T11:00:00.000Z"),
      [deleted],
    );
    expect(Object.keys(changesObject)).toEqual([
      "updatedRecords",
      "createdRecords",
      "deletedRecords",
    ]);
    expect(changesObject.deletedRecords).toEqual([deleted]);
  });

  test("a record created after the watermark is classified as created", () => {
    const { changesObject, changes } = getPollingChanges(
      true,
      true,
      [created],
      new Date("2026-08-10T11:00:00.000Z"),
      new Date("2026-08-10T11:00:00.000Z"),
    );
    expect(changesObject.createdRecords).toEqual([created]);
    expect(changesObject.updatedRecords).toEqual([]);
    expect(changes).toBe(1);
  });

  test("a record modified after creation is classified as updated", () => {
    const { changesObject, changes } = getPollingChanges(
      true,
      true,
      [updated],
      new Date("2026-08-10T11:00:00.000Z"),
      new Date("2026-08-10T11:00:00.000Z"),
    );
    expect(changesObject.updatedRecords).toEqual([updated]);
    expect(changesObject.createdRecords).toEqual([]);
    expect(changes).toBe(1);
  });

  test("showNewRecords=false suppresses created records but still counts deletions", () => {
    const { changesObject, changes } = getPollingChanges(
      false,
      true,
      [created],
      new Date("2026-08-10T11:00:00.000Z"),
      new Date("2026-08-10T11:00:00.000Z"),
      [deleted],
    );
    expect(changesObject.createdRecords).toEqual([]);
    expect(changesObject.deletedRecords).toEqual([deleted]);
    expect(changes).toBe(1);
  });

  test("records strictly before the watermark are excluded", () => {
    const { changesObject, changes } = getPollingChanges(
      true,
      true,
      [created, updated],
      new Date("2026-09-01T00:00:00.000Z"),
      new Date("2026-09-01T00:00:00.000Z"),
    );
    expect(changesObject.createdRecords).toEqual([]);
    expect(changesObject.updatedRecords).toEqual([]);
    expect(changes).toBe(0);
  });

  test("a record exactly at the watermark is excluded (the boundary is exclusive)", () => {
    const atWatermark: PollingTriggerObject = {
      Id: "001000000000004",
      CreatedDate: "2026-08-10T11:00:00.000+0000",
      LastModifiedDate: "2026-08-10T11:00:00.000+0000",
    };
    const { changesObject, changes } = getPollingChanges(
      true,
      true,
      [atWatermark],
      new Date("2026-08-10T11:00:00.000Z"),
      new Date("2026-08-10T11:00:00.000Z"),
    );
    expect(changesObject.createdRecords).toEqual([]);
    expect(changesObject.updatedRecords).toEqual([]);
    expect(changes).toBe(0);
  });
});

describe("pollChangesTrigger pagination wiring", () => {
  const resolver = pollChangesTrigger.triggerResolver;

  test("getNextPaginationState forwards a cursor the perform left on the payload", () => {
    const cursor: PollingCursor = {
      watermark: "2026-08-10T12:00:02Z",
      windowStart: "2026-08-10T12:00:00Z",
      windowEnd: "2026-08-10T13:00:00Z",
      isBackfill: true,
    };
    expect(
      resolver?.getNextPaginationState?.(
        {} as never,
        {
          payload: { paginationState: cursor },
        } as never,
      ),
    ).toEqual(cursor);
  });

  test("getNextPaginationState returns null to end the drain", () => {
    expect(
      resolver?.getNextPaginationState?.({} as never, { payload: {} } as never),
    ).toBeNull();
  });

  test("getNextPaginationState is synchronous", () => {
    const result = resolver?.getNextPaginationState?.(
      {} as never,
      { payload: {} } as never,
    );
    expect(result).not.toBeInstanceOf(Promise);
  });

  test("resolveItems is synchronous", () => {
    const result = resolver?.resolveItems?.(
      {} as never,
      {
        payload: {
          body: {
            data: {
              createdRecords: [],
              updatedRecords: [],
              deletedRecords: [],
            },
          },
        },
      } as never,
    );
    expect(result).not.toBeInstanceOf(Promise);
  });
});
