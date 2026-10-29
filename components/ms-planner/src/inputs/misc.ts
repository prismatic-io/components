import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _debugRequest, ...httpRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpRequestInputs,
  url: {
    ...httpRequestInputs.url,
    comments:
      "The path of the Microsoft Graph endpoint to call (e.g., `/planner/plans`). The base URL `https://graph.microsoft.com/v1.0` is added automatically. Planner endpoints that modify or delete a resource require an `If-Match` header carrying the resource's current ETag.",
    example: "/planner/plans",
  },
};
