import { input, util } from "@prismatic-io/spectral";
import { connectionInput, includeAll, pagination } from "./common";
const workspaceIdForTemplates = input({
  label: "Workspace ID",
  type: "string",
  required: false,
  clean: (v) => (v ? util.types.toString(v) : undefined),
  comments:
    "When supplied, fetches templates from this single workspace only: fast, single API call. " +
    "When omitted, the action paginates ALL workspaces and aggregates templates from each; " +
    "this preserves backwards compatibility with the legacy GET /templates response shape but " +
    "may be slow and rate-limit-sensitive on accounts with many workspaces (chunked-parallel concurrency 5). " +
    "Recommend supplying a workspace ID for production flows.",
  example: "843750385",
  placeholder: "Enter workspace ID",
});
export const templatesListInputs = {
  connection: connectionInput,
  workspaceIdForTemplates,
};
export const templatesListPublicInputs = {
  connection: connectionInput,
  includeAll,
  pagination,
};
