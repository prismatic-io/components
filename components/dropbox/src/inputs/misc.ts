import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, teamMemberId, userType } from "./common";
const { debugRequest, ...httpInputs } = httpClientInputs;
export const getCurrentAccountInputs = {
  dropboxConnection: connectionInput,
};
export const rawRequestInputs = {
  connection: connectionInput,
  userType,
  teamMemberId,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "The API path only, such as `/file_requests/create`. The base URL `https://api.dropboxapi.com/2` is applied automatically, so to call `https://api.dropboxapi.com/2/file_requests/create` enter `/file_requests/create`.",
    example: "/file_requests/create",
  },
};
