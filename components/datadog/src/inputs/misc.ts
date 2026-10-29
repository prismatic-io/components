import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

export const rawRequestInputs = {
  connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "The URL path to send the request to. The base URL is determined by the Datadog Site configured in the connection. For example, to call the Submit Metrics endpoint, enter /api/v2/series.",
    example: "/api/v2/series",
  },
};
