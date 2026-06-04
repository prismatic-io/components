import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { API_URL } from "../constants";
import { connection } from "./common";

export const rawRequestInputs = {
  connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/users), The base URL is already included (${API_URL}). For example, to connect to ${API_URL}/users, only /users is entered in this field.`,
    example: "/users",
  },
};
