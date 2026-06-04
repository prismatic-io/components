import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createCustomFieldResponse } from "../../examplePayloads";
import {
  aoid,
  connection,
  customFieldGroup,
  customFieldTypes,
  itemId,
} from "../../inputs";

export const createCustomField = action({
  display: {
    label: "Create Custom Field",
    description: "Create a new custom field type",
  },
  inputs: {
    aoid,
    itemId,
    customFieldTypes,
    customFieldGroup,
    connection,
  },
  perform: async (
    context,
    { connection, customFieldTypes, aoid, customFieldGroup, itemId },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const fieldName = `${customFieldTypes}Field`;
    const createCustomField = {
      eventContext: {
        worker: {
          associateOID: aoid,
          person: {
            customFieldGroup: {
              [fieldName]: {
                itemID: itemId,
              },
            },
          },
        },
      },
      transform: {
        worker: {
          person: {
            customFieldGroup: {
              [fieldName]: customFieldGroup,
            },
          },
        },
      },
    };
    const { data } = await axiosClient.post(
      `/events/hr/v1/worker.person.custom-field.${customFieldTypes}.change`,
      {
        events: [
          {
            data: createCustomField,
          },
        ],
      },
    );
    return { data };
  },
  examplePayload: {
    data: createCustomFieldResponse,
  },
});
