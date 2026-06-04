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
  transformationId,
} from "../../inputs";
import { getTransformationExamplePayload } from "../../examplePayloads";

export const updateTransformation = action({
  display: {
    label: "Update Transformation",
    description: "Updates an existing Transformation.",
  },
  inputs: {
    connectionInput,
    region,
    transformationId,
    name: {
      ...name,
      comments: "The name of the Transformation.",
    },
    sourceId,
    destinationMetadataId,
    enabled,
    ifInput,
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
      transformationId,
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
    const { data } = await client.patch(
      `/transformations/${transformationId}`,
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
