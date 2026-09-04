import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateChangeExamplePayload } from "../../examplePayloads";
import { updateChangeInputs } from "../../inputs";
import { changeFullSchema } from "../../outputSchemas";
import type { ChangeUpdateVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const updateChange = action({
  display: {
    label: "Update Change",
    description:
      "Update an existing change in Arena PLM system with the specified properties.",
  },
  inputs: updateChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeFullSchema,
  }),
  examplePayload: updateChangeExamplePayload,
  perform: async (
    context,
    {
      connection,
      changeGuid,
      title,
      description,
      categoryGuid,
      approvalDeadlineDateTime,
      enforceApprovalDeadline,
      effectivityType,
      expirationDateTime,
      effectivityPlannedDateTime,
      implementationStatus,
      supplierVisibility,
      additionalAttributes,
      attributeDefinitions,
      additionalAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: ChangeUpdateVo = {
        title: title || undefined,
        description: description || undefined,
        effectivityType: effectivityType || undefined,
        approvalDeadlineDateTime: approvalDeadlineDateTime || undefined,
        enforceApprovalDeadline,
        expirationDateTime: expirationDateTime || undefined,
        effectivityPlannedDateTime: effectivityPlannedDateTime || undefined,
        implementationStatus: implementationStatus || undefined,
        supplierVisibility,
        category: categoryGuid ? { guid: categoryGuid } : undefined,
      };
      requestPayload.additionalAttributes = resolveAdditionalAttributes(
        { additionalAttributeJson, additionalAttributes, attributeDefinitions },
        context,
      );
      context.logger.info("Updating change in Arena", {
        changeGuid: changeGuid,
        hasTitle: !!title,
        hasCategory: !!categoryGuid,
        hasImplementationStatus: !!implementationStatus,
        attributeCount: requestPayload.additionalAttributes?.length || 0,
        hasAttributeDefinitions: !!(
          attributeDefinitions &&
          Array.isArray(attributeDefinitions) &&
          attributeDefinitions.length > 0
        ),
        attributeDefinitionCount:
          attributeDefinitions && Array.isArray(attributeDefinitions)
            ? attributeDefinitions.length
            : 0,
      });
      const { data } = await client.put(
        `/changes/${changeGuid}`,
        requestPayload,
      );
      context.logger.info("Change updated successfully", {
        changeGuid: data.guid,
        changeNumber: data.number,
        changeTitle: data.title,
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Change");
    }
  },
});
