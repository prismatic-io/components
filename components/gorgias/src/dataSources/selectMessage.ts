import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectMessageInputs as inputs } from "../inputs/ticketMessages";
import type { ListMessagesResponse } from "../interfaces/ticketMessages";
import { selectMessageExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { fetchAllWithPagination } from "../utils/fetchAllWithPagination";

export const selectMessage = dataSource({
  display: {
    label: "Select Message",
    description: "Select a message from a list of messages.",
  },
  dataSourceType: "picklist",
  perform: async (context, { connection, ...configVars }) => {
    const client = createClient({
      connection,
      debug: false,
    });

    const { data } = await fetchAllWithPagination<ListMessagesResponse>({
      client,
      configVars,
      endpoint: "/messages",
    });

    const result = data.data.map<Element>((message) => ({
      label:
        message.subject ??
        message.body_text ??
        message.created_datetime ??
        "No subject",
      key: util.types.toString(message.id),
    }));

    return {
      result,
    };
  },
  inputs,
  examplePayload,
});
