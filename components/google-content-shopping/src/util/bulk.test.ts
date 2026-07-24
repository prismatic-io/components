import { runBulk } from "./bulk";
describe("runBulk", () => {
  test("runs every item and preserves input order in the results", async () => {
    const results = await runBulk([1, 2, 3], async (n) => n * 10);
    expect(results).toStrictEqual([
      { success: true, result: 10 },
      { success: true, result: 20 },
      { success: true, result: 30 },
    ]);
  });
  test("isolates a failing item without failing the whole batch", async () => {
    const results = await runBulk([1, 2, 3], async (n) => {
      if (n === 2) throw new Error("boom");
      return n;
    });
    expect(results).toStrictEqual([
      { success: true, result: 1 },
      { success: false, error: "boom" },
      { success: true, result: 3 },
    ]);
  });
  test("never runs more workers concurrently than the cap", async () => {
    let active = 0;
    let maxActive = 0;
    await runBulk(
      [1, 2, 3, 4, 5, 6],
      async () => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        await Promise.resolve();
        await Promise.resolve();
        active -= 1;
        return null;
      },
      2,
    );
    expect(maxActive).toBeLessThanOrEqual(2);
  });
});
