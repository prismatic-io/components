import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./general";
import { GRAPH_API_URL } from "../constants";

export const rawRequestInputs = {
  connection,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments: `Input the path only (/106540352242922/messages), The base URL is already included (${GRAPH_API_URL}). For example, to connect to ${GRAPH_API_URL}/106540352242922/messages, only /106540352242922/messages is entered in this field.`,
    example: "/106540352242922/messages",
    placeholder: "/106540352242922/messages",
  },
};
