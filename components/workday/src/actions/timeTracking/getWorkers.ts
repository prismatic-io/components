import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkersExamplePayload } from "../../examplePayloads";
import { getWorkersInputs } from "../../inputs";

export const getWorkers = action({
  display: {
    label: "List Workers",
    description:
      "Retrieves a collection of workers and current staffing information.",
  },
  perform: async (context, { connection, params, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.timeTracking}/workers`, {
      params: { limit, offset, ...params },
    });
    return {
      data,
    };
  },
  inputs: getWorkersInputs,
  examplePayload: getWorkersExamplePayload,
});
