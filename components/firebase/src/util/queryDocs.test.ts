import type { Firestore } from "firebase-admin/firestore";
import { vi } from "vitest";
import { queryDocs } from "./queryDocs";

const fakeDb = () => {
  const query = {
    where: vi.fn(() => query),
    orderBy: vi.fn(() => query),
    get: vi.fn(async () => ({ docs: [] })),
  };
  const db = { collection: vi.fn(() => query) } as unknown as Firestore;
  return { db, query };
};

const conditions = (operator: string, value: unknown) =>
  JSON.stringify([{ field: "tags", operator, value }]);

describe("queryDocs", () => {
  test.each([
    "array-contains",
    "<",
    "in",
  ])("rejects a null value with the %s operator", async (operator) => {
    const { db, query } = fakeDb();

    await expect(
      queryDocs({
        db,
        collection: "customers",
        queryOperatorCode: conditions(operator, null),
        orderBy: "",
      }),
    ).rejects.toThrow(
      "Failed to parse query operators: Invalid query. You can only perform '==' and '!=' comparisons on Null.",
    );
    expect(query.get).not.toHaveBeenCalled();
  });

  test.each([
    "==",
    "!=",
  ])("accepts a null value with the %s operator", async (operator) => {
    const { db, query } = fakeDb();

    await queryDocs({
      db,
      collection: "customers",
      queryOperatorCode: conditions(operator, null),
      orderBy: "",
    });

    expect(query.where).toHaveBeenCalledWith("tags", operator, null);
    expect(query.get).toHaveBeenCalledTimes(1);
  });
});
