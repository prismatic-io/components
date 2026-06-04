import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DATA_EXTENSIONS_PATH } from "../../constants";
import { createDataExtensionExamplePayload } from "../../examplePayloads";
import { createDataExtensionInputs } from "../../inputs";

export const createDataExtension = action({
  examplePayload: createDataExtensionExamplePayload,
  display: {
    label: "Create Data Extension",
    description:
      "Create a new data extension with the specified fields and configuration.",
  },
  inputs: createDataExtensionInputs,
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
});
