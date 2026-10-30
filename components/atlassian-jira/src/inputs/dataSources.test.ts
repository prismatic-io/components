import { issueFieldsInputs, selectIssueTypeInputs as i } from "./dataSources";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

describe("data source input cleans", () => {
  run([
    ["projectIds", i.projectIds, "10201", [{ projectId: "10201" }]],
    ["returnIssueTypeName", i.returnIssueTypeName, "true", true, false],
    [
      "onlyCustomFields",
      issueFieldsInputs.onlyCustomFields,
      "true",
      true,
      false,
    ],
  ]);
});
