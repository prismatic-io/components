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
      fetchAll,
      ids,
      name,
      customFields,
      pagination,
      additionalFields,
      creatorId,
      ownerId,
      contactId,
      organizationId,
      sourceId,
      stageId,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: Record<string, unknown> = {};
      customFields.forEach((pair) => {
        customFieldsObject[`custom_fields[${pair.key}]`] = pair.value;
      });
      const params = {
        ...(pagination.page.length && { page: pagination.page }),
        ...(pagination.perPage.length && { per_page: pagination.perPage }),
        ...(additionalFields.sortBy.length && {
          sort_by: additionalFields.sortBy,
        }),
        ...(ids.length && { ids: ids }),
        ...(additionalFields.includes.length && {
          include: additionalFields.includes,
        }),
        ...(creatorId.length && {
          creator_id: creatorId,
        }),
        ...(ownerId.length && {
          owner_id: ownerId,
        }),
        ...(contactId.length && {
          contact_id: contactId,
        }),
        ...(organizationId.length && {
          organization_id: organizationId,
        }),
        ...(additionalFields.hot.length && { hot: additionalFields.hot }),
        ...(sourceId.length && {
          source_id: sourceId,
        }),
        ...(stageId.length && {
          stage_id: stageId,
        }),
        ...(name.length && { name: name }),
        ...(additionalFields.value.length && { value: additionalFields.value }),
        ...(additionalFields.estimatedCloseDate.length && {
          estimated_close_date: additionalFields.estimatedCloseDate,
        }),
        ...(Object.keys(customFieldsObject).length && customFieldsObject),
        ...(additionalFields.inclusive.length && {
          inclusive: additionalFields.inclusive === "true",
        }),
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
