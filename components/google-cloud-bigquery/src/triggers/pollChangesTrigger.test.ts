import type { BigQueryJobRecord } from "../types";
import { resolvePollingRecordChanges } from "../utils/polling";
import { pollChangesTrigger } from "./pollChangesTrigger";

const created: BigQueryJobRecord = {
  id: "my-project:US.job_abc123",
  jobReference: {
    projectId: "my-project",
    jobId: "job_abc123",
    location: "US",
  },
  status: { state: "DONE" },
  statistics: { creationTime: "1640995200000" },
  user_email: "user@example.com",
};

describe("pollChangesTrigger batching", () => {
  test("New Jobs is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });

  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
  });

  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({ created: [] })).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });

  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      headers: {},
      queryParameters: {},
      rawBody: { data: "", contentType: "" },
      body: { data: { created: [created] } },
      pathFragment: "",
      webhookUrls: {},
      webhookApiKeys: {},
      invokeUrl: "",
      executionId: "",
      customer: { id: "", externalId: "", name: "" },
      instance: { id: "", name: "" },
      user: { id: "", externalId: "", name: "", email: "" },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        { payload } as never,
      ),
    ).toEqual([{ changeType: "created", record: created }]);
  });
});
