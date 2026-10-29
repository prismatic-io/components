import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "The path to append to the Smartsheet API base URL (https://api.smartsheet.com/2.0). For example, to reach https://api.smartsheet.com/2.0/reports, enter /reports.",
    example: "/reports",
  },
};
