import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listMessageTemplatesExamplePayload } from "../../examplePayloads";
import { listMessageTemplatesInputs } from "../../inputs";

export const listMessageTemplates = action({
  display: {
    label: "List Message Templates",
    description: "Retrieves message templates.",
  },
  perform: async (context, { connection, params }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.connect}/messageTemplates`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: listMessageTemplatesInputs,
  examplePayload: listMessageTemplatesExamplePayload,
});
