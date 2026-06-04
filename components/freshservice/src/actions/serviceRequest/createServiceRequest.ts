import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createServiceRequestExamplePayload as examplePayload } from "../../examplePayloads";
import { createServiceRequestInputs as inputs } from "../../inputs/serviceRequest";

export const createServiceRequest = action({
  display: {
    label: "Create Service Request",
    description: "Creates a new service request in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
      displayId,
      quantity,
      requestedFor,
      email,
      serviceRequestAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      email,
      quantity,
      requested_for: requestedFor,
      ...serviceRequestAdditionalFields,
    };

    const { data } = await client.post(
      `/service_catalog/items/${displayId}/place_request`,
      payload,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
