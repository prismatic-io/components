import {
  connectionInput,
  fetchAll,
  pagination,
  project,
  projects,
} from "./common";
export const listProjectWebhooksInputs = {
  connection: connectionInput,
  project,
  fetchAll,
  pagination,
};
export const deleteInstancedWebhooksInputs = {
  connection: connectionInput,
  projects: {
    ...projects,
    comments: "The projects to remove this instance's webhooks from.",
  },
};
