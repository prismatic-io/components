import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DATA_EXTENSIONS_PATH } from "../../constants";
import { getDataExtensionFieldsExamplePayload } from "../../examplePayloads";
import { getDataExtensionFieldsInputs } from "../../inputs";

export const getDataExtensionFields = action({
  examplePayload: getDataExtensionFieldsExamplePayload,
  display: {
    label: "Get Data Extension Fields",
    description: "Retrieve a list of fields in a data extension.",
  },
  inputs: getDataExtensionFieldsInputs,
  perform: async (context, { connection, dataExtensionId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(
      `${DATA_EXTENSIONS_PATH}/${encodeURIComponent(dataExtensionId)}/fields`,
    );

    return { data };
  },
});
