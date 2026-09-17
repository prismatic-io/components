import { action } from "@prismatic-io/spectral";
import { listConfigurationItemsExamplePayload } from "../../../examplePayloads";
import { listConfigurationItemsInputs } from "../../../inputs";
import { createNowApiClient, fetchAllTableRecords } from "../../../util";
export const listConfigurationItems = action({
  display: {
    label: "List Configuration Items",
    description:
      "Returns the available configuration items (CI) for a specified Configuration Management Database (CMDB) class (table).",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      apiVersionInput,
      connection,
      fetchAll,
      instanceUrlInput,
      className,
      pagination,
      sysparm_query,
    },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    if (fetchAll) {
      const data = await fetchAllTableRecords(
        client,
        `/cmdb/instance/${className}`,
        { sysparm_query: sysparm_query },
      );
      return { data };
    }
    const { data } = await client.get(`/cmdb/instance/${className}`, {
      params: {
        sysparm_limit: pagination.sysparm_limit,
        sysparm_offset: pagination.sysparm_offset,
        sysparm_query,
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listConfigurationItemsExamplePayload.data,
  }),
  examplePayload: listConfigurationItemsExamplePayload,
  inputs: listConfigurationItemsInputs,
});
