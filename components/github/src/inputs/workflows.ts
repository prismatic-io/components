import { input } from "@prismatic-io/spectral";
import { cleanOptionalJson, cleanString } from "../utils";
import { connectionInput, owner, repo } from "./common";
const workflowId = input({
  label: "Workflow Id",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The ID of the workflow",
});
const workflowRef = input({
  label: "Ref",
  type: "string",
  required: true,
  clean: cleanString,
  comments: "The git reference for the workflow",
});
const workflowInputs = input({
  label: "Inputs",
  type: "string",
  required: false,
  clean: cleanOptionalJson,
  default: `{"input1":"My Value","input2":"My Other Value"}`,
  comments:
    "Input keys and values configured in the workflow file. This can be a JSON input mapping, or a reference to a previous step that returned an object.",
});
export const actionsCreateWorkflowDispatchInputs = {
  connection: connectionInput,
  owner,
  repo,
  workflowId,
  ref: workflowRef,
  inputs: workflowInputs,
};
