import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getClientProps } from "../client";
import { connection } from "../inputs/general";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to GoTo Webinar.",
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { baseUrl, token } = getClientProps(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: token,
        "Content-Type": "Application/JSON",
        Accept: "Application/JSON",
      },
    );

    return {
      data: { data },
    };
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/organizers), The base URL is " +
        "already included. For example," +
        " in order to send a webinar request, " +
        `only /organizer/{organizerKey}/webinars is entered in this field.`,
      example: "/organizers/{organizerKey}/webinars",
    },
  },
});
