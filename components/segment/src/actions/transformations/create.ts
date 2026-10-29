import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  destinationMetadataId,
  enabled,
  fqlDefinedProperties,
  ifInput,
  name,
  newEventName,
  propertyRenames,
  propertyValueTransformations,
  region,
  sourceId,
} from "../../inputs";
import { getTransformationExamplePayload } from "../../examplePayloads";

export const createTransformation = action({
  display: {
    label: "Create Transformation",
    description: "Creates a new Transformation.",
  },
  inputs: {
    connectionInput,
    region,
    name: {
      ...name,
      comments: "The name of the Transformation.",
      required: true,
    },
    sourceId: {
      ...sourceId,
      required: true,
    },
    destinationMetadataId: {
      ...destinationMetadataId,
      required: false,
    },
    enabled: {
      ...enabled,
      required: true,
      comments: "If the Transformation should be enabled.",
    },
    ifInput: {
      ...ifInput,
      required: true,
    },
    newEventName,
    propertyRenames,
    propertyValueTransformations,
    fqlDefinedProperties,
  },
  perform: async (
    context,
    {
      connectionInput,
      region,
      destinationMetadataId,
      enabled,
      fqlDefinedProperties,
      ifInput,
      name,
      newEventName,
      propertyRenames,
      propertyValueTransformations,
      sourceId,
    },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/transformations`,
      {
        destinationMetadataId: destinationMetadataId || undefined,
        enabled: enabled || undefined,
        fqlDefinedProperties: fqlDefinedProperties || undefined,
        if: ifInput,
        name: name || undefined,
        newEventName: newEventName || undefined,
        propertyRenames: propertyRenames || undefined,
        propertyValueTransformations: propertyValueTransformations || undefined,
        sourceId: sourceId || undefined,
      },
      {
        headers: {
          "Content-Type": "application/vnd.segment.v1+json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getTransformationExamplePayload,
  },
});
