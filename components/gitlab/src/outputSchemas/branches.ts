import { commitSchema } from "./commits";
import { bool, deletedSchema, list, obj, str } from "./shared";
export const branchSchema = obj({
  name: str,
  merged: bool,
  protected: bool,
  default: bool,
  developers_can_push: bool,
  developers_can_merge: bool,
  can_push: bool,
  web_url: str,
  commit: commitSchema,
});
export const branchListSchema = list(branchSchema);
export const createBranchOutputSchema = branchSchema;
export const getBranchOutputSchema = branchSchema;
export const listBranchesOutputSchema = branchListSchema;
export const deleteBranchOutputSchema = deletedSchema;
