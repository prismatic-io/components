import { outputSchema } from "@prismatic-io/spectral";
export const getEntityMetaDataOutputSchema = outputSchema({
  type: "actionOutput",
  schema: {
    type: "object",
    properties: {
      result: {
        type: "object",
        properties: {
          "@odata.context": { type: "string" },
          MetadataId: { type: "string" },
          LogicalName: { type: "string" },
          SchemaName: { type: "string" },
          EntitySetName: { type: "string" },
          PrimaryIdAttribute: { type: "string" },
          PrimaryNameAttribute: { type: "string" },
          OwnershipType: { type: "string" },
          IsCustomEntity: { type: "boolean" },
          IsChildEntity: { type: "boolean" },
          IsActivity: { type: "boolean" },
          IsBusinessProcessEnabled: { type: "boolean" },
          IsValidForAdvancedFind: { type: "boolean" },
          IsValidForQueue: { type: "boolean" },
          DisplayName: { type: "object" },
          DisplayCollectionName: { type: "object" },
          Description: { type: "object" },
        },
      },
    },
  },
});
