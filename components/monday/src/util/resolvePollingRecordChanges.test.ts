import { describe, expect, it } from "vitest";
import type { MondayItem } from "../types";
import { resolvePollingRecordChanges } from "./resolvePollingRecordChanges";

const created = { id: "1" } as MondayItem;
const updated = { id: "2" } as MondayItem;

describe("resolvePollingRecordChanges", () => {
  it("tags created records first, then updated records", () => {
    expect(
      resolvePollingRecordChanges({ created: [created], updated: [updated] }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });

  it("returns an empty list for an empty envelope", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
  });

  it("returns an empty list for an absent envelope", () => {
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });

  it("tolerates only created being present", () => {
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
  });

  it("tolerates only updated being present", () => {
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
});
