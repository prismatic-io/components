import { resolvePagination, resolveQueryParameters } from "./groupedInputs";

const flatPagination = { pageLimit: "2", pageToken: "X%2744537079ghv" };
const flatQueryParameters = {
  $select: "id,name",
  $expand: "thumbnails",
  $top: "5",
};

describe("resolvePagination", () => {
  test("reads the group when it holds values", () => {
    expect(
      resolvePagination({
        pagination: { pageLimit: 10, pageToken: "next-page" },
      }),
    ).toEqual({ pageSize: 10, pageToken: "next-page" });
  });

  test("falls back to the flat values of a step saved before the grouping", () => {
    expect(
      resolvePagination({ pagination: undefined, ...flatPagination } as never),
    ).toEqual({ pageSize: 2, pageToken: "X%2744537079ghv" });
  });

  test("the group wins when both shapes are present", () => {
    expect(
      resolvePagination({
        pagination: { pageLimit: 10, pageToken: "next-page" },
        ...flatPagination,
      } as never),
    ).toEqual({ pageSize: 10, pageToken: "next-page" });
  });

  test("falls back per field when the group leaves one blank", () => {
    expect(
      resolvePagination({
        pagination: { pageLimit: undefined, pageToken: "next-page" },
        ...flatPagination,
      } as never),
    ).toEqual({ pageSize: 2, pageToken: "next-page" });
  });

  test("returns no paging when neither shape holds a value", () => {
    expect(resolvePagination({ pagination: undefined })).toEqual({
      pageSize: undefined,
      pageToken: undefined,
    });
  });

  test("treats a blank flat value as unset", () => {
    expect(
      resolvePagination({
        pagination: undefined,
        pageLimit: "",
        pageToken: "",
      } as never),
    ).toEqual({ pageSize: undefined, pageToken: undefined });
  });
});

describe("resolveQueryParameters", () => {
  test("reads the group when it holds values", () => {
    expect(
      resolveQueryParameters({
        queryParameters: { $select: "id", $expand: "children", $top: 3 },
      }),
    ).toEqual({ $select: "id", $expand: "children", $top: 3 });
  });

  test("falls back to the flat values of a step saved before the grouping", () => {
    expect(
      resolveQueryParameters({
        queryParameters: undefined,
        ...flatQueryParameters,
      } as never),
    ).toEqual({ $select: "id,name", $expand: "thumbnails", $top: 5 });
  });

  test("the group wins when both shapes are present", () => {
    expect(
      resolveQueryParameters({
        queryParameters: { $select: "id", $expand: "children", $top: 3 },
        ...flatQueryParameters,
      } as never),
    ).toEqual({ $select: "id", $expand: "children", $top: 3 });
  });

  test("falls back per field when the group leaves one blank", () => {
    expect(
      resolveQueryParameters({
        queryParameters: { $select: "id", $expand: undefined, $top: undefined },
        ...flatQueryParameters,
      } as never),
    ).toEqual({ $select: "id", $expand: "thumbnails", $top: 5 });
  });

  test("returns no query options when neither shape holds a value", () => {
    expect(resolveQueryParameters({ queryParameters: undefined })).toEqual({
      $select: undefined,
      $expand: undefined,
      $top: undefined,
    });
  });
});
