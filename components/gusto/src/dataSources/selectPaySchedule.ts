import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { companyIdInput, connectionInput } from "../inputs";

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
  inputs: {
    connection: connectionInput,
    companyId: { ...companyIdInput, dataSource: undefined },
  },
  perform: async (_context, { connection, companyId }) => {
    const client = createClient(connection);

    let page = 1;
    let hasMorePages = true;
    const paySchedules: PaySchedule[] = [];

    do {
      const { data, headers } = await client.get<PaySchedule[]>(
        `/companies/${companyId}/pay_schedules`,
        { params: { page } },
      );
      paySchedules.push(...data);
      hasMorePages = headers["x-total-pages"] > headers["x-page"];
      page += 1;
    } while (hasMorePages);

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
