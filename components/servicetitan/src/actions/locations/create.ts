import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createLocationResponse } from "../../examplePayloads";
import {
  address,
  connection,
  contacts,
  customerId,
  customFields,
  externalData,
  name,
  tagTypeIds,
} from "../../inputs";

export const createLocation = action({
  display: {
    label: "Create Location",
    description: "Creates a new location",
  },
  inputs: {
    connection,
    name: {
      ...name,
      required: true,
      comments: "The name of the location",
    },
    address: {
      ...address,
      required: true,
      comments: "The address of the location",
    },
    customerId,
    contacts: {
      ...contacts,
      comments: "The contacts associated with the location",
    },
    customFields,
    tagTypeIds,
    externalData,
  },
  perform: async (
    context,
    {
      connection,
      address,
      contacts,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
    },
  ) => {
    const client = createClient(connection, "crm", context.debug.enabled);
    const { data } = await client.post(`/locations`, {
      address,
      contacts,
      customFields,
      customerId,
      externalData,
      name,
      tagTypeIds,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createLocationResponse,
  },
});
