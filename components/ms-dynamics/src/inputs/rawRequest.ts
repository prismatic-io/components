import { inputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const { debugRequest: _, ...httpRawRequestInputs } = inputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpRawRequestInputs,
  url: {
    ...httpRawRequestInputs.url,
    comments:
      "Input the path only (/api/data/v9.2/accounts?$select=name), The base URL is already included (https://my-org.api.crm.dynamics.com). For example, to connect to https://my-org.api.crm.dynamics.com/api/data/v9.2/accounts?$select=name, only /api/data/v9.2/accounts?$select=name is entered in this field.",
    example: "/accounts?$select=name",
  },
};

export const rawRequestV2Inputs = {
  connection: connectionInput,
  ...httpRawRequestInputs,
  url: {
    ...httpRawRequestInputs.url,
    example: "/api/data/v9.2/accounts?$select=name",
    comments:
      "Input the path only (/api/data/v9.2/accounts?$select=name), The base URL is already included (https://my-org.api.crm.dynamics.com). For example, to connect to https://my-org.api.crm.dynamics.com/api/data/v9.2/accounts?$select=name, only /api/data/v9.2/accounts?$select=name is entered in this field.",
  },
};
