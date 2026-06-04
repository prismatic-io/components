import { connectionInput, maxResults, pageToken, projectId } from "./common";


export const getServiceAccountInputs = {
  connectionInput,
  projectId,
};

export const listProjectsInputs = {
  connectionInput,
  pageToken,
  maxResults,
};
