import { action, PerformSafety, util } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { getEntityMetaDataExamplePayload } from "../../examplePayloads";
import { getEntityMetaDataInputs } from "../../inputs";
import { getEntityMetaDataOutputSchema } from "../../outputSchemas";
export const getEntityMetaData = action({
  display: {
    label: "Get Entity Metadata",
    description:
      "Retrieves the definition of a Microsoft Dynamics 365 CRM entity.",
  },
  examplePayload: getEntityMetaDataExamplePayload,
  outputSchema: getEntityMetaDataOutputSchema,
  perform: async (context, { entityType, connection, lookupField }) => {
    const client = await createCrmClient(connection, context.debug.enabled);
    const result = await client.retrieveEntity({
      key: util.types.toBool(lookupField)
        ? `LogicalName='${entityType}'`
        : entityType,
    });
    return {
      data: {
        result,
      },
    };
  },
  inputs: getEntityMetaDataInputs,
  performSafety: PerformSafety.SAFE,
  examplePerform: async () => getEntityMetaDataExamplePayload,
});
