import { action } from "@prismatic-io/spectral";
import { listConfigurationItemsResponse } from "../../../examplePayloads";
import {
  apiVersionInput,
  className,
  connection,
  fetchAll,
  instanceUrlInput,
  sysparmLimit as sysparm_limit,
  sysparmOffset as sysparm_offset,
  sysparmQuery as sysparm_query,
} from "../../../inputs";
import { createNowApiClient, fetchAllTableRecords } from "../../../util";

export const listConfigurationItems = action({
  display: {
    label: "List Configuration Items",
    description:
      "Returns the available configuration items (CI) for a specified Configuration Management Database (CMDB) class (table)",
  },
  perform: async (
    context,
    {
      apiVersionInput,
      connection,
      fetchAll,
      instanceUrlInput,
      className,
      sysparm_limit,
      sysparm_offset,
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
      params: { sysparm_limit, sysparm_offset, sysparm_query },
    });
    return { data };
  },
  examplePayload: listConfigurationItemsResponse,
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    className,
    fetchAll,
    sysparm_limit: {
      ...sysparm_limit,
      comments:
        "Maximum number of records to return. For requests that exceed this number of records, use " +
        "the sysparm_offset parameter to paginate record retrieval. Allows numbers from 0 to 100.",
      example: "100",
      placeholder: "0",
    },
    sysparm_offset: {
      ...sysparm_offset,
      comments:
        "Starting record index for which to begin retrieving records. Use this value to paginate record retrieval. This functionality enables the retrieval of all records, regardless of the number of records, in small manageable chunks." +
        "For example, the first time you call this endpoint, sysparm_offset is set to '0'. To simply page through all available records, use sysparm_offset=sysparm_offset+sysparm_limit, until you reach the end of all records." +
        "Don't pass a negative number in the sysparm_offset parameter.",
      example: "0",
      placeholder: "0",
    },
    sysparm_query: {
      ...sysparm_query,
      comments:
        "All parameters are case-sensitive. Queries can contain more than one entry, such as sysparm_query=<col_name><operator><value>[<operator><col_name><operator><value>]. Refer to https://www.servicenow.com/docs/bundle/yokohama-api-reference/page/integrate/inbound-rest/concept/cmdb-instance-api.html#title_cmdb-GET-instance-classname for more information.",
      example: "ORDERBY<col_name>",
      placeholder: "ORDERBY<col_name>",
    },
  },
});
