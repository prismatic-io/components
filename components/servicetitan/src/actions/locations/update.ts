import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getLocationResponse as updateLocationResponse } from "../../examplePayloads";
import {
  active,
  address,
  connection,
  customerId,
  customFields,
  externalData,
  locationId,
  name,
  tagTypeIds,
  taxZoneId,
} from "../../inputs";

export const updateLocation = action({
  display: {
    label: "Update Location",
    description: "Update a location",
  },
  inputs: {
    connection,
    locationId,
    customerId: {
      ...customerId,
      required: false,
      comments: "The customer ID associated with the location",
    },
    name: {
      ...name,
      required: false,
      comments: "The name of the location",
    },
    address: {
      ...address,
      required: false,
      comments: "The address of the location",
    },
    active: {
      ...active,
      required: false,
      comments: "If false, the location will be marked as inactive",
    },
    taxZoneId,
    customFields,
    tagTypeIds,
    externalData,
  },
  perform: async (
    context,
    {
      connection,
      address,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
      locationId,
      active,
      taxZoneId,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.patch(`/locations/${locationId}`, {
      address,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
      active,
      taxZoneId,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: updateLocationResponse,
  },
});
