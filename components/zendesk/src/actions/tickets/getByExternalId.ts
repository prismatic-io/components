import { action } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { getByExternalIdPayload } from "../../examplePayloads";
import { connectionInput, externalId } from "../../inputs";

export const getByExternalId = action({
  display: {
    label: "Get Ticket By External ID",
    description: "Get a ticket by external ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const result = await client.tickets.listWithFilter(
      "external_id",
      params.externalId as string | number,
    );
    return {
      data: result,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    externalId,
  },
  examplePayload: {
    data: getByExternalIdPayload as unknown,
  },
});
