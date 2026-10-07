import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  ContentFields,
  ContentType,
  ContentTypeProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { updateContentTypeExamplePayload } from "../../examplePayloads";
import { updateContentTypeInputs } from "../../inputs";
import { updateContentTypeOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const updateContentType = action({
  display: {
    label: "Update Content Type",
    description: "Updates an existing content type.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      spaceId,
      environmentId,
      contentTypeId,
      name,
      fields,
      displayField,
      description,
    },
  ) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );
    const contentType: ContentType =
      await environment.getContentType(contentTypeId);
    if (name) contentType.name = name;
    if (fields) contentType.fields = fields as ContentFields<KeyValueMap>[];
    if (displayField) contentType.displayField = displayField;
    if (description) contentType.description = description;
    const data: ContentTypeProps = (await contentType.update()).toPlainObject();
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateContentTypeExamplePayload,
  inputs: updateContentTypeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateContentTypeOutputSchema,
  }),
  examplePayload: updateContentTypeExamplePayload,
});
