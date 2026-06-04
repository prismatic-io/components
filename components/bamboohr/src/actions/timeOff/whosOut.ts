import { action } from "@prismatic-io/spectral";
import { createBambooClient } from "../../client";
import { whosOutExamplePayload } from "../../examplePayloads";
import { whosOutInputs } from "../../inputs";
import { filterFalseyValues } from "../../util";


export const whosOut = action({
  display: {
    label: "List Who's Out",
    description: "List all employees currently taking time off.",
  },
  inputs: whosOutInputs,
  perform: async (context, params) => {
    const client = createBambooClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/v1/time_off/whos_out", {
      params: filterFalseyValues({
        start: params.startDate,
        end: params.endDate,
      }),
    });
    return { data };
  },
  examplePayload: whosOutExamplePayload,
});
