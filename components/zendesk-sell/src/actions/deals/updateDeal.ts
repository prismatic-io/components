import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { updateDealExamplePayload } from "../../examplePayloads";
import { updateDealInputs } from "../../inputs";

export const updateDeal = action({
  display: {
    label: "Update Deal",
    description: "Updates deal information.",
  },
  perform: async (
    context,
    {
      connection,
      id,
      name,
      value,
      currency,
      customFields,
      tags,
      hot,
      lastStageChangeAt,
      addedAt,
      estimatedCloseDate,
      customizedWinLikelihood,
      contactId,
      ownerId,
      stageId,
      sourceId,
      lossReasonId,
      unqualifiedReasonId,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: Record<string, unknown> = {};
      customFields.forEach((pair) => {
        customFieldsObject[pair.key] = pair.value;
      });
      const body = {
        ...(name && { name }),
        ...(value && { value }),
        ...(currency && { currency }),
        ...(ownerId && {
          owner_id: util.types.toNumber(ownerId),
        }),
        ...(hot && { hot: hot === "true" }),
        ...(stageId && {
          stage_id: util.types.toNumber(stageId),
        }),
        ...(lastStageChangeAt && {
          last_stage_change_at: lastStageChangeAt,
        }),
        ...(addedAt && {
          added_at: addedAt,
        }),
        ...(sourceId && {
          source_id: util.types.toNumber(sourceId),
        }),
        ...(lossReasonId && {
          loss_reason_id: util.types.toNumber(lossReasonId),
        }),
        ...(unqualifiedReasonId && {
          unqualified_reason_id: util.types.toNumber(unqualifiedReasonId),
        }),
        ...(contactId && {
          contact_id: util.types.toNumber(contactId),
        }),
        ...(estimatedCloseDate && {
          estimated_close_date: estimatedCloseDate,
        }),
        ...(customizedWinLikelihood && {
          customized_win_likelihood: util.types.toNumber(
            customizedWinLikelihood,
          ),
        }),
        ...(tags && { tags: tags }),
        ...(customFields.length && {
          custom_fields: customFieldsObject,
        }),
      };
      const { data } = await client.put(
        `/deals/${id}`,
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
  inputs: updateDealInputs,
  examplePayload: updateDealExamplePayload,
});
export default { updateDeal };
