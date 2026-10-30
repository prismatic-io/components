import {
  addIssueAttachmentInputs,
  createIssueInputs as i,
  downloadAttachmentInputs,
  findIssueInputs,
  transitionIssueInputs,
  updateIssueInputs,
} from "./issues";

type Row = [string, { clean?: unknown }, unknown, unknown, unknown?];

const run = (rows: Row[]) =>
  test.each(rows)("%s", (_name, input, value, expected, ...empty) => {
    const clean = input.clean as (raw: unknown) => unknown;
    expect(clean(value)).toEqual(expected);
    if (empty.length > 0) expect(clean("")).toEqual(empty[0]);
  });

const { dueDate, versions, fixVersions } = i.additionalFields.inputs;

describe("issue input cleans", () => {
  run([
    ["summary", i.summary, "Login fails", "Login fails", ""],
    [
      "assignee",
      i.assignee,
      "5b10a2844c20165700ede21g",
      "5b10a2844c20165700ede21g",
    ],
    [
      "reporter",
      i.reporter,
      "5b10a2844c20165700ede21g",
      "5b10a2844c20165700ede21g",
    ],
    ["issueType", i.issueType, "Bug", "Bug", ""],
    ["issueTypeId", i.issueTypeId, 10001, "10001", ""],
    ["ADFdescription", i.ADFdescription, '{"type":"doc"}', { type: "doc" }],
    ["priority", i.priority, "3", "3"],
    ["labels", i.labels, ["bug"], ["bug"]],
    ["dueDate", dueDate, "2026-12-31", "2026-12-31"],
    ["versions", versions, '[{"id":"10000"}]', [{ id: "10000" }], undefined],
    [
      "fixVersions",
      fixVersions,
      '{"id":"10001"}',
      [{ id: "10001" }],
      undefined,
    ],
    [
      "issueId (Download Issue Attachments)",
      downloadAttachmentInputs.issueId,
      10201,
      "10201",
      undefined,
    ],
    [
      "summary (Update Issue)",
      updateIssueInputs.summary,
      "Login fails",
      "Login fails",
      undefined,
    ],
    ["transitionId", transitionIssueInputs.transitionId, 31, "31", ""],
    [
      "attachmentIds",
      downloadAttachmentInputs.attachmentIds,
      '[{"id":"10000","mimeType":"image/png"}]',
      [{ id: "10000", mimeType: "image/png" }],
    ],
    ["fields", findIssueInputs.fields, "summary,status", "summary,status", ""],
    ["searchType", findIssueInputs.searchType, "summary", "summary"],
    [
      "file",
      addIssueAttachmentInputs.file,
      "hello",
      { data: Buffer.from("hello"), contentType: "text/plain" },
    ],
    [
      "fileName",
      addIssueAttachmentInputs.fileName,
      "report.pdf",
      "report.pdf",
      "",
    ],
  ]);
});
