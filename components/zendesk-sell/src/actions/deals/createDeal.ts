import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { createDealExamplePayload } from "../../examplePayloads";
import { createDealInputs } from "../../inputs";

export const createDeal = action({
  display: {
    label: "Create Deal",
    description: "Creates a new deal.",
  },
  perform: async (
    context,
    {
      connection,
      name,
      contactId,
      value,
      currency,
      ownerId,
      hot,
      stageId,
      lastStageChangeAt,
      addedAt,
      sourceId,
      lossReasonId,
      unqualifiedReasonId,
      estimatedCloseDate,
      customizedWinLikelihood,
      tags,
      customFields,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: any = {};
      customFields.forEach((customField) => {
        customFieldsObject[customField.key] = customField.value;
      });
      const body = {
        ...(name && { name }),
        ...(contactId && { contact_id: util.types.toNumber(contactId) }),
        ...(value && { value }),
        ...(currency && { currency }),
        ...(ownerId && { owner_id: util.types.toNumber(ownerId) }),
        ...(hot && { hot: hot === "true" }),
        ...(stageId && { stage_id: util.types.toNumber(stageId) }),
        ...(lastStageChangeAt && { last_stage_change_at: lastStageChangeAt }),
        ...(addedAt && { added_at: addedAt }),
        ...(sourceId && { source_id: util.types.toNumber(sourceId) }),
        ...(lossReasonId && {
          loss_reason_id: util.types.toNumber(lossReasonId),
        }),
        ...(unqualifiedReasonId && {
          unqualified_reason_id: util.types.toNumber(unqualifiedReasonId),
        }),
        ...(estimatedCloseDate && { estimated_close_date: estimatedCloseDate }),
        ...(customizedWinLikelihood && {
          customized_win_likelihood: util.types.toNumber(
            customizedWinLikelihood,
          ),
        }),
        ...(tags && { tags }),
        ...(customFields.length && { custom_fields: customFieldsObject }),
      };
      const { data } = await client.post(
        `/deals`,
        { data: body },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: createDealInputs,
  examplePayload: createDealExamplePayload,
});
export default { createDeal };
