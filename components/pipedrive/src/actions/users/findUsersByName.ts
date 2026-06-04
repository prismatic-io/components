import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber } from "../../util";

export const findUsersByName = action({
  display: {
    label: "Find Users By Name",
    description: "Finds users by name.",
  },
  perform: async (context, { connection, term, searchByEmail }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/users/find", {
      params: { term, search_by_email: searchByEmail },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    term: input({
      label: "Term",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The search term to look for",
    }),
    searchByEmail: input({
      label: "Search By Email",
      type: "string",
      default: "1",
      model: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
      ],
      clean: cleanNumber,
      comments: "When enabled, the term will only be matched against email addresses of users",
    }),
  },
});
