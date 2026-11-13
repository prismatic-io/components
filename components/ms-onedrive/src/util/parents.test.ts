import { vi } from "vitest";
import { listForParent } from "./parents";

const graphError = (status: number): Error =>
  Object.assign(new Error(`Request failed with status code ${status}`), {
    response: { status },
  });
const warn = vi.fn();
const logger = { warn } as never;

beforeEach(() => {
  warn.mockReset();
});

describe("listForParent", () => {
  const site = { id: "s1", label: "Intranet" };

  test("still fails on an error that carries no HTTP status", async () => {
    await expect(
      listForParent(site, { kind: "site", canSkip: true, logger }, async () => {
        throw new Error("socket hang up");
      }),
    ).rejects.toThrow("socket hang up");
    expect(warn).not.toHaveBeenCalled();
  });

  test("returns what the parent holds", async () => {
    const result = await listForParent(
      site,
      { kind: "site", canSkip: true, logger },
      async () => ["d1"],
    );

    expect(result).toEqual(["d1"]);
    expect(warn).not.toHaveBeenCalled();
  });

  test.each([
    403, 404,
  ])("skips a parent Graph answers %s for, with a warning", async (status) => {
    const result = await listForParent(
      site,
      { kind: "site", canSkip: true, logger },
      async () => {
        throw graphError(status);
      },
    );

    expect(result).toEqual([]);
    expect(warn).toHaveBeenCalledWith(
      `Skipped site Intranet: Microsoft Graph answered ${status}.`,
    );
  });

  test("names the parent by its ID when it has no label", async () => {
    await listForParent(
      { id: "s1" },
      { kind: "site", canSkip: true, logger },
      async () => {
        throw graphError(404);
      },
    );

    expect(warn).toHaveBeenCalledWith(
      "Skipped site s1: Microsoft Graph answered 404.",
    );
  });

  test("still fails for a single parent", async () => {
    await expect(
      listForParent(
        site,
        { kind: "site", canSkip: false, logger },
        async () => {
          throw graphError(403);
        },
      ),
    ).rejects.toThrow("403");
  });

  test.each([401, 429, 500])("still fails on status %s", async (status) => {
    await expect(
      listForParent(site, { kind: "site", canSkip: true, logger }, async () => {
        throw graphError(status);
      }),
    ).rejects.toThrow(`${status}`);
    expect(warn).not.toHaveBeenCalled();
  });
});
