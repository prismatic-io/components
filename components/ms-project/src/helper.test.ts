import { toPaginationParams } from "./helper";

describe("toPaginationParams", () => {
  it.each([
    { pageSize: undefined, pageNumber: undefined },
    { pageSize: "0", pageNumber: "0" },
    { pageSize: 0, pageNumber: 0 },
    { pageSize: "20", pageNumber: "0" },
    { pageSize: 20, pageNumber: 0 },
    { pageSize: "0", pageNumber: "1" },
    { pageSize: 0, pageNumber: 1 },
  ])("should return undefined for invalid values", ({ pageSize, pageNumber }) => {
    const result = toPaginationParams(pageSize, pageNumber);
    expect(result).toBeUndefined();
  });

  it.each([
    { pageSize: 20, pageNumber: 1, expected: { $top: 20, $skip: 0 } },
    { pageSize: "20", pageNumber: "1", expected: { $top: 20, $skip: 0 } },
    { pageSize: 20, pageNumber: 2, expected: { $top: 20, $skip: 20 } },
    { pageSize: "20", pageNumber: "2", expected: { $top: 20, $skip: 20 } },
    { pageSize: 50, pageNumber: 5, expected: { $top: 50, $skip: 200 } },
    { pageSize: "50", pageNumber: "5", expected: { $top: 50, $skip: 200 } },
  ])("should return expected options object for valid values", ({
    pageSize,
    pageNumber,
    expected,
  }) => {
    const result = toPaginationParams(pageSize, pageNumber);
    expect(result).toStrictEqual(expected);
  });
});
