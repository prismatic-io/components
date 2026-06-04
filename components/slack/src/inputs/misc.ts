import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";






const { debugRequest, ...rawRequestSharedInputs } = httpClientInputs;

export { debugRequest, rawRequestSharedInputs };

export const rawRequestInputs = {
  connection: connectionInput,
  ...rawRequestSharedInputs,
  url: {
    ...rawRequestSharedInputs.url,
    comments:
      "The path portion of the Slack API URL only (e.g., `/team.info`). The base URL `https://slack.com/api` is already included. For example, to call `https://slack.com/api/team.info`, enter only `/team.info` here.",
    example: "/team.info",
  },
};
