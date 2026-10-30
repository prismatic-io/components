import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "The path only, such as `/rest/api/3/project/recent`. The base URL `https://api.atlassian.com/ex/jira/{cloudId}` is already included, so to call `https://api.atlassian.com/ex/jira/{cloudId}/rest/api/3/project/recent`, enter only `/rest/api/3/project/recent`.",
    default: "/rest/api/3/project/recent",
  },
};
