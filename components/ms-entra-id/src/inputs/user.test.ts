import { createUserInputs, updateUserInputs } from "./user";

type Clean = (value: unknown) => unknown;

const { inputs: userFields } = updateUserInputs.userFields;

describe.each<[string, Clean]>([
  ["displayName", createUserInputs.displayName.clean],
  ["password", createUserInputs.password.clean],
  ["userPrincipalName", createUserInputs.userPrincipalName.clean],
  ["domain", createUserInputs.domain.clean],
])("%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("AdeleV")).toBe("AdeleV");
  });

  test("coerces an empty value to an empty string instead of throwing", () => {
    expect(clean(undefined)).toBe("");
  });
});

describe.each<[string, Clean]>([
  ["userFields.displayName", userFields.displayName.clean],
  ["userFields.userPrincipalName", userFields.userPrincipalName.clean],
  ["userFields.domain", userFields.domain.clean],
])("%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("AdeleV")).toBe("AdeleV");
  });

  test("returns undefined for an empty value so the field is left out", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});

describe.each<[string, Clean]>([
  ["accountEnabled", createUserInputs.accountEnabled.clean],
  [
    "forceChangePasswordNextSignIn",
    createUserInputs.forceChangePasswordNextSignIn.clean,
  ],
])("%s.clean", (_name, clean) => {
  test("coerces boolean strings", () => {
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });

  test("coerces an empty value to false instead of throwing", () => {
    expect(clean(undefined)).toBe(false);
  });
});

describe.each<[string, Clean]>([
  ["userFields.givenName", userFields.givenName.clean],
  ["userFields.surname", userFields.surname.clean],
  ["userFields.jobTitle", userFields.jobTitle.clean],
])("%s.clean", (_name, clean) => {
  test("keeps a provided value", () => {
    expect(clean("Vance")).toBe("Vance");
  });

  test("returns undefined when left blank so the field is not sent", () => {
    expect(clean("")).toBeUndefined();
  });
});

describe("userFields.accountEnabled.clean", () => {
  const { clean } = userFields.accountEnabled;

  test("coerces the True/False model values", () => {
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });

  test("returns undefined when left blank so the field is not sent", () => {
    expect(clean("")).toBeUndefined();
  });
});
