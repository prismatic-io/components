import { describe, expect, test } from "vitest";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import type { BambooHRChangesObject } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";

describe("Tier 1 batching declaration", () => {
  test("Changed Employees is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: DEFAULT_BATCH_SIZE,
    });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
});

describe("triggerResolver.resolveItems", () => {
  test("flattens the payload shape perform actually returns", () => {
    const { payload } = pollChangesTriggerExamplePayload;
    const fixture = payload.body.data as BambooHRChangesObject;

    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      ...fixture.created.map((record) => ({ changeType: "created", record })),
      ...fixture.updated.map((record) => ({ changeType: "updated", record })),
    ]);
  });
});
