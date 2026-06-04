import { dataSource } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysparmQuery,
} from "../inputs";
import { createNowApiClient } from "../util";

export const selectAttachment = dataSource({
  display: {
    label: "Select Attachment",
    description: "Select an attachment from a list of attachments.",
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysparmQuery,
  },
  dataSourceType: "picklist",
  perform: async (
    context,
    { connection, instanceUrlInput, apiVersionInput, sysparmQuery },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      false,
    );
    const {
      data: { result: attachments },
    } = await client.get("/attachment", {
      params: {
        sysparm_query: sysparmQuery,
      },
    });

    const result = attachments.map(
      ({ table_name, file_name, sys_id: key }) => ({
        label: `${table_name} - ${file_name}`,
        key,
      }),
    );

    return {
      result,
    };
  },
});
