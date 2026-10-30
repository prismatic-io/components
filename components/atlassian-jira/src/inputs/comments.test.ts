import { updateCommentInputs as i } from "./comments";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

describe("comments input cleans", () => {
  run([
    ["comment", i.comment, "Looks good", "Looks good", ""],
    ["commentId", i.commentId, 10000, "10000", ""],
  ]);
});
