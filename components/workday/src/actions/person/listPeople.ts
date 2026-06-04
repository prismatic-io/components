import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listPeopleExamplePayload } from "../../examplePayloads";
import { listPeopleInputs } from "../../inputs";

export const listPeople = action({
  display: {
    label: "List People",
    description: "Retrieves all people in the Workday tenant.",
  },
  perform: async (context, { connection, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.person}/people`, {
      params: { limit, offset, ...params },
    });
    return {
      data,
    };
  },
  inputs: listPeopleInputs,
  examplePayload: listPeopleExamplePayload,
});
