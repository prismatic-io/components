import { listChangesInputs } from "./change";

describe("listChanges odataQueryParams.$skiptoken.clean", () => {
  const { clean } = listChangesInputs.odataQueryParams.inputs.$skiptoken;

  test("keeps a provided token", () => {
    expect(clean("token-1")).toBe("token-1");
  });

  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
  });
});
