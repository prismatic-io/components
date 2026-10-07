import { action, outputSchema } from "@prismatic-io/spectral";
import type {
  ContentFields,
  ContentTypeProps,
  Environment,
  KeyValueMap,
} from "contentful-management";
import { createClient } from "../../client";
import { createContentTypeExamplePayload } from "../../examplePayloads";
import { createContentTypeInputs } from "../../inputs";
import { createContentTypeOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const createContentType = action({
  display: {
    label: "Create Content Type",
    description: "Creates a new content type.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      spaceId,
      environmentId,
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
    const contentType: ContentTypeProps = (
      await environment.createContentType({
        name,
        fields: fields as ContentFields<KeyValueMap>[],
        displayField,
        description,
      })
    ).toPlainObject();
    return {
      data: contentType,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createContentTypeExamplePayload,
  inputs: createContentTypeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createContentTypeOutputSchema,
  }),
  examplePayload: createContentTypeExamplePayload,
});
