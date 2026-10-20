import type { InputFieldDefinition } from "@prismatic-io/spectral";
import { convertInput } from "@prismatic-io/spectral/dist/serverTypes/convertComponent";
import { fetchAll, page, perPage } from "./common";
import { createFileInputs, updateFileInputs } from "./files";
import { createIssueInputs, updateIssueInputs } from "./issues";
import {
  acceptMergeRequestInputs,
  createMergeRequestInputs,
} from "./mergeRequests";
import { listProjectsInputs } from "./projects";
import { pollChangesInputs } from "./triggers";
describe("optional true/false selects", () => {
  test.each([
    [
      "Create Issue Confidential",
      createIssueInputs.additionalFields.inputs.confidential,
    ],
    [
      "Update Issue Confidential",
      updateIssueInputs.additionalFields.inputs.confidential,
    ],
    [
      "Create MR Squash",
      createMergeRequestInputs.additionalFields.inputs.squash,
    ],
    [
      "Create MR Remove Source Branch",
      createMergeRequestInputs.additionalFields.inputs.removeSourceBranch,
    ],
    ["Accept MR Squash", acceptMergeRequestInputs.mergeOptions.inputs.squash],
    [
      "Accept MR Remove Source Branch",
      acceptMergeRequestInputs.mergeOptions.inputs.shouldRemoveSourceBranch,
    ],
  ])("%s stays unset when untouched", (name: string, definition: unknown) => {
    const field = definition as InputFieldDefinition & {
      clean: (value: unknown) => unknown;
    };
    const manifestDefault = convertInput(name, field as never).default;
    expect(field.clean(manifestDefault)).toBeUndefined();
    expect(field.clean("true")).toBe(true);
    expect(field.clean("false")).toBe(false);
  });
});
describe("boolean toggle cleans", () => {
  test.each([
    ["Fetch All", fetchAll.clean],
    ["List Projects Fetch All", listProjectsInputs.fetchAll.clean],
    ["Membership", listProjectsInputs.membership.clean],
    ["Show New Records", pollChangesInputs.showNewRecords.clean],
    ["Show Updated Records", pollChangesInputs.showUpdatedRecords.clean],
  ])("%s converts string and boolean values to a boolean", (_name, clean) => {
    expect(clean("true")).toBe(true);
    expect(clean(true)).toBe(true);
    expect(clean("false")).toBe(false);
    expect(clean(false)).toBe(false);
  });
  test.each([
    ["Fetch All", fetchAll.clean],
    ["Membership", listProjectsInputs.membership.clean],
    ["Show New Records", pollChangesInputs.showNewRecords.clean],
    ["Show Updated Records", pollChangesInputs.showUpdatedRecords.clean],
  ])("%s treats an empty value as false, never throwing", (_name, clean) => {
    expect(clean("")).toBe(false);
    expect(clean(undefined)).toBe(false);
  });
});
describe("pagination number cleans", () => {
  test.each([
    ["Per Page", perPage.clean],
    ["Page", page.clean],
  ])("%s converts a numeric string to a number", (_name, clean) => {
    expect(clean("20")).toBe(20);
    expect(clean(" 2 ")).toBe(2);
  });
  test.each([
    ["Per Page", perPage.clean],
    ["Page", page.clean],
  ])("%s turns an empty value into 0, which the list helper omits", (_name, clean) => {
    expect(clean("")).toBe(0);
    expect(clean(undefined)).toBe(0);
  });
  test.each([
    ["Per Page", perPage.clean],
    ["Page", page.clean],
  ])("%s throws on a non-numeric value", (_name, clean) => {
    expect(() => clean("abc")).toThrow(/cannot be coerced to a number/);
  });
});
describe("file content clean", () => {
  test.each([
    ["Create File Content", createFileInputs.content.clean],
    ["Update File Content", updateFileInputs.content.clean],
  ])("%s keeps indentation and the trailing newline", (_name, clean) => {
    expect(clean("  key: v\n")).toBe("  key: v\n");
  });
  test.each([
    ["Create File Content", createFileInputs.content.clean],
    ["Update File Content", updateFileInputs.content.clean],
  ])("%s rejects a missing, empty, or whitespace-only value", (_name, clean) => {
    expect(() => clean("")).toThrow("A value is required for this input.");
    expect(() => clean(undefined)).toThrow(/required/);
    expect(() => clean("  \n\t ")).toThrow(
      "A value is required for this input.",
    );
  });
});
