import { outputSchema } from "@prismatic-io/spectral";
export const getCurrentUserOutputSchema = outputSchema({
  type: "actionOutput",
  schema: {
    type: "object",
    properties: {
      "@odata.context": { type: "string" },
      BusinessUnitId: { type: "string" },
      UserId: { type: "string" },
      OrganizationId: { type: "string" },
    },
  },
});
