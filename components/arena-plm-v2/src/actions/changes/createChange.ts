import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeExamplePayload } from "../../examplePayloads";
import { createChangeInputs } from "../../inputs";
import { changeFullSchema } from "../../outputSchemas";
import type { ChangeCreateVo, SingleGuidVo } from "../../types";
import { handleArenaError, resolveAdditionalAttributes } from "../../util";
export const createChange = action({
  display: {
    label: "Create Change",
    description:
      "Create a new change in Arena PLM system with the specified properties.",
  },
  inputs: createChangeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeFullSchema,
  }),
  examplePayload: createChangeExamplePayload,
  perform: async (
    context,
    {
      connection,
      title,
      description,
      categoryGuid,
      numberSequencePrefix,
      routings,
      approvalDeadlineDateTime,
      enforceApprovalDeadline,
      effectivityType,
      expirationDateTime,
      effectivityPlannedDateTime,
      supplierVisibility,
      additionalAttributes,
      attributeDefinitions,
      additionalAttributeJson,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const requestPayload: ChangeCreateVo = {
        title: title || undefined,
        description: description || undefined,
        effectivityType: effectivityType || undefined,
        approvalDeadlineDateTime: approvalDeadlineDateTime || undefined,
        enforceApprovalDeadline,
        expirationDateTime: expirationDateTime || undefined,
        effectivityPlannedDateTime: effectivityPlannedDateTime || undefined,
        supplierVisibility,
        category: categoryGuid ? { guid: categoryGuid } : undefined,
        numberSequencePrefix: numberSequencePrefix
          ? { value: numberSequencePrefix }
          : undefined,
      };
      if (routings && Array.isArray(routings) && routings.length > 0) {
        const validRoutings = (routings as string[])
          .filter(
            (routing) => typeof routing === "string" && routing.trim() !== "",
          )
          .map((routing) => ({ guid: routing.trim() }) as SingleGuidVo);
        if (validRoutings.length > 0) {
          requestPayload.routings = validRoutings;
        }
      }
      requestPayload.additionalAttributes = resolveAdditionalAttributes(
        { additionalAttributeJson, additionalAttributes, attributeDefinitions },
        context,
      );
      context.logger.info("Creating change in Arena", {
        changeTitle: title,
        hasCategory: !!categoryGuid,
        hasNumberSequencePrefix: !!numberSequencePrefix,
        routingCount: requestPayload.routings?.length || 0,
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
      const { data } = await client.post("/changes", requestPayload);
      context.logger.info("Change created successfully", {
        changeGuid: data.guid,
        changeNumber: data.number,
        changeTitle: data.title,
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create Change");
    }
  },
});
