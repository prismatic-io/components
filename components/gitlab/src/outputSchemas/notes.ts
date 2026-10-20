import { bool, list, nullableStr, num, obj, str, userSchema } from "./shared";
export const noteAuthorSchema = obj({
  ...userSchema.properties,
  email: str,
  created_at: str,
});
export const noteSchema = obj({
  id: num,
  body: str,
  author: noteAuthorSchema,
  created_at: str,
  updated_at: str,
  system: bool,
  noteable_id: num,
  noteable_iid: num,
  noteable_type: str,
  project_id: num,
  resolvable: bool,
  internal: bool,
  imported: bool,
  imported_from: nullableStr,
  commands_changes: obj({}),
});
export const noteListSchema = list(noteSchema);
export const createIssueNoteOutputSchema = noteSchema;
export const createMergeRequestNoteOutputSchema = noteSchema;
export const listIssueNotesOutputSchema = noteListSchema;
export const listMergeRequestNotesOutputSchema = noteListSchema;
