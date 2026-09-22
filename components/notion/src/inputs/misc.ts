import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { BASE_URL } from "../constants";
import { connectionInput } from "./common";
const { debugRequest: _debugRequest, ...httpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection: connectionInput,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments: `Input the path only (/users/me), The base URL is already included (${BASE_URL}). For example, to connect to ${BASE_URL}/users/me, only /users/me is entered in this field.`,
    example: "/users/me",
  },
};
