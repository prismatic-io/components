import {
  boardId,
  description,
  dynamicValues,
  expand,
  fetchAll,
  fieldValues,
  filter,
  issueId,
  maxResults,
  nextPageToken,
  projectId,
  projectKey,
  searchString,
  searchValue,
  startAt,
} from "./common";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

describe("common input cleans", () => {
  run([
    ["projectId", projectId, 10201, "10201", ""],
    ["issueId", issueId, 10201, "10201", ""],
    ["expand", expand, "names", "names"],
    ["filter", filter, "my", "my", ""],
    ["description", description, "A description", "A description"],
    ["searchString", searchString, "bug", "bug", ""],
    ["searchValue", searchValue, " PROJ ", "proj"],
    ["maxResults", maxResults, "25", 25, 50],
    ["maxResults (zero)", maxResults, "0", 50],
    ["startAt", startAt, "10", 10, 0],
    ["boardId", boardId, 84, "84", ""],
    ["projectKey", projectKey, "PROJ", "PROJ", undefined],
    [
      "fieldValues",
      fieldValues,
      [{ key: "name", value: "Example" }],
      { name: "Example" },
    ],
    [
      "dynamicValues",
      dynamicValues,
      '[{"key":"name","value":"Example"}]',
      { name: "Example" },
    ],
    ["fetchAll", fetchAll, "true", true, false],
    ["nextPageToken", nextPageToken, "CAEaAggD", "CAEaAggD"],
  ]);
});
