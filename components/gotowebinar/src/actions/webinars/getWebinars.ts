import { action } from "@prismatic-io/spectral";
import { getWebinarInputs } from "../../inputs";
import { createGotoWebinarClient } from "../../client";
import { GET_WEBINARS_EXAMPLE_PAYLOAD } from "../../examplePayloads";
import { fetchAllResults } from "../../util";
import type { GoToWebinarResponse, Webinar } from "../../types";
export const getWebinars = action({
  display: {
    label: "Get Webinars",
    description:
      "Returns upcoming and past webinars for the currently authenticated " +
      "organizer that are scheduled within the specified date/time range.",
  },
  inputs: getWebinarInputs,
  examplePayload: GET_WEBINARS_EXAMPLE_PAYLOAD,
  perform: async (
    { debug: { enabled: debug } },
    { connection, pagination, accountKey, fromTime, toTime, fetchAll },
  ) => {
    const { client, organizerKey } = createGotoWebinarClient(connection, debug);
    const url = accountKey
      ? `/accounts/${accountKey}/webinars`
      : `/organizers/${organizerKey}/webinars`;
    if (fetchAll) {
      return {
        data: await fetchAllResults<Webinar>(client, url, "webinars", {
          fromTime,
          toTime,
        }),
      };
    }
    const params = {
      fromTime,
      toTime,
      size: pagination.size,
      page: pagination.page,
    };
    const { data } = await client.get<GoToWebinarResponse<Webinar>>(url, {
      params,
    });
    return {
      data,
    };
  },
});
