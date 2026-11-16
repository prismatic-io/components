import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { connectionInput } from "./common";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "Input the path only (/v1/employees/directory), The base URL is already included (https://api.bamboohr.com/api/gateway.php/COMPANY_DOMAIN). For example, to connect to https://api.bamboohr.com/api/gateway.php/COMPANY_DOMAIN/v1/employees/directory, only /v1/employees/directory is entered in this field.",
    example: "/v1/employees/directory",
  },
};
