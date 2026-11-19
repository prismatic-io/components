import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectPayScheduleInputs } from "../inputs";
import { fetchAllPages } from "../util";

interface PaySchedule {
  uuid: string;
  name: string;
  frequency: string;
}

export const selectPaySchedule = dataSource({
  display: {
    label: "Select Pay Schedule",
    description: "A picklist of pay schedules for the selected company.",
  },
  dataSourceType: "picklist",
  inputs: selectPayScheduleInputs,
  perform: async (_context, { connection, companyId }) => {
    const client = createClient(connection);

    const paySchedules = await fetchAllPages<PaySchedule>(
      client,
      `/companies/${companyId}/pay_schedules`,
    );

    const result = paySchedules
      .map<Element>((schedule) => ({
        label: `${schedule.name} (${schedule.frequency})`,
        key: schedule.uuid.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  examplePayload: {
    result: [
      {
        label: "Engineering (Twice per month)",
        key: "2097fe08-407a-46d7-b35c-a32402a2355e",
      },
    ],
  },
});
