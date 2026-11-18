import {
  addMemberToGroupInputs,
  createGroupInputs,
  upsertGroupInputs,
} from "./group";

type Clean = (value: unknown) => unknown;

describe.each<[string, Clean]>([
  ["displayName", upsertGroupInputs.groupFields.inputs.displayName.clean],
  ["mailNickname", upsertGroupInputs.groupFields.inputs.mailNickname.clean],
])("groupFields.%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("HR Taskforce")).toBe("HR Taskforce");
  });

  test("returns undefined for an empty value so the field is left out", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});

describe.each<[string, Clean]>([
  ["displayName", createGroupInputs.displayName.clean],
  ["mailNickname", createGroupInputs.mailNickname.clean],
  ["groupMemberOdataId", addMemberToGroupInputs.groupMemberOdataId.clean],
])("%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("MarketingTeam")).toBe("MarketingTeam");
  });

  test("coerces an empty value to an empty string instead of throwing", () => {
    expect(clean(undefined)).toBe("");
  });
});

describe.each<[string, Clean]>([
  ["mailEnabled", createGroupInputs.mailEnabled.clean],
  ["securityEnabled", createGroupInputs.securityEnabled.clean],
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
  [
    "groupFields.mailEnabled",
    upsertGroupInputs.groupFields.inputs.mailEnabled.clean,
  ],
  [
    "groupFields.securityEnabled",
    upsertGroupInputs.groupFields.inputs.securityEnabled.clean,
  ],
])("%s.clean", (_name, clean) => {
  test("coerces the True/False model values", () => {
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });

  test("returns undefined when left blank so the field is not sent", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
