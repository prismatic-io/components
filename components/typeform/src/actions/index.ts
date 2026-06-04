import forms from "./forms";
import { rawRequest } from "./rawRequest";
import response from "./response";
import webhooks from "./webhooks";
import workspaces from "./workspaces";

export default {
  ...workspaces,
  ...forms,
  ...webhooks,
  ...response,
  rawRequest,
};
