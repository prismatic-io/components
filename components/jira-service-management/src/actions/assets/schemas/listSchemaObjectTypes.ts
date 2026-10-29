import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { listSchemaObjectTypesExamplePayload } from "../../../examplePayloads";
import { listSchemaObjectTypesInputs } from "../../../inputs";

export const listSchemaObjectTypes = action({
  display: {
    label: "List Schema Object Types",
    description:
      "Returns all object types defined in the specified Assets/CMDB object schema.",
  },
  inputs: listSchemaObjectTypesInputs,
  perform: async (
    context,
    { connection, assetSchemaId, additionalQueryParams },
  ) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/objectschema/${assetSchemaId}/objecttypes`,
      { params: { ...additionalQueryParams } },
    );
    return { data };
  },
  examplePayload: listSchemaObjectTypesExamplePayload,
});
