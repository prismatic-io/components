import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DATA_EXTENSIONS_PATH } from "../../constants";
import { createDataExtensionExamplePayload } from "../../examplePayloads";
import { createDataExtensionInputs } from "../../inputs";
import { dataExtensionOutputSchema } from "../../outputSchemas";
export const createDataExtension = action({
  examplePayload: createDataExtensionExamplePayload,
  display: {
    label: "Create Data Extension",
    description:
      "Create a new data extension with the specified fields and configuration.",
  },
  inputs: createDataExtensionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: dataExtensionOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      dataExtensionName,
      dataExtensionKey,
      dataExtensionFields,
      isSendable,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      name: dataExtensionName,
      key: dataExtensionKey,
      fields: dataExtensionFields,
      isSendable,
    };
    const { data } = await client.post(DATA_EXTENSIONS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { dataExtensionName, dataExtensionKey, isSendable },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createDataExtensionExamplePayload.data,
      name: dataExtensionName,
      key: dataExtensionKey,
      isSendable:
        isSendable ?? createDataExtensionExamplePayload.data.isSendable,
    },
  }),
});
