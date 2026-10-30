import { quoteJqlString } from "./jql";

describe("quoteJqlString", () => {
  test("wraps plain text in double quotes", () => {
    expect(quoteJqlString("login bug")).toBe('"login bug"');
  });

  test("escapes embedded quote marks so they cannot end the JQL string", () => {
    expect(quoteJqlString('say "hi"')).toBe('"say \\"hi\\""');
  });

  test("escapes a backslash so it cannot escape the closing quote mark", () => {
    expect(quoteJqlString("a\\")).toBe('"a\\\\"');
  });

  test("escapes a backslash before a quote mark so the quote stays escaped", () => {
    expect(quoteJqlString('x\\" OR project = ABC')).toBe(
      '"x\\\\\\" OR project = ABC"',
    );
  });

  test("quotes an empty value", () => {
    expect(quoteJqlString("")).toBe('""');
  });
});
