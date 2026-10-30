export const quoteJqlString = (value: string): string =>
  `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

export const isIssueKeyOrId = (value: string): boolean =>
  /^([a-z][a-z0-9_]*-\d+|\d+)$/i.test(value);
