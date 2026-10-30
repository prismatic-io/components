import {
  pollChangesTriggerInputs as poll,
  webhookEventsInputs as webhook,
} from "./triggers";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

describe("trigger input cleans", () => {
  run([
    ["jqlFilter", webhook.jqlFilter, "project = PROJ", "project = PROJ", ""],
    ["pollJqlFilter", poll.pollJqlFilter, "project = PROJ", "project = PROJ"],
    ["showNewIssues", poll.showNewIssues, "true", true, false],
    ["showUpdatedIssues", poll.showUpdatedIssues, "true", true, false],
  ]);
});
