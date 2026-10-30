import { createUserInputs as i, getUserInputs } from "./users";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

describe("user input cleans", () => {
  run([
    [
      "accountId",
      getUserInputs.accountId,
      "5b10a2844c20165700ede21g",
      "5b10a2844c20165700ede21g",
      "",
    ],
    [
      "emailAddress",
      i.emailAddress,
      "john@example.com",
      "john@example.com",
      "",
    ],
    ["username", i.username, "jsmith", "jsmith", ""],
    ["password", i.password, "secret", "secret", ""],
    ["notifications", i.notifications, "true", true, false],
    ["displayName", i.displayName, "John Smith", "John Smith", ""],
  ]);
});
