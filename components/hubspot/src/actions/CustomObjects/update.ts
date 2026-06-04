import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { updateCustomObjectPayload } from "../../examplePayloads";
import {
  connectionInput,
  dynamicValues,
  fieldValues,
  objectType,
  pluralLabel,
  requiredProperties,
  searchableProperties,
  singularLabel,
  timeout,
} from "../../inputs";

export const updateCustomObject = action({
  display: {
    label: "Update Custom Object",
    description: "Updates an object's schema",
  },
  perform: async (
    context,
    {
      hubspotConnection,
      timeout,
      singularLabel,
      pluralLabel,
      requiredProperties,
      searchableProperties,
      objectType,
      fieldValues,
      dynamicValues,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const { data } = await client.patch(`/crm/v3/schemas/${objectType}`, {
      labels: {
        singular: singularLabel || undefined,
        plural: pluralLabel || undefined,
      },
      requiredProperties: requiredProperties || undefined,
      searchableProperties: searchableProperties || undefined,
      ...fieldValues,
      ...dynamicValues,
    });

    return {
      data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    objectType: {
      ...objectType,
      label: "Fully qualified name or object type ID of your schema.",
    },
    singularLabel: { ...singularLabel, required: false },
    pluralLabel: { ...pluralLabel, required: false },
    requiredProperties: { ...requiredProperties, required: false },
    searchableProperties: { ...searchableProperties, required: false },
    timeout,
    fieldValues,
    dynamicValues,
  },
  examplePayload: updateCustomObjectPayload,
});
