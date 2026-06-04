import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerServiceDatesExamplePayload } from "../../examplePayloads";
import { getWorkerServiceDatesInputs } from "../../inputs";

export const getWorkerServiceDates = action({
  display: {
    label: "Get Worker Service Dates",
    description:
      "Retrieves a collection of service dates (hire date, continuous service date, etc.) for the specified worker ID.",
  },
  perform: async (context, { connection, workerId, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.staffing}/workers/${workerId}/serviceDates`,
      { params: { limit, offset } },
    );
    return {
      data,
    };
  },
  inputs: getWorkerServiceDatesInputs,
  examplePayload: getWorkerServiceDatesExamplePayload,
});
