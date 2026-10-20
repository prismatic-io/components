import branchActions from "./branches";
import commitActions from "./commits";
import fileActions from "./files";
import groupActions from "./groups";
import issueActions from "./issues";
import mergeRequestActions from "./mergeRequests";
import miscActions from "./misc";
import noteActions from "./notes";
import pipelineActions from "./pipelines";
import projectMetadataActions from "./projectMetadata";
import projectActions from "./projects";
import userActions from "./users";
import webhookActions from "./webhooks";
export default {
  ...branchActions,
  ...commitActions,
  ...fileActions,
  ...groupActions,
  ...issueActions,
  ...mergeRequestActions,
  ...miscActions,
  ...noteActions,
  ...pipelineActions,
  ...projectMetadataActions,
  ...projectActions,
  ...userActions,
  ...webhookActions,
};
