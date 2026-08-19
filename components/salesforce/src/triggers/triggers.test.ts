import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import type {
  DeletedRecord,
  PollingCursor,
  PollingTriggerObject,
} from "../types";
import { getPollingChanges, resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger, webhook } from ".";
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
