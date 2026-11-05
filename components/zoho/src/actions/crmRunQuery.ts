import { action, input, util } from "@prismatic-io/spectral";
import { ClientType, createClient } from "../client";
import { crmRunQueryExamplePayload } from "../examplePayloads/crm";
import { connectionInput } from "../inputs";

const crmRunQuery = action({
  display: {
    label: "CRM - COQL Query",
    description: "Run a COQL query for Zoho CRM.",
  },
  inputs: {
    connection: connectionInput,
    query: input({
      label: "Query",
      placeholder: "Enter COQL query",
      type: "text",
      required: true,
      comments:
        "COQL query to execute. See [Zoho COQL documentation](https://www.zoho.com/crm/developer/docs/api/v8/COQL-Overview.html) for syntax.",
      clean: util.types.toString,
      example: "select Last_Name, Email from Contacts where Last_Name is not null",
    }),
  },
  perform: async (context, { connection, query }) => {
    const crmClient = createClient(connection, ClientType.CRM, context.debug.enabled);

    const payload = {
      select_query: query,
    };

    const { data } = await crmClient.request({
      method: "POST",
      url: "/coql",
      data: payload,
    });

    return data;
  },
  examplePayload: crmRunQueryExamplePayload,
});

export default crmRunQuery;
