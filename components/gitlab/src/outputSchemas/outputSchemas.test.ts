import {
  getBranchExamplePayload,
  getCommitExamplePayload,
  getCurrentUserExamplePayload,
  getGroupExamplePayload,
  getIssueExamplePayload,
  getMergeRequestExamplePayload,
  getPipelineExamplePayload,
  getProjectExamplePayload,
  listCommitsExamplePayload,
  listGroupsExamplePayload,
  listIssueNotesExamplePayload,
  listPipelinesExamplePayload,
  listProjectMembersExamplePayload,
  listUsersExamplePayload,
} from "../examplePayloads";
import {
  branchSchema,
  commitDetailSchema,
  commitSchema,
  currentUserSchema,
  groupDetailSchema,
  groupSchema,
  issueSchema,
  memberSchema,
  mergeRequestSchema,
  noteSchema,
  pipelineDetailSchema,
  pipelineSchema,
  projectSchema,
  userSchema,
} from "./index";

const undocumented = (
  schema: { properties: Record<string, unknown> },
  example: Record<string, unknown>,
) => Object.keys(example).filter((key) => !(key in schema.properties));

describe("output schemas cover their examples", () => {
  test.each([
    ["project", projectSchema, getProjectExamplePayload.data],
    ["issue", issueSchema, getIssueExamplePayload.data],
    ["merge request", mergeRequestSchema, getMergeRequestExamplePayload.data],
    ["branch", branchSchema, getBranchExamplePayload.data],
    ["commit", commitSchema, listCommitsExamplePayload.data[0]],
    ["commit detail", commitDetailSchema, getCommitExamplePayload.data],
    ["user", userSchema, listUsersExamplePayload.data[0]],
    ["current user", currentUserSchema, getCurrentUserExamplePayload.data],
    ["group", groupSchema, listGroupsExamplePayload.data[0]],
    ["group detail", groupDetailSchema, getGroupExamplePayload.data],
    ["member", memberSchema, listProjectMembersExamplePayload.data[0]],
    ["note", noteSchema, listIssueNotesExamplePayload.data[0]],
    ["pipeline", pipelineSchema, listPipelinesExamplePayload.data[0]],
    ["pipeline detail", pipelineDetailSchema, getPipelineExamplePayload.data],
  ])("%s", (_name, schema, example) => {
    expect(undocumented(schema, example)).toEqual([]);
  });

  test("merge request schema omits deprecated fields", () => {
    expect(mergeRequestSchema.properties).not.toHaveProperty("merge_status");
    expect(mergeRequestSchema.properties).not.toHaveProperty("merged_by");
  });

  test("current user and group detail extend the shared shapes", () => {
    expect(currentUserSchema.properties).toHaveProperty("email");
    expect(groupDetailSchema.properties).toHaveProperty("shared_with_groups");
    expect(projectSchema.properties.emails_enabled).toEqual({
      type: ["boolean", "null"],
    });
  });
});
