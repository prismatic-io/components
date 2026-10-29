import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, version } from "../../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Cloud BigQuery",
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/projects/{projectId}/jobs), The base URL is already included (https://bigquery.googleapis.com/bigquery/{version}). For example, to connect to https://bigquery.googleapis.com/bigquery/v2/projects/{projectId}/jobs, only /projects/{projectId}/jobs is entered in this field.",
      example: "/projects/{projectId}/jobs",
    },
  },
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    const url = `https://bigquery.googleapis.com/bigquery/${version}`;
    const token = util.types.toString(connection.token?.access_token);
    const { data } = await sendRawRequest(
      url,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
});

export default rawRequest;
