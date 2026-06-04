import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { editApplicationExamplePayload } from "../../examplePayloads";
import {
  application_id,
  connectionInput,
  custom_fields,
  on_behalf_of_user_id,
  prospect_pool_id,
  prospect_stage_id,
  referrer,
  source_id,
  version,
} from "../../inputs";
import { generatePayload } from "../../util";

export const editApplication = action({
  display: {
    label: "Edit Application",
    description: "Updates an application by ID.",
  },
  perform: async (
    context,
    { connection, version, application_id, user_id, ...params },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const applicationPayload = generatePayload(params);
    const { data } = await client.patch(
      `/applications/${application_id}`,
      applicationPayload,
      {
        headers: {
          "On-Behalf-Of": user_id,
        },
      },
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    application_id,
    user_id: on_behalf_of_user_id,
    source_id,
    referrer,
    custom_fields,
    prospect_pool_id,
    prospect_stage_id,
  },
  examplePayload: editApplicationExamplePayload,
});
