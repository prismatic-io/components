import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getGoogleAuth } from "../client";
import { connectionInput, version } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Cloud Pub/Sub",
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/projects/{projectId}/topics), The base URL is already included (https://pubsub.googleapis.com/{version}). For example, to connect to https://pubsub.googleapis.com/v1/projects/{projectId}/topics, only /projects/{projectId}/topics is entered in this field.",
      example: "/projects/{projectId}/topics",
    },
  },
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    const url = `https://pubsub.googleapis.com/${version}`;
    const token = await getGoogleAuth(connection).getAccessToken();
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
