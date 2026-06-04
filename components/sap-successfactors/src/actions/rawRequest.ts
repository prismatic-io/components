import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs/general";
import { getBaseURL, getProtocol, getToken } from "../util";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to the SAP SuccessFactors API",
  },
  inputs: {
    connection,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/Candidate), The base URL is already included ({{ YOUR_API_SERVER_URL }}). For example, to connect to {{ YOUR_API_SERVER_URL }}/Candidate, only /Candidate is entered in this field",
      example: "/Candidate",
    },
  },
  perform: async (_context, { connection, ...httpClientInputs }) => {
    const protocol = getProtocol(connection);
    const baseUrl = getBaseURL(connection);
    const token = await getToken(connection, baseUrl);
    const { data } = await sendRawRequest(`${baseUrl}${protocol}`, httpClientInputs, {
      Authorization: `Bearer ${token}`,
    });
    return { data };
  },
});

export default rawRequest;
