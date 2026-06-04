import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postJobChangesExamplePayload } from "../../examplePayloads";
import { postJobChangesInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const postJobChanges = action({
  display: {
    label: "Create Job Change",
    description: "Creates a job change instance with the specified data.",
  },
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
      proposedOrganizations,
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
  inputs: postJobChangesInputs,
  examplePayload: postJobChangesExamplePayload,
});
