import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { getSiteExamplePayload } from "../../examplePayloads";
import { getSiteInputs } from "../../inputs";

export const getSite = action({
  display: {
    label: "Get Site",
    description: "Get the information and metadata of a given Site",
  },
  perform: async (context, { connection, siteId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(client.get(`/sites/${siteId}`)),
    };
  },
  inputs: getSiteInputs,
  examplePayload: getSiteExamplePayload,
});
