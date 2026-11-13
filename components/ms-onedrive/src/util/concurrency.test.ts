import { mapWithConcurrency } from "./concurrency";

describe("mapWithConcurrency", () => {
  test("keeps the input order and never exceeds the limit", async () => {
    let inFlight = 0;
    let peak = 0;

    const results = await mapWithConcurrency(
      [30, 5, 20, 1, 10],
      2,
      async (delay) => {
        inFlight += 1;
        peak = Math.max(peak, inFlight);
        await new Promise((resolve) => setTimeout(resolve, delay));
        inFlight -= 1;
        return delay * 2;
      },
    );

    expect(results).toEqual([60, 10, 40, 2, 20]);
    expect(peak).toBe(2);
  });

  test("returns an empty list for no items", async () => {
    expect(await mapWithConcurrency([], 5, async (item) => item)).toEqual([]);
  });
});
