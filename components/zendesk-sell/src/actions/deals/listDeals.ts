import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listDealsExamplePayload } from "../../examplePayloads";
import { listDealsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listDeals = action({
  display: {
    label: "List Deals",
    description: "Returns all deals available to the user.",
  },
  perform: async (
    context,
    {
      connection,
      page,
      perPage,
      sortBy,
      ids,
      includes,
      creatorId,
      ownerId,
      contactId,
      organizationId,
      hot,
      sourceId,
      stageId,
      name,
      value,
      estimatedCloseDate,
      customFields,
      inclusive,
      fetchAll,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: any = {};
      customFields.forEach((customField) => {
        customFieldsObject[`custom_fields[${customField.key}]`] =
          customField.value;
      });
      const params = {
        ...(page.length && { page }),
        ...(perPage.length && { per_page: perPage }),
        ...(sortBy.length && { sort_by: sortBy }),
        ...(ids.length && { ids }),
        ...(includes.length && { include: includes }),
        ...(creatorId.length && { creator_id: creatorId }),
        ...(ownerId.length && { owner_id: ownerId }),
        ...(contactId.length && { contact_id: contactId }),
        ...(organizationId.length && { organization_id: organizationId }),
        ...(hot.length && { hot }),
        ...(sourceId.length && { source_id: sourceId }),
        ...(stageId.length && { stage_id: stageId }),
        ...(name.length && { name }),
        ...(value.length && { value }),
        ...(estimatedCloseDate.length && {
          estimated_close_date: estimatedCloseDate,
        }),
        ...(Object.keys(customFieldsObject).length && customFieldsObject),
        ...(inclusive.length && { inclusive: inclusive === "true" }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/deals",
        fetchAll,
        params,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: listDealsInputs,
  examplePayload: listDealsExamplePayload,
});
export default { listDeals };
