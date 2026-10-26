import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postJobChangesExamplePayload } from "../../examplePayloads";
import { postJobChangesInputs } from "../../inputs";
import { compactRows, getIdObject } from "../../util";
import { postJobChangesOutputSchema } from "../../outputSchemas";
export const postJobChanges = action({
  display: {
    label: "Create Job Change",
    description: "Creates a job change instance with the specified data.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      workerId,
      supervisoryOrganizationId,
      jobChangeReasonId,
      moveManagersTeam,
      effective,
      proposedOrganizations,
      instanceId,
      instanceHref,
      instanceDescriptor,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      supervisoryOrganization: getIdObject(supervisoryOrganizationId),
      jobChangeReason: getIdObject(jobChangeReasonId),
      moveManagersTeam,
      effective,
      proposedOrganizations: compactRows(proposedOrganizations),
      id: instanceId,
      href: instanceHref,
      descriptor: instanceDescriptor,
    };
    const { data } = await client.post(
      `${SERVICES.common}/workers/${workerId}/jobChanges`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postJobChangesExamplePayload,
  inputs: postJobChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postJobChangesOutputSchema,
  }),
  examplePayload: postJobChangesExamplePayload,
});
