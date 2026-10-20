import { type Mock, vi } from "vitest";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { DriveItem } from "../interfaces";
import {
  resolvePollingRecordChanges,
  resolveSitePollingRecordChanges,
} from "../utils";
import { drivePollingTrigger } from "./drivePollingTrigger";
import { folderPollingTrigger } from "./folderPollingTrigger";
import { pollSiteChanges } from "./pollSiteChanges";
const getMock: Mock = vi.fn();
vi.mock("../client", () => ({
  createClient: vi.fn(async () => ({ get: getMock })),
}));
const item = (id: string, overrides: Partial<DriveItem> = {}): DriveItem => ({
  id,
  name: `${id}.txt`,
  lastModifiedDateTime: "2026-01-01T00:00:00Z",
  createdDateTime: "2026-01-01T00:00:00Z",
  parentReference: {
    driveId: "drive-1",
    id: "parent-1",
    path: "/drives/drive-1/root:",
  },
  ...overrides,
});
describe.each([
  ["drivePollingTrigger", drivePollingTrigger],
  ["folderPollingTrigger", folderPollingTrigger],
  ["pollSiteChanges", pollSiteChanges],
])("%s batching declaration", (_name, trigger) => {
  test("is opt-in batchable with a default batch size", () => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: 50 });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });
  test("declares Tier 2 pagination on the trigger resolver", () => {
    expect(trigger.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
  });
});
describe("resolvePollingRecordChanges", () => {
  const deleted = item("d", { deleted: { state: "deleted" } });
  const added = item("a");
  const updated = item("u", { lastModifiedDateTime: "2026-01-02T00:00:00Z" });
  const moved = item("m");
  test("tags every record with the key it came from", () => {
    expect(
      resolvePollingRecordChanges({
        deleted: [deleted],
        added: [added],
        updated: [updated],
        moved: [moved],
      }),
    ).toEqual([
      { changeType: "deleted", record: deleted },
      { changeType: "added", record: added },
      { changeType: "updated", record: updated },
      { changeType: "moved", record: moved },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ added: [added] })).toEqual([
      { changeType: "added", record: added },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
});
describe("resolveSitePollingRecordChanges", () => {
  const a = item("a");
  const b = item("b", {
    parentReference: { driveId: "drive-2", id: "p", path: "/x" },
  });
  const u = item("u");
  test("flattens every drive's changes into one stream", () => {
    expect(
      resolveSitePollingRecordChanges({
        Documents: { added: [a], updated: [u] },
        Archive: { added: [b] },
      }),
    ).toEqual([
      { changeType: "added", record: a },
      { changeType: "updated", record: u },
      { changeType: "added", record: b },
    ]);
  });
  test("returns [] for empty or undefined changes", () => {
    expect(resolveSitePollingRecordChanges({})).toEqual([]);
    expect(resolveSitePollingRecordChanges(undefined)).toEqual([]);
    expect(resolveSitePollingRecordChanges({ Documents: {} })).toEqual([]);
  });
});
const context = (state: Record<string, string> = {}) => {
  const setState = vi.fn();
  return {
    setState,
    ctx: {
      logger: { debug: vi.fn() },
      debug: { enabled: false },
      polling: { getState: () => state, setState },
    } as never,
  };
};
const connection = {
  key: "oauth2",
  fields: {},
  token: { access_token: "t" },
} as never;
const payload = defaultTriggerPayload();
describe("resolveItems consumes the payload perform returns", () => {
  beforeEach(() => {
    getMock.mockReset();
  });
  test("drivePollingTrigger", async () => {
    const created = item("c");
    getMock.mockResolvedValueOnce({
      data: {
        value: [created],
        "@odata.deltaLink": "https://graph/delta?token=1",
      },
    });
    const { ctx } = context();
    const result = (await drivePollingTrigger.perform(ctx, payload, {
      connection,
      driveId: "drive-1",
    } as never)) as {
      payload: {
        body: {
          data: unknown;
        };
      };
    };
    expect(
      drivePollingTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload: result.payload,
        } as never,
      ),
    ).toEqual([{ changeType: "added", record: created }]);
  });
  test("folderPollingTrigger", async () => {
    const created = item("c", {
      parentReference: { driveId: "drive-1", id: "folder-1", path: "/p" },
    });
    getMock.mockResolvedValueOnce({
      data: {
        value: [created],
        "@odata.deltaLink": "https://graph/delta?token=1",
      },
    });
    const { ctx } = context();
    const result = (await folderPollingTrigger.perform(ctx, payload, {
      connection,
      driveId: "drive-1",
      folderId: "folder-1",
      includeSubfolders: false,
    } as never)) as {
      payload: {
        body: {
          data: unknown;
        };
      };
    };
    expect(
      folderPollingTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload: result.payload,
        } as never,
      ),
    ).toEqual([{ changeType: "added", record: created }]);
  });
  test("pollSiteChanges", async () => {
    const created = item("c");
    getMock
      .mockResolvedValueOnce({
        data: { value: [{ id: "drive-1", name: "Documents" }] },
      })
      .mockResolvedValueOnce({
        data: {
          value: [created],
          "@odata.deltaLink": "https://graph/delta?token=1",
        },
      });
    const { ctx } = context();
    const result = (await pollSiteChanges.perform(ctx, payload, {
      connection,
      siteId: "site-1",
    } as never)) as {
      payload: {
        body: {
          data: unknown;
        };
      };
    };
    expect(
      pollSiteChanges.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload: result.payload,
        } as never,
      ),
    ).toEqual([{ changeType: "added", record: created }]);
  });
  test("an empty poll resolves to no items", async () => {
    getMock.mockResolvedValueOnce({
      data: { value: [], "@odata.deltaLink": "https://graph/delta?token=2" },
    });
    const { ctx } = context();
    const result = (await drivePollingTrigger.perform(ctx, payload, {
      connection,
      driveId: "drive-1",
    } as never)) as {
      payload: {
        body: {
          data: unknown;
        };
      };
    };
    expect(
      drivePollingTrigger.triggerResolver?.resolveItems?.(
        {} as never,
        {
          payload: result.payload,
        } as never,
      ),
    ).toEqual([]);
  });
});
